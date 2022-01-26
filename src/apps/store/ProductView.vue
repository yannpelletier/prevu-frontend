<template>
  <v-dialog :value="product" fullscreen transition="scroll-y-transition">
    <v-card :color="primaryColor" v-if="lastProduct" tile>
      <v-app-bar color="transparent" flat>
        <div>
          <v-btn icon :dark="isDark(primaryColor)" @click="back">
            <v-icon>
              mdi-arrow-left
            </v-icon>
          </v-btn>
        </div>
      </v-app-bar>
      <hooper
        ref="hooper"
        style="height: 100%"
        @slide="changeProductSlide"
        items-to-show="1"
        :mouse-drag="false"
        :touch-drag="touchScreen"
        center-mode="true"
        :initial-slide="initialProductIndex"
      >
        <slide
          v-for="currentProduct in products"
          :slug="currentProduct.slug"
          class="slide"
          :style="{'height': mobile ? '100%' : '85vh'}"
        >
          <v-container>
            <swipe-indicator v-if="mobile" :value="!navigated" :light="isLight(secondaryColor)"/>
            <v-row :no-gutters="mobile">
              <v-col xs="8" sm="8" cols="12">
                <v-img
                  :src="currentProduct.preview"
                  :max-height="mobile ? '100%' : '85vh'"
                  contain
                />
              </v-col>
              <v-col xs="4" sm="4" cols="12">
                <v-card
                  class="text-center overflow-y-auto"
                  :color="secondaryColor"
                  :max-height="mobile ? '100%' : '85vh'"
                  elevation="0"
                  tile
                >
                  <v-card-text>
                    <v-flex align-center justify-center>
                      <div class="headline mb-4" :style="{'color': pivotColor(secondaryColor)}">{{
                        currentProduct.name }}
                      </div>
                      <v-divider v-if="currentProduct.description"></v-divider>
                      <div
                        class="ma-4"
                        style="font-size: 18pt"
                        :style="{'color': pivotColor(secondaryColor)}">
                        {{ currentProduct.formattedPrice }}
                      </div>
                      <div class="mb-2">
                        <v-btn
                          width="200px"
                          :color="tertiaryColor"
                          :light="isLight(tertiaryColor)"
                          x-large
                          depressed
                          class="buy-now-btn"
                          @click="buyNow(currentProduct)"
                        >
                          Buy now
                        </v-btn>
                      </div>
                      <div>
                        <v-btn
                          width="200px"
                          height="45px"
                          :color="tertiaryColor"
                          :light="isLight(tertiaryColor)"
                          x-large
                          depressed
                          outlined
                          @click="toggleCart(currentProduct.id)"
                          :style="{'color': currentProduct.inCart ? tertiaryColor : pivotColor(secondaryColor)}"
                        >
                          <v-icon class="ma-2">mdi-cart-outline</v-icon>
                          {{ currentProduct.inCart ? 'Added to cart' : 'Add to cart' }}
                        </v-btn>
                      </div>
                    </v-flex>
                    <v-divider class="my-4"/>
                    <div class="mb-2" style="opacity: 0.8">
                      <v-chip v-for="(info, name) in currentProduct.infos" class="mr-2"
                              :color="pivotColor(secondaryColor)" outlined
                              :light="isLight(secondaryColor)">
                        <v-icon class="mr-1" small>{{info.icon}}</v-icon>
                        <template v-if="name === 'dimensions'">
                          {{info.text.toLowerCase()}}
                        </template>
                        <template v-else>
                          {{name.charAt(0).toUpperCase() + name.slice(1)}}: {{info.text.toUpperCase()}}
                        </template>
                      </v-chip>
                      <v-chip class="mr-2"
                              :color="pivotColor(secondaryColor)" outlined
                              :light="isLight(secondaryColor)">
                        <v-icon class="mr-1" small>mdi-file</v-icon>
                        .{{currentProduct.extension.toUpperCase()}} file
                      </v-chip>
                    </div>
                    <div :style="{'color': pivotColor(secondaryColor)}" class="my-5">
                      <v-icon small :light="isLight(secondaryColor)"
                              :color="pivotColor(secondaryColor)">
                        mdi-lock
                      </v-icon>&nbsp;
                      Preview protection | {{ productFilters(currentProduct) }}
                    </div>
                    <template v-if="currentProduct.description">
                      <p class="mt-5 text-justify" :style="{'color': pivotColor(secondaryColor)}">
                        {{ currentProduct.description }}
                      </p>
                    </template>
                    <p class="mb-2"
                       :style="{'color': pivotColor(secondaryColor)}"
                       style="opacity: 0.6"
                    >
                      After purchasing this product, you will receive the original
                      .{{currentProduct.extension}} file, without any preview filter.
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </slide>
        <hooper-navigation v-if="!touchScreen" slot="hooper-addons"/>
      </hooper>
    </v-card>
  </v-dialog>
