<template>
  <component id="footer" is="default" v-bind="$attrs"></component>
</template>

<script>
    import GenericStoreComponent from '@/apps/store/GenericStoreComponent';

    export default {
        name: "Footer",
        extends: GenericStoreComponent,
        components: {
            Default: () => import('@/apps/store/footer/variants/SimpleFooter'),
        },
    }
</script>
