<template>
  <v-container class="store-editor" fluid v-if="isMobile">
    <store-creation-dialog v-if="!storeExists"/>
    <v-tabs v-model="section" height="0" v-if="editedStore">
      <v-tab-item value="editor">
        <v-card class="fill-screen-height-card-mobile">
          <store-editor-menu
            :edited-store="editedStore"
            :errors="errors"
            @saved="saveStore"
            @leave="attemptLeave"
            @modified="markModified"/>
        </v-card>
        <v-btn width="100%" color="secondary" class="mt-2" @click="showPreview">
          View Store Preview
        </v-btn>
      </v-tab-item>
      <v-tab-item value="preview">
        <v-card
          id="mobile-store-container"
          tile
          class="fill-screen-height-card-mobile d-flex justify-center transition-swing"
        >
          <v-card class="transition-swing" height="100%">
            <store-view
              container="#mobile-store-container"
              :store="editedStore"
              :products="products"
              mobile
            />
          </v-card>
        </v-card>
        <v-btn width="100%" color="secondary" class="mt-2" @click="showEditor">
          Go back to editor
        </v-btn>
      </v-tab-item>
    </v-tabs>
  </v-container>
  <v-container fluid v-else>
    <store-creation-dialog v-if="!storeExists"/>
    <v-row v-if="editedStore">
      <v-col :cols="isDisplayFullscreen ? 1 : 4" class="transition-swing">
        <v-card
          class="fill-screen-height-card-desktop transition-swing"
          :width="isDisplayFullscreen ? '0%' : '100%'"
        >
          <store-editor-menu
            :edited-store="editedStore"
            :errors="errors"
            @saved="saveStore"
            @leave="attemptLeave"
            @modified="markModified"
          />
        </v-card>
      </v-col>
      <v-col :cols="isDisplayFullscreen ? 11 : 8" class="transition-swing">
        <v-card tile>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn tile :dark="isDisplayDesktop" @click="toggleDesktopDisplay" v-on="on">
                <v-icon>mdi-monitor</v-icon>
              </v-btn>
            </template>
            <span>View Desktop</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn tile :dark="isDisplayMobile" @click="toggleMobileDisplay" v-on="on">
                <v-icon>mdi-cellphone</v-icon>
              </v-btn>
            </template>
            <span>View Mobile</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn tile :dark="isDisplayFullscreen" @click="toggleFullscreenDisplay" v-on="on">
                <v-icon>mdi-overscan</v-icon>
              </v-btn>
            </template>
            <span>View Fullscreen</span>
          </v-tooltip>
        </v-card>
        <v-card
          id="desktop-store-container"
          tile
          class="fill-screen-height-card-desktop d-flex justify-center transition-swing"
          :color="isDisplayMobile ? 'grey darken-4' : 'white'"
        >
          <v-card class="transition-swing" :width="isDisplayMobile ? '40%' : '100%'" height="100%">
              <store-view
                container="#desktop-store-container"
                :store="editedStore"
                :products="products"
                :mobile="previewIsMobile"
              />
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import Store from "@/store/database/Store";
    import Product from '@/store/database/Product';

    import {mapGetters} from 'vuex';

    export default {
        name: "StoreEditor",
        components: {
            StoreCreationDialog: () => import('@/views/StoreEditor/StoreCreationDialog'),
            StoreView: () => import('@/apps/store/View'),
            StoreEditorMenu: () => import('@/components/stores/StoreEditorMenu'),
        },
        mounted() {
            this.loadStore();
        },
        data() {
            return {
                modified: false,
                errors: {},
                storeExists: true,

                //For mobile editor
                section: 'editor',

                //For desktop editor
                display: 'desktop',
                previewIsMobile: false,
            };
        },
        methods: {
            async loadStore() {
                this.$store.commit('app/setLoading', true);
                try {
                    await Store.dispatch('loadAuthenticatedUserStore');
                } catch (e) {
                    this.storeExists = false;
                }
                await Product.dispatch('loadAuthenticatedUserProducts');
                this.$store.commit('app/setLoading', false);
                this.modified = false;
            },


            //Edit functions
            markModified() {
                this.modified = true;
            },
            async saveStore() {
                try {
                    this.$store.commit('app/setLoading', true);
                    await Store.dispatch('updateById', {
                        id: this.editedStore.id,
                        data: {
                            slug: this.editedStore.slug,
                            rootSections: this.editedStore.rootSections,
                        }
                    });
                    this.errors = {};
                    this.modified = false;
                    this.$store.commit('app/setLoading', false);
                    return true;
                } catch (error) {
                    this.errors = error.errors;
                    this.$store.commit('app/setLoading', false);
                    return false;
                }
            },

            //Display Functions
            toggleDesktopDisplay() {
                this.display = 'desktop';
                this.previewIsMobile = false;
            },
            toggleMobileDisplay() {
                this.display = 'mobile';
                this.previewIsMobile = true;
            },
            toggleFullscreenDisplay() {
                this.display = 'fullscreen';
                this.previewIsMobile = false;
            },

            //Navigation functions
            async confirmExit() {
                return await this.$confirm('Save', 'Do you want to save your store before leaving this page?', {
                    agreeText: 'Save',
                    cancelText: 'Discard'
                });
            },
            async attemptLeave() {
                if (this.modified && await this.confirmExit()) {
                    let successfulSave = await this.saveStore();
                    if (!successfulSave) {
                        return false;
                    }
                }
                this.$router.back();
            },
            showEditor() {
                this.section = 'editor';
            },
            showPreview() {
                this.section = 'preview';
            },
        },
        computed: {
            ...mapGetters('app', ['isMobile']),

            isDisplayDesktop() {
                return this.display === 'desktop';
            },
            isDisplayMobile() {
                return this.display === 'mobile';
            },
            isDisplayFullscreen() {
                return this.display === 'fullscreen';
            },

            editedStore() {
                return Store.getters('authenticatedUserStore');
            },
            dummyProducts() {
                let products = [];
                for (let i = 0; i < 7; i++) {
                    products.push({
                        name: 'My great work',
                        formattedPrice: '$5.00',
                        publicThumbnail: require('@/assets/store-defaults/product-thumbnail.png')
                    });
                }
                return products;
            },
            products() {
                let products = Product.getters('authenticatedUserStoreProducts');
                if (products.length === 0) {
                    return this.dummyProducts;
                }
                return products;
            }
        },
    }
</script>

<style scoped>
  .fill-screen-height-card-desktop {
    overflow-y: scroll;
    max-height: 90vh;
  }

  .fill-screen-height-card-mobile {
    overflow-y: scroll;
    height: 90vh;
  }
</style>
