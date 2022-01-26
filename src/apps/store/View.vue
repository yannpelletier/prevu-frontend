<template>
  <v-container fluid v-if="usedStore && !loading" class="ma-0 pa-0">
    <store-router-view
      :page="usedPage"
      :parameters="globalProps"
      :sections="sections"
    />
  </v-container>
</template>

<script>
    import Store from '@/store/database/Store';
    import Product from '@/store/database/Product';

    import {mapGetters, mapState} from 'vuex';

    /*
    / The store system relies primarily on two things: parameters and sections
    /
    / Parameters are a list of properties that are available to every store component (global properties).
    / Sections are sets of parameters that have a more pointed purpose (the banner, the navbar, social media links, etc).
    /   They allow us to have several possible sets of parameters for a single component. For example, the banner has 3 different
    /   possible looks, which all have different sets of modifiable properties.
    /
    / The reason we use this system of passing down values rather than simply making them seek vuex modules is because
    / we want the store components to be stateless to allow for a lot more flexibility when having to deal with the embedded store
    / in the store editor vs the routed store.
    /
    / For example, in the store editor, we might want to simulate the store being in mobile mode for editing purposes despite the display
    / not actually being mobile. Passing down the "mobile" property then allows us to simply change what is passed down to the store components,
    / rather than letting the store components find from breakpoints whether they are in mobile and then doing some 'if' hack everywhere that the check
    / is done. We also don't want links in the store editor to actually work, unlike when the store is routed, so having control over what the generic
    / behavior a page does by passing down the function allows us to easily disable the functionality when routed vs embedded.
    /
    /
    / To use this system, simply make every child component of the store view extend GenericStoreComponent.
    / This will give access to the componentAttributes() computed property. To pass down everything required to
    / a child component, simply do v-bind="componentAttributes()". The available attributes will now be available
    / in props when defined. The child component will now also be able to pass down those properties using the same functions
    /
    / The componentAttributes() computed property takes 2 optional parameters, sectionId and includedSectionIds.
    / The sectionId is id of the section intrinsic to the component that you are passing down to (ex: 'banner' for the store banner).
    / It will mix in the parameter values of the section as well as pass down a 'variant' attribute that contains the
    / variant identifier of the section. additionalSectionIds is a list of sectionIds or a single sectionId that has the same principle as
    / sectionId, except the variant of the sections will not be passed down.
    */
    export default {
        name: 'CoreStoreView',
        components: {
            StoreRouterView: () => import('@/apps/store/RouterView'),
        },
        data() {
            return {
                page: 'home',
            };
        },
        props: {
            storeSlug: String,
            routerParams: Object,

            store: {
                default: null,
            },
            products: {
                default: null,
            },
            mobile: {
                type: Boolean,
            },

            container: {
                type: String,
                default: null,
            },
        },
        methods: {
            clearMetaData() {
                let favicon = document.getElementById('favicon');
                favicon.href = '';
                document.title = '';
            },
            updateMetaData() {
                if (this.sections) {
                    let generalParameters = this.sections['general'].parameters;
                    let favicon = document.getElementById('favicon');
                    favicon.href = generalParameters.logo;

                    let title = generalParameters.name;
                    if (generalParameters.tagline) {
                        title = generalParameters.tagline + ' | ' + generalParameters.name;
                    }
                    document.title = title;
                }
            },
            displayUnconfirmedStoreAlert() {
                this.$alert("This store has not yet been confirmed. You are not allowed to purchase anything on it.", {timemout: 10000, color: 'red'});
            },
        },
        async mounted() {
            if (!this.store) {
                try {
                    this.clearMetaData();

                    this.$store.commit('app/setLoading', true);
                    await Store.dispatch('loadBySlug', this.storeSlug);
                    await Product.dispatch('loadStoreProductsBySlug', this.storeSlug);
                    this.$store.commit('app/setLoading', false);

                    this.updateMetaData();
                } catch (error) {
                    await this.$router.replace('/not-found');
                    this.$store.commit('app/setLoading', false);
                }
            }
        },
        computed: {
            ...mapState('app', ['loading']),

            //Parameter Getters
            sections() {
                return this.usedStore.rootSections;
            },
            globalProps() {
                if (this.sections && this.sections['general']) {
                    let generalParameters = this.sections['general'].parameters;
                    return {
                        ...generalParameters,
                        ...this.usedRouterParams,
                        cart: this.usedCart,
                        store: this.usedStore,
                        products: this.usedProducts,
                        mobile: this.usedMobile,
                        touchScreen: this.usedTouchScreen,
                        changePage: this.changePage,
                        navigateToLink: this.navigateToLink,
                        scrollTo: this.scrollTo,
                        addToCart: this.addToCart,
                        toggleCart: this.toggleCart,
                    };
                } else {
                    return {};
                }
            },

            //Routed vs placed differentiators
            routed() {
                return this.store === null || this.store === undefined;
            },
            usedStore() {
                return this.routed ? Store.getters('currentStore')() : this.store;
            },
            usedProducts() {
                return this.routed ? Product.getters('currentStoreProducts') : this.products;
            },
            usedPage() {
                return this.routed ? this.$route.name : 'home';
            },
            usedRouterParams() {
                return this.routed ? {...this.$route.query, ...this.$route.params} : this.routerParams;
            },
            usedCart() {
                return Product.getters('currentStoreCart');
            },
            ...mapGetters('app', ['isMobile']),
            usedMobile() {
                return this.routed ? this.isMobile : this.mobile;
            },
            usedTouchScreen() {
                return this.routed ? 'ontouchstart' in document.documentElement : this.mobile;
            },

            showStoreConfirmationAlert() {
                return !this.usedStore.confirmed;
            },

            //Functions
            changePage() {
                return async (page, query) => {
                    if (this.routed) {
                        let queryParams = Object.assign({}, this.$route.query);
                        if (typeof query !== 'undefined') {
                            for (const [key, value] of Object.entries(query)) {
                                if (typeof value === 'undefined') {
                                    delete queryParams[key];
                                } else {
                                    queryParams[key] = String(value);
                                }
                            }
                        } else {
                            queryParams = null;
                        }
                        await this.$router.push({
                            ...(page ? {name: page} : {}),
                            ...{query: queryParams},
                        });
                    }
                };
            },
            navigateToLink() {
                return async (link) => {
                    if (this.routed) {
                        window.open(link);
                    }
                };
            },
            addToCart() {
                return (productId) => {
                    if (this.routed) {
                        if(!this.usedStore.confirmed){
                            this.displayUnconfirmedStoreAlert();
                        } else {
                            Product.dispatch('addToCartById', productId)
                        }
                    }
                };
            },
            toggleCart() {
                return (productId) => {
                    if (this.routed) {
                        if(!this.usedStore.confirmed){
                            this.displayUnconfirmedStoreAlert();
                        } else{
                            Product.dispatch('toggleCartProductById', productId)
                        }
                    }
                };
            },
            scrollTo() {
                return async (id) => {
                    await this.$vuetify.goTo(`#${id}`, {
                        ...(this.container ? {container: this.container} : {}),
                    });
                };
            },
        }
    }
</script>

<style scoped lang="scss">
  .alert-unconfirmed-store-wrapper {
    padding: 20px;

    .content {
      position: fixed;
      width: 60%;
      min-width: 250px;
      bottom: 10px;
      z-index: 10;
    }
  }
</style>
