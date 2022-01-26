<template>
  <v-card
    flat
    class="d-flex justify-center"
    tile
    :color="color"
  >
    <v-container class="ma-0 pa-0"
                 style="max-width: 1200px">
      <v-app-bar flat color="transparent">
        <v-tabs hide-slider :color="pivotColor(color)" background-color="transparent">
          <v-tab @click="changePage('home')" v-if="showLogo || showName">
            <v-img
              v-if="showLogo"
              height="50"
              width="50"
              contain
              :src="logo"
              class="pa-4"
            />
            <span
              class="ml-2"
              style="font-size: 14pt; text-transform: none; font-weight: 400"
            >
              {{showName ? name : ''}}
            </span>
          </v-tab>
          <v-tab v-else>
              <v-icon :dark="isDark(color)">
                mdi-home
              </v-icon>
              <span
                class="ml-2"
                style="font-size: 14pt; text-transform: none; font-weight: 400"
              >
              Home
            </span>
          </v-tab>
        </v-tabs>
        <v-spacer/>
        <v-btn icon @click="changePage('checkout')">
          <v-badge left :color="tertiaryColor">
            <template v-slot:badge>
              <span :style="{'color': pivotColor(tertiaryColor)}">{{cart.length}}</span>
            </template>
            <v-icon :color="pivotColor(color)">mdi-cart-outline</v-icon>
          </v-badge>
        </v-btn>
      </v-app-bar>
    </v-container>
  </v-card>
</template>

<script>
    import GenericStoreComponent from '@/apps/store/GenericStoreComponent';

    export default {
        name: "StoreNavigation",
        extends: GenericStoreComponent,
        props: {
            mobile: {
                type: Boolean,
                default: false,
            },
            cart: {
                type: Array,
            },

            //Global attributes
            name: {
                type: String,
            },
            tagline: {
                type: String,
            },
            logo: {
                type: String,
            },
            tertiaryColor: {
                type: String,
            },

            //Specific attributes
            color: {
                type: String,
            },
            showLogo: {
                type: Boolean,
            },
            showName: {
                type: Boolean,
            },
            showTagline: {
                type: Boolean
            },

            //Functions
            changePage: {
                type: Function,
            },
            addToCart: {
                type: Function,
            }
        },
    }
</script>

<style scoped>

</style>
