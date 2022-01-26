<template>
  <div>
    <store-banner
      v-bind="componentAttributes('banner', 'mediaLinks')"
    />
    <div style="min-height:98vh;">
      <store-bar
        v-bind="componentAttributes('navBar')"
      />
      <v-container style="max-width: 1200px;" class="has-footer">
        <v-carousel hide-delimiters :show-arrows="false" :value="page" height="100%">
          <v-carousel-item v-for="(pageChunk, index) in pageChunks" :value="index + 1">
            <v-row class="pa-1">
              <v-col v-for="product in pageChunk" :cols="mobile ? 6 : 3" class="pa-1">
                <v-card
                  :class="[`product-${product.slug}`]"
                  :color="secondaryColor"
                  @click.prevent="displayProduct(product.slug)"
                  :ripple="false"
                  elevation="0"
                  tile
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-card
                      :color="primaryColor"
                      elevation="0"
                      tile
                    >
                      <v-img :src="product.publicThumbnail" aspect-ratio="1">
                        <v-card
                          v-if="!mobile"
                          class="product px-2 py-0"
                          :class="{'visible': hover}"
                          height="100%"
                          :color="alphaColor(secondaryColor, 0.8)"
                          elevation="0"
                          tile
                        >
                          <v-card-title class="headline font-weight-medium text-break"
                                        :style="{'color': pivotColor(secondaryColor)}">
                            {{product.name}}
                          </v-card-title>
                          <v-card-subtitle class="title font-weight-light"
                                           :style="{'color': pivotColor(secondaryColor)}">
                            {{product.formattedPrice}}
                          </v-card-subtitle>
                          <v-card-actions>
                            <v-btn
                              @click.stop
                              @click="toggleCart(product.id)"
                              :color="tertiaryColor"
                              :dark="isDark(tertiaryColor)"
                              :outlined="product.inCart"
                              depressed
                              :style="{'color': product.inCart ? tertiaryColor : pivotColor(tertiaryColor)}"
                            >
                              {{product.inCart ? 'Added to cart' : 'Add to cart'}}
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-img>
                    </v-card>
                  </v-hover>
                </v-card>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>
        <v-pagination
          v-if="totalPages > 1"
          :length="totalPages"
          :value="page"
          @input="setProductPage"
          :color="tertiaryColor"
          :dark="isDark(primaryColor)"
          class="mt-5"
        />
      </v-container>
      <store-footer
        v-bind="componentAttributes()"
      />
    </div>
  </div>
</template>

<script>
  import {chunk} from "lodash";
  import GenericStoreComponent from '@/apps/store/GenericStoreComponent';

  const PRODUCTS_PER_PAGE = 16;

  export default {
    name: "StoreHome",
    extends: GenericStoreComponent,
    components: {
      StoreBanner: () => import('@/apps/store/banner/Banner'),
      StoreBar: () => import('@/apps/store/bar/Bar'),
      StoreFooter: () => import('@/apps/store/footer/Footer'),
    },
    props: {
      //Global attributes
      mobile: {
        type: Boolean,
      },
      products: {
        type: Array,
      },
      p: {
        type: String,
        default: '1',
      },

      //General attributes
      primaryColor: {
        type: String,
      },
      secondaryColor: {
        type: String,
      },
      tertiaryColor: {
        type: String,
      },

      //Functions
      toggleCart: {
        type: Function,
      },
      changePage: {
        type: Function,
      },
      scrollTo: {
        type: Function,
      },
    },
    methods: {
      setProductPage(page) {
        if (this.page !== page) {
          this.changePage(null, {p: page});
          this.scrollTo('nav-bar');
        }
      },
      displayProduct(productSlug) {
        this.changePage(null, {product: productSlug});
      },
    },
    computed: {
      page() {
        return parseInt(this.p);
      },
      pageChunks() {
        return chunk(this.products, PRODUCTS_PER_PAGE);
      },
      totalPages() {
        return this.pageChunks.length;
      },
    }
  }
</script>
<style scoped lang="scss">
  .has-footer {
    padding-bottom: 80px;
  }

  .product {
    opacity: 0;
    transform: translateY(-5px);
    transition: 0.25s;

    &.visible {
      opacity: 1;
      transform: translateY(0px);
    }
  }

</style>
<style lang="scss">
  .v-pagination > li {
    .v-pagination__item, .v-pagination__navigation {
      box-shadow: none;
      -webkit-box-shadow: none;
      outline: none;
    }
  }
</style>
