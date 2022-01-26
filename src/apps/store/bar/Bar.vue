<template>
  <component id="nav-bar" :is="variant" v-bind="$attrs"></component>
</template>

<script>
    import GenericStoreComponent from '@/apps/store/GenericStoreComponent';

    export default {
        name: "Bar",
        extends: GenericStoreComponent,
        components: {
            Default: () => import('@/apps/store/bar/variants/SimpleBar'),
        },
        props: {
            variant: {
                type: String,
                required: true,
                validator: (prop) => [
                    'default',
                ].includes(prop),
            },
        },
    }
</script>

<style scoped>

</style>
