<template>
  <component id="banner" :is="variant" v-bind="$attrs"/>
</template>

<script>
    import GenericStoreComponent from '@/apps/store/GenericStoreComponent';

    export default {
        name: "Banner",
        extends: GenericStoreComponent,
        components: {
            Default: () => import('@/apps/store/banner/variants/MediumBanner'),
            Minimal: () => import('@/apps/store/banner/variants/MinimalBanner'),
            Fullscreen: () => import('@/apps/store/banner/variants/FullscreenBanner'),
        },
        props: {
            variant: {
                type: String,
                required: true,
                validator: (prop) => [
                    'default',
                    'minimal',
                    'fullscreen',
                ].includes(prop),
            },
        },
    }
</script>

<style scoped>

</style>