</template>

<script>
  import GenericStoreComponent from '@/apps/store/GenericStoreComponent';
  import SwipeIndicator from "@/components/alerts/SwipeIndicator";
  import {Hooper, Navigation as HooperNavigation, Slide} from 'hooper';

  import 'hooper/dist/hooper.css';

  export default {
    name: "StoreProduct",
    components: {
      SwipeIndicator,
      Hooper,
      Slide,
      HooperNavigation
    },
    extends: GenericStoreComponent,
    data() {
      return {
        lastProduct: this.product,
        navigated: false,
        initialProductIndex: this.getProductIndex(this.product)
      }
    },
    props: {
      product: {
        type: String,
      },
      products: {
        type: Array,
      },

      //Global attributes
      mobile: {
        type: Boolean,
      },
      touchScreen: {
        type: Boolean,
      },
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
      changePage: {
        type: Function,
      },
      toggleCart: {
        type: Function,
      },
      addToCart: {
        type: Function,
      },
    },
    watch: {
      product(newProduct) {
        if (newProduct) {
          this.lastProduct = newProduct;
          if (this.$refs.hooper) {
            this.$refs.hooper.slideTo(this.getProductIndex(newProduct));
          } else {
            this.initialProductIndex = this.getProductIndex(newProduct);
          }
        }
      }
    },
    computed: {
      productFilters() {
        return (product) => {
          let displayedFilters = [];
          for (const [filterKey, filterValue] of Object.entries(product.filters)) {
            let {name, unit, min} = product.filtersInfo[filterKey];
            if (filterValue > min) {
              displayedFilters.push(`${filterValue} ${unit} ${name.toLowerCase()}`);
            } else if (filterKey === 'watermark' && filterValue) {
              displayedFilters.push("Watermark");
            }
          }
          return displayedFilters.join(' | ');
        };
      }
    },
    methods: {
      changeProductSlide({currentSlide}) {
        let newSlug = this.products[currentSlide].slug;
        this.navigated = true;
        if (this.lastProduct !== newSlug) {
          this.changePage(null, {product: newSlug});
          this.lastProduct = newSlug;
        }
      },
      back() {
        this.changePage(null, {product: undefined});
      },
      buyNow(product) {
        if (product.inCart !== true) {
          this.addToCart(product.id);
        }
        this.changePage('checkout');
      },
      getProductIndex(product) {
        for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].slug === product) {
            return i;
          }
        }
        return -1;
      }
    },
  }
</script>
<style scoped lang="scss">
  .previous-slide-button, .next-slide-button {
    position: absolute;
    margin: auto;
    z-index: 10;
    cursor: pointer;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .previous-slide-button {
    left: 10px;
  }

  .next-slide-button {
    right: 10px;
  }

</style>
<style lang="scss">
  .hooper-track {
    padding: 0 !important;
  }

  .hooper, .hooper * {
    outline: none !important;
  }
</style>
