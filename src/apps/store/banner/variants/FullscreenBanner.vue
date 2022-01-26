<template>
    <v-card height="100vh" tile :dark="isDark(this.overlayColor)">
      <v-img class="align-center banner-container" :gradient="`${overlayColor}, ${overlayColor}`" :src="image">
        <div
          :class="{'display-2': mobile, 'display-3': !mobile}"
          class="font-weight-medium transition-swing"
        >
          {{header}}
        </div>
        <div
          :class="{'display-1': mobile, 'display-2': !mobile}"
          class="font-weight-light transition-swing my-3"
        >
          {{subheader}}
        </div>
        <v-btn depressed
          class="mt-2 transition-swing"
          outlined
          v-if="showButton"
          @click="scrollTo('nav-bar')"
        >
          {{buttonText}}
        </v-btn>
        <v-card :color="secondaryColor" style="position:absolute; bottom:0; right:0;"
                class="ma-2 py-1">
          <v-btn icon fab x-small class="mx-1" :color="pivotColor(secondaryColor)" v-if="personal"
                 @click="navigateToLink(personal)">
            <v-icon>
              mdi-home
            </v-icon>
          </v-btn>
          <v-btn icon fab x-small class="mx-1" :color="pivotColor(secondaryColor)" v-if="facebook"
                 @click="navigateToLink(facebook)">
            <v-icon>
              mdi-facebook
            </v-icon>
          </v-btn>
          <v-btn icon fab x-small class="mx-1" :color="pivotColor(secondaryColor)" v-if="twitter"
                 @click="navigateToLink(twitter)">
            <v-icon>
              mdi-twitter
            </v-icon>
          </v-btn>
          <v-btn icon fab x-small class="mx-1" :color="pivotColor(secondaryColor)" v-if="youtube"
                 @click="navigateToLink(youtube)">
            <v-icon>
              mdi-youtube
            </v-icon>
          </v-btn>
          <v-btn icon fab x-small class="mx-1" :color="pivotColor(secondaryColor)" v-if="instagram"
                 @click="navigateToLink(instagram)">
            <v-icon>
              mdi-instagram
            </v-icon>
          </v-btn>
          <v-btn icon fab x-small class="mx-1" :color="pivotColor(secondaryColor)" v-if="linkedin"
                 @click="navigateToLink(linkedin)">
            <v-icon>
              mdi-linkedin
            </v-icon>
          </v-btn>
          <v-btn icon fab x-small class="mx-1" :color="pivotColor(secondaryColor)" v-if="telegram"
                 @click="navigateToLink(telegram)">
            <v-icon>
              mdi-telegram
            </v-icon>
          </v-btn>
          <v-btn icon fab x-small class="mx-1" :color="pivotColor(secondaryColor)" v-if="soundcloud"
                 @click="navigateToLink(soundcloud)">
            <v-icon>
              mdi-soundcloud
            </v-icon>
          </v-btn>
        </v-card>
      </v-img>
    </v-card>
</template>

<script>
    import GenericStoreComponent from '@/apps/store/GenericStoreComponent';

    export default {
        name: "Banner",
        extends: GenericStoreComponent,
        props: {
            mobile: {
                type: Boolean,
            },

            //Global attributes
            secondaryColor: {
                type: String,
            },

            personal: {
                type: String,
            },
            facebook: {
                type: String,
            },
            twitter: {
                type: String,
            },
            youtube: {
                type: String,
            },
            instagram: {
                type: String,
            },
            linkedin: {
                type: String,
            },
            telegram: {
                type: String,
            },
            soundcloud: {
                type: String,
            },

            //Custom user attributes
            image: {
                type: String,
            },
            overlayColor: {
                type: String,
            },
            header: {
                type: String,
            },
            subheader: {
                type: String,
            },
            showButton: {
                type: Boolean,
            },
            buttonText: {
                type: String,
            },

            //Functions
            navigateToLink: {
                type: Function,
            },
            scrollTo: {
                type: Function,
            },
        },
    }
</script>

<style scoped>
  .banner-container {
    width:100%;
    height: 100%;
    text-align: center;
  }
</style>
