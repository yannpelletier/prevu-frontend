<template>
  <v-footer color="transparent" height="82" absolute>
    <v-spacer/>
    <router-link to="/">
      <v-img
        :src="isDark(primaryColor) ?
         require('@/assets/prevu-branding/powered-by-prevu-dark.png') : require('@/assets/prevu-branding/powered-by-prevu-light.png')"
        max-width="200"
        contain
        class="powered-by-preview"
      />
    </router-link>
    <v-spacer/>
  </v-footer>
</template>

<script>
    import GenericStoreComponent from '@/apps/store/GenericStoreComponent';

    export default {
        name: "SimpleFooter",
        extends: GenericStoreComponent,
        props: {
            mobile: {
                type: Boolean,
                default: false,
            },

            //Global attributes
            primaryColor: {
                type: String,
            },
        },
    }
</script>

<style lang="scss" scoped>
  .powered-by-preview {
    opacity: .25;
    transition: 0.5s;

    &:hover {
      opacity: 1;
    }
  }
</style>

