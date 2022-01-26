<template>
  <v-container fluid>
    <v-dialog :value="stepNumber === 2 && !uploading" :fullscreen="isMobile" @close="onClosed"
              no-click-animation persistent max-width="1200px">
      <product-edit :products="edited" @close="advanceStep" :loading="loading"></product-edit>
    </v-dialog>
    <v-dialog :value="stepNumber === 3 && !uploading" :fullscreen="isMobile" @close="onClosed"
              no-click-animation persistent max-width="1200px">
      <product-preview-edit :products="edited" @close="advanceStep"
                            :loading="loading"></product-preview-edit>
    </v-dialog>
    <v-dialog :value="uploading" :fullscreen="isMobile" @close="onClosed"
              @click:outside="closeUpload" no-click-animation persistent max-width="1200px">

      <stepper :headers="addNewProductSteps" :completed-steps="stepNumber">
        <v-stepper-content step="1" min-height="100%">
          <product-upload @file-uploaded="createProducts" :loading="loading"
                          :progress="totalProgress"></product-upload>
          <v-btn v-if="isMobile" color="primary" dark width="100%" @click="closeUpload">Close
          </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <product-edit :products="edited" @close="advanceStep" skippable
                        :loading="loading"></product-edit>
        </v-stepper-content>
        <v-stepper-content step="3">
          <product-preview-edit v-if="stepNumber === 3" :products="edited" @close="advanceStep"
                                skippable
                                :loading="loading"></product-preview-edit>
        </v-stepper-content>
      </stepper>
    </v-dialog>
    <v-skeleton-loader :loading="loading" transition="slide-y-transition" type="table">
      <v-data-table show-select
                    v-model="selected"
                    :headers="responsiveHeaders"
                    :items="products"
                    item-key="id"
                    class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white" class="mb-2">
            <v-btn color="primary" dark @click="beginUpload" dusk="add-new-products">New Products
            </v-btn>
            <div class="flex-grow-1"></div>
            <div>
              <v-btn color="primary" title="Edit prices & descriptions"
                     :disabled="selected.length === 0" icon
                     @click="editProducts(selected)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn color="primary" title="Edit preview filters" :disabled="selected.length === 0"
                     icon
                     @click="editProductsPreview(selected)">
                <v-icon>mdi-image-edit-outline</v-icon>
              </v-btn>
              <v-btn color="primary" title="Delete products" :disabled="selected.length === 0" icon
                     @click="requestDeleteProducts(selected)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </v-toolbar>
        </template>
        <template v-slot:item.thumbnail="{ item }">
          <v-img :src="item.privateThumbnail" eager
                 class="my-4" width="100" height="50" :position="isMobile ? 'right' : 'center'"
                 contain></v-img>
        </template>
        <template v-slot:item.price="{ item }">
          {{ formatPrice(item.price, "USD") }}
        </template>
        <template v-slot:item.product="{ item }">
          <span>{{ item.name }}</span><br>
          <div v-if="item.compilationState === 'draft'">
            <a @click="editProductsPreview([item])">In Draft</a>
          </div>
          <div v-if="item.compilationState === 'queued'">
            <span class="blue-grey--text text--lighten-1">Queued up for compilation</span>
          </div>
          <div v-if="item.compilationState === 'compiling'">
            <span class="blue-grey--text text--lighten-1">Generating preview...</span>
          </div>
          <div v-else-if="item.compilationState === 'failed'">
            <span class="red--text">Something went wrong with preview generation</span>
          </div>
          <div v-else-if="item.compilationState === 'compiled' && item.link">
            <external-link :to="item.link">View product in store</external-link>
          </div>
          <div v-else-if="item.compilationState === 'compiled' && !item.link">
            <span class="blue-grey--text text--lighten-1"><router-link to="/store-editor">Create a store</router-link> to sell your product</span>
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn title="Edit price & description" icon class="mr-2" @click="editProducts([item])">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn title="Edit preview filters" icon class="mr-2"
                 @click="editProductsPreview([item])">
            <v-icon>
              mdi-image-edit-outline
            </v-icon>
          </v-btn>
          <v-btn title="Delete product" icon @click="requestDeleteProducts(item)">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-skeleton-loader>
  </v-container>
</template>

