<template>
  <component is="squareLayout" v-bind="componentAttributes()"/>
</template>

<script>
  import GenericStoreComponent from '@/apps/store/GenericStoreComponent';

  export default {
    name: "StoreHome",
    extends: GenericStoreComponent,
    components: {
      Default: () => import('@/apps/store/pages/home/variants/Default'),
      SquareLayout: () => import('@/apps/store/pages/home/variants/SquareLayout'),
    },
  }
</script>
