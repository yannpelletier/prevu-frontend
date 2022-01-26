<template>
  <v-card class="product-preview-edit" :loading="loading">
    <v-card-title>
      <span class="headline">Edit Product preview</span>
    </v-card-title>
    <v-card-text v-if="showMassEdit">
      <v-chip-group v-model="editType" color="primary" mandatory rounded>
        <v-chip value="mass">Mass edit</v-chip>
        <v-chip value="individual">Individual edit</v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-text>
      <div v-for="(product, i) in visibleProducts">
        <v-row>
          <v-col cols="12" md="5" height="500" align="center" align-self="center">
            <live-product-preview
              :watermarkId="product.filters.watermark"
              :pixel-size="product.filters.pixelSize"
              :blur="product.filters.blur"
              :src="product.original"
            />
          </v-col>
          <v-col cols="12" md="7">
            <div v-for="(filterInfo,filterId) in product.filtersInfo">
              <div v-if="filterInfo.type === 'number'">
                <v-slider
                  v-model="product.filters[filterId]"
                  :step="filterInfo.step"
                  :min="filterInfo.min"
                  :max="filterInfo.max"
                  :height="40"
                  :class="`filter-slider-${filterId}`"
                >
                  <template v-slot:label>
                    <div style="width: 150px; color: black">
                      {{filterInfo.name}}: {{product.filters[filterId]}}{{filterInfo.unit}}
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon color="grey" v-on="on">mdi-information</v-icon>
                        </template>
                        <span>{{filterInfo.note}}</span>
                      </v-tooltip>
                    </div>
                  </template>
                </v-slider>
              </div>
              <div v-else-if="filterInfo.type === 'watermark'" class="mt-4">
                <v-select
                  v-model="product.filters[filterId]"
                  :items="watermarkOptions"
                  outlined>
                  <template v-slot:label>
                    {{filterInfo.name}}
                  </template>
                </v-select>
                <v-btn text to="/watermarks">
                  <v-icon class="mr-2">mdi-plus</v-icon>
                  Add a custom watermark
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-divider class="mb-8 mt-2" v-if="i !== visibleProducts.length - 1"/>
      </div>
    </v-card-text>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn text v-on:click="cancel">{{ skippable ? 'Skip' : 'Cancel'}}</v-btn>
      <v-btn class="save-btn" depressed color="primary" v-on:click="save">Save and compile</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import LiveProductPreview from '@/components/products/LiveProductPreview';

    import Product from '@/store/database/Product';
    import Watermark from '@/store/database/Watermark';

    export default {
        name: 'ProductPreviewEdit',
        components: {
            LiveProductPreview
        },
        props: {
            products: Array,
            skippable: Boolean
        },
        data() {
            return {
                loading: false,
                editType: this.getDefaultEditType(),
            };
        },
        computed: {
            watermarkOptions() {
                return [
                    {text: 'None', value: null},
                    ...Watermark.getters('authenticatedUserWatermarks').map(watermark => {
                        return {text: watermark.name, value: watermark.id};
                    }),
                    ...Watermark.getters('defaultWatermarks').map(watermark => {
                        return {text: watermark.name, value: watermark.id};
                    }),
                ];
            },
            firstProduct() {
                return this.products[0];
            },
            showMassEdit() {
                return this.products.length > 1;
            },
            visibleProducts() {
                if (this.editType === 'mass') {
                    return [this.products[0]];
                }
                return this.products;
            }
        },
        watch: {
            'firstProduct.filters': {
                handler() {
                    if (this.editType === "mass") {
                        for (let i = 1; i < this.products.length; i++) {
                            for (let filterId in this.firstProduct.filters) {
                                this.products[i].filters[filterId] = this.firstProduct.filters[filterId];
                            }
                        }
                    }
                },
                deep: true,
            }
        },
        methods: {
            getDefaultEditType() {
                if (this.products.length > 1) {
                    return "mass";
                } else {
                    return "individual";
                }
            },
            async save() {
                if (this.products.length > 0) {
                    this.loading = true;
                    await Promise.all(this.products.map(product => {
                        return Product.dispatch('updateById', {
                            id: product.id,
                            data: {
                                filters: product.filters,
                            }
                        });
                    }));
                    this.loading = false;
                }
                this.$emit('close');
            },
            cancel() {
                this.$emit('close');
            },
        },
    };
</script>

<style>
.v-slider {
  cursor: pointer;
}
</style>