<script>

  import {cloneDeep} from "lodash";
    import {mapGetters} from 'vuex';
    import currencyUtils from '@/utils/currency'

    import ExternalLink from "../components/buttons/ExternalLink";

    import ProductUpload from '@/components/products/ProductUpload';
    import ProductEdit from '@/components/products/ProductEdit';
    import ProductPreviewEdit from '@/components/products/ProductPreviewEdit';

    import Product from '@/store/database/Product';
    import Stepper from "../components/layouts/Stepper";

    export default {
        name: "Products",
        components: {
            Stepper,
            ProductPreviewEdit, ProductEdit, ProductUpload, ExternalLink
        },
        data() {
            return {
                loading: false,

                colors: [
                    'primary',
                    'secondary',
                    'yellow darken-2',
                    'red',
                    'orange',
                ],
                headers: {
                    mobile: [
                        {
                            text: 'Thumbnail',
                            value: 'thumbnail',
                            sortable: false,
                            align: 'right'
                        },
                        {text: 'Product', align: 'left', value: 'product', sortable: false,},
                        {text: 'Price', value: 'price'},
                        {text: 'Actions', value: 'action', sortable: false},
                    ],
                    desktop: [
                        {
                            text: 'Thumbnail',
                            value: 'thumbnail',
                            sortable: false,
                            align: 'left',
                            width: 50,
                        },
                        {text: 'Product', align: 'left', value: 'product', sortable: false,},
                        {text: 'Price', value: 'price'},
                        /*{text: 'Views', value: 'views'},
                        {text: 'Add to carts', value: 'addToCarts'},
                        {text: 'Sales', value: 'sales'},*/
                        {text: 'Actions', value: 'action', sortable: false},
                    ]
                },
                addNewProductSteps: [
                    {
                        name: 'Add a new product',
                        completed: this.stepNumber > 1
                    },
                    {
                        name: 'Edit Product Meta',
                        completed: this.stepNumber > 2
                    },
                    {
                        name: 'Edit Product Preview',
                        completed: false
                    }

                ],
                selected: [],
                edited: [],
                uploading: false,
                stepNumber: 1,
                MAX_STEP_NUMBER: 3,
                totalProgress: 0
            }
        },
        computed: {
            ...mapGetters('app', ['isMobile']),
            products() {
                return Product.getters('authenticatedUserProducts').reverse();
            },
            responsiveHeaders() {
                return this.headers[this.isMobile ? 'mobile' : 'desktop'];
            }
        },
        async mounted() {
            await this.loadProducts();
        },
        methods: {
            formatPrice(price, currency) {
                return currencyUtils.formatPrice(price, currency);
            },

            //Product functions
            async createProducts(files) {
                const fileList = [...files];

                try {
                    this.loading = true;

                    let newProducts = await Product.dispatch('createByFiles',
                        {
                            files: fileList,
                            uploadProgressCallback: (progress) => {
                                this.totalProgress = progress * 0.7;
                            }
                        }
                    );


                    this.editProducts(newProducts);
                    this.loading = false;
                } catch (e) {
                    this.$error("Error", e.errors.file[0]);
                    this.loading = false;
                }
            },
            async loadProducts() {
                this.loading = true;
                await Product.dispatch('loadAuthenticatedUserProducts');
                this.loading = false;
            },
            async deleteProduct(product) {
                this.loading = true;
                await Product.dispatch('deleteById', product.id);
                this.loading = false;
            },
            async deleteProducts(products) {
                this.loading = true;
                await Promise.all(products.map(product => {
                    return Product.dispatch('deleteById', product.id);
                }));
                this.selected = [];
                this.loading = false;
            },
            async requestDeleteProducts(products) {
                if (await this.$confirm("Delete", "Are you sure you want to delete this product?", {
                    agreeText: 'Yes',
                    cancelText: 'Cancel'
                })) {
                    if (Array.isArray(products)) {
                        this.deleteProducts(products);
                    } else {
                        this.deleteProduct(products);
                    }
                }
            },

            //Uploading/dialogs
            beginUpload() {
                this.uploading = true;
                this.stepNumber = 1;
            },
            async advanceStep() {
                if (this.uploading) {
                    this.stepNumber += 1;
                    if (this.stepNumber > this.MAX_STEP_NUMBER) {
                        this.close();
                    }
                } else {
                    this.close();
                }
            },
            closeUpload() {
                if (this.stepNumber === 1) {
                    this.close();
                }
            },
            close() {
                this.stepNumber = 1;
                this.uploading = false;
            },
            onClosed() {
                this.edited = [];
                this.selected = [];
            },

            editProducts(products) {
                this.edited = cloneDeep(products);
                this.stepNumber = 2;
            },
            editProductsPreview(products) {
                this.edited = cloneDeep(products);
                this.stepNumber = 3;
            },
        },
    }
</script>

<style scoped>

</style>
