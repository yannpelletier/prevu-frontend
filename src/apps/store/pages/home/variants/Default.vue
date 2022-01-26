<template>
  <div>
    <store-banner
      v-bind="componentAttributes('banner', 'mediaLinks')"
    />
    <div style="min-height:100vh;">
      <store-bar
        v-bind="componentAttributes('navBar')"
      />
      <v-container style="max-width: 1200px;" class="has-footer">
        <waterfall :data="[]" :col="mobile ? 2 : 4">
          <v-card
            v-for="(product) in pageProducts"
            class="mx-1 my-2"
            :class="[`product-${product.slug}`]"
            :color="secondaryColor"
            @click.prevent="displayProduct(product.slug)"
            max-height="100vh"
            elevation="0"
            tile
          >
            <v-hover v-slot:default="{ hover }">
              <v-card
                :color="primaryColor"
                elevation="0"
                tile
              >
                <v-img :src="product.thumbnail">
                  <v-card
                    v-if="!touchScreen"
                    class="product"
                    :class="{'visible': hover}"
                    height="100%"
                    :color="alphaColor(secondaryColor, 0.8)"
                    :dark="isDark(secondaryColor)"
                    elevation="0"
                    tile
                  >
                    <v-card-title class="headline font-weight-medium text-break">
                      {{product.name}}
                    </v-card-title>
                    <v-card-subtitle class="title font-weight-light">
                      {{product.formattedPrice}}
                    </v-card-subtitle>
                    <v-card-actions>
                      <v-btn
                        @click.stop
                        @click="toggleCart(product.id)"
                        :color="tertiaryColor"
                        :dark="isDark(tertiaryColor)"
                        :outlined="product.inCart"
                        depressed
                        :style="{'color': product.inCart ? tertiaryColor : pivotColor(tertiaryColor)}"
                      >
                        {{product.inCart ? 'Added to cart' : 'Add to cart'}}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-img>
              </v-card>
            </v-hover>
          </v-card>
        </waterfall>
        <v-pagination
          v-if="totalPages > 1"
          :length="totalPages"
          :value="page"
          @input="setProductPage"
          :dark="isDark(primaryColor)"
          :color="tertiaryColor"
          class="mt-5"
        />
      </v-container>
      <store-footer
        v-bind="componentAttributes()"
      />
    </div>
  </div>
</template>

<script>
  import '@/plugins/masonry';
  import {chunk} from "lodash";
  import GenericStoreComponent from '@/apps/store/GenericStoreComponent';

  const PRODUCTS_PER_PAGE = 20;

  export default {
    name: "StoreHome",
    extends: GenericStoreComponent,
    components: {
      StoreBanner: () => import('@/apps/store/banner/Banner'),
      StoreBar: () => import('@/apps/store/bar/Bar'),
      StoreFooter: () => import('@/apps/store/footer/Footer'),
    },
    data() {
      return {
        pageNumber: null,
        productsLoading: true,
      }
    },
    props: {
      //Global attributes
      mobile: {
        type: Boolean,
      },
      touchScreen: {
        type: Boolean,
      },
      products: {
        type: Array,
      },
      p: {
        type: String,
        default: '1',
      },

      //General attributes
      primaryColor: {
        type: String,
      },
      secondaryColor: {
        type: String,
      },
      tertiaryColor: {
        type: String,
      },

      //Functions
      toggleCart: {
        type: Function,
      },
      changePage: {
        type: Function,
      }
    },
    methods: {
      setProductPage(page) {
        this.changePage(null, {p: page});
      },
      displayProduct(productSlug) {
        this.changePage(null, {product: productSlug});
      },

    },
    watch: {
      page() {
        this.$nextTick(() => {
          this.$waterfall.forceUpdate();
        });
      },
    },
    computed: {
      page() {
        return parseInt(this.p);
      },
      totalPages() {
        return Math.ceil(this.products.length / PRODUCTS_PER_PAGE);
      },
      pageProducts() {
        let chunks = chunk(this.products, PRODUCTS_PER_PAGE);
        return chunks[this.page - 1];
      }
    },
  }
</script>
<style scoped lang="scss">
  .has-footer {
    padding-bottom: 80px;
  }

  .product {
    opacity: 0;
    transform: translateY(-5px);
    transition: 0.25s;

    &.visible {
      opacity: 1;
      transform: translateY(0px);
    }
  }
</style>
<style lang="scss">
  .v-pagination > li {
    .v-pagination__item, .v-pagination__navigation {
      box-shadow: none;
      -webkit-box-shadow: none;
      outline: none;
    }
  }
</style>
