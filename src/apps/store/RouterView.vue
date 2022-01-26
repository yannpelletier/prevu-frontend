<template>
  <v-container fluid class="ma-0 pa-0" :style="{'background-color': `${parameters.primaryColor}`}">
    <store-product-view
      v-bind="componentAttributes()"
    />
    <v-scroll-y-transition hide-on-leave>
      <component :is="page" v-bind="componentAttributes()"></component>
    </v-scroll-y-transition>
  </v-container>
</template>

<script>
    import GenericStoreComponent from '@/apps/store/GenericStoreComponent';

    export default {
        name: "RouterView",
        extends: GenericStoreComponent,
        components: {
            Home: () => import('@/apps/store/pages/home/Home.vue'),
            Checkout: () => import('@/apps/store/pages/Checkout'),

            StoreProductView: () => import('@/apps/store/ProductView'),
        },
        props: {
            page: {
                type: String,
            },
        },
    }
</script>

<style scoped>

</style>
