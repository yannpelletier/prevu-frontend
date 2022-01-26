<template>
  <v-card class="product-edit" :loading="loading">
    <v-card-title>
      <span class="headline">Edit Product Metadata</span>
    </v-card-title>
    <v-card-text>
      <div v-for="(product, i) in products">
        <v-row justify="space-between">
          <v-col cols="12" md="4" align="center" align-self="center">
            <v-card
              flat
              height="200"
              color="lighten-2"
            >
              <v-img
                v-if="product.thumbnailType === 'original'"
                :src="product.privateThumbnail"
                max-height="200"
                contain
              />
              <div v-else-if="product.thumbnailType === 'preview'" class="full-width fill-height no-selection align-center d-flex align-center justify-center">
                <div class="grey--text">
                  <v-icon>mdi-image-size-select-large</v-icon><br><br>
                  The preview will be used for the thumbnail
                </div>
              </div>
            </v-card>
            <!--<asset-id-field
              v-else-if="product.thumbnailType === 'custom'"
              show-default
              button-label="Change Thumbnail"
              v-model="product.customThumbnailId"
              :default-src="product.originalThumbnail"
            />-->
            <v-select
              class="mt-6"
              dense
              outlined
              label="Thumbnail Type"
              :items="thumbnailTypes"
              v-model="product.thumbnailType"
            />
          </v-col>
          <v-col cols="12" md="7">
            <v-text-field
              append-icon="mdi-link"
              label="Url"
              :prefix="isMobile ? '/.../products/' : 'https://prev-u.com/.../products/'"
              v-model="product.slug" outlined maxlength="80"
              counter="80"
              class="product-slug-input"
            />
            <v-text-field
              append-icon="mdi-pen"
              maxlength="80"
              counter="80"
              label="Name"
              v-model="product.name"
              outlined
              class="product-name-input"
            />
            <currency-field
              append-icon="mdi-currency-usd"
              label="Price"
              v-model="product.price"
              currency="USD"
              outlined
              class="product-price-input"
            />
            <v-textarea
              append-icon="mdi-text"
              maxlength="1000"
              counter="1000"
              label="Description"
              v-model="product.description"
              outlined
              class="product-description-input"
            />
            <span class="error--text">{{product.error}}</span>
          </v-col>
        </v-row>
        <v-divider class="mb-8 mt-2" v-if="i !== products.length - 1"></v-divider>
      </div>
    </v-card-text>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn text color="primary" v-on:click="cancel">{{ skippable ? 'Skip' : 'Cancel'}}</v-btn>
      <v-btn color="primary" v-on:click="save" class="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import CurrencyField from '@/components/inputs/CurrencyField'
    import AssetIdField from '@/components/inputs/AssetIdField'

    import Product from '@/store/database/Product';
    import {mapGetters} from 'vuex';

    export default {
        name: 'ProductEdit',
        components: {
            CurrencyField,
            AssetIdField
        },
        props: {
            products: Array,
            skippable: Boolean
        },
        data() {
            return {
                loading: false,
                thumbnailTypes: [
                    {
                        text: 'Original File',
                        value: 'original',
                    },
                    {
                        text: 'Preview File',
                        value: 'preview',
                    },
                    /*{
                        text: 'Custom File',
                        value: 'custom',
                    }*/
                ],
            };
        },
        computed: {
            ...mapGetters('app', ['isMobile']),
        },
        methods: {
            async save() {
                if (this.products.length > 0) {
                    this.loading = true;
                    try {
                        await Promise.all(this.products.map((product, index) => {
                            let update = Product.dispatch('updateById', {
                                id: product.id,
                                data: {
                                    name: product.name,
                                    description: product.description,
                                    price: product.price,
                                    customThumbnailId: product.customThumbnailId,
                                    thumbnailType: product.thumbnailType,
                                    slug: product.slug,
                                },
                            });
                            update.catch((error) => {
                                this.products[index].error = Object.values(error.errors)[0][0];
                            });

                            return update;
                        }));
                        this.$emit('close');
                    } catch (e) {

                    }
                    this.loading = false;
                }
            },
            cancel() {
                this.$emit('close');
            },
        },
    };
</script>

<style scoped>
  input {
    cursor: pointer;
    width: 100%;
    height: 100%;
    opacity: 0;
    filter: alpha(opacity=0);
    zoom: 1; /* Fix for IE7 */
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .no-selection {
    width:100%;
    text-align: center;
    border: 3px dotted gray;
  }
</style>
