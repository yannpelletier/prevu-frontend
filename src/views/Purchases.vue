<template>
  <v-container fluid>
    <v-skeleton-loader :loading="loading" transition="slide-y-transition" type="table">
      <v-data-table :headers="headers"
                    :items="purchases"
                    :search="search"
                    item-key="id"
                    v-model="selectedPurchases"
                    show-select
                    class="elevation-1"
                    :mobile-breakpoint="100"
      >
        <template v-slot:top>
          <v-toolbar flat color="white" class="mb-2">
            <v-text-field
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" text :disabled="!downloadMulipleEnabled"
                   @click="downloadMultiple">
              <v-icon class="mr-2">mdi-download-multiple</v-icon>
              Download multiple
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.thumbnail="{ item }">
          <v-img :src="item.thumbnail" eager class="my-4" max-width="100"
                 max-height="50" contain></v-img>
        </template>
        <template v-slot:item.name="{ item }">
          <v-layout align-center row style="flex-flow: row">
            <v-layout column justify-center class="my-2">
              <h3>{{item.name}}</h3>
              <div v-if="!isMobile">
                {{item.description }}
              </div>
            </v-layout>
          </v-layout>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn @click="viewPurchase(item)" color="primary" class="mr-2" text>
            View
          </v-btn>
          <v-btn @click="downloadPurchase(item)" color="primary">
            <v-icon class="mr-2">mdi-download</v-icon>
            Download
          </v-btn>
        </template>

        <template v-slot:header.description="{ item }" style="display: none"></template>
        <template v-slot:item.description="{ item }" style="display: none"></template>
      </v-data-table>
    </v-skeleton-loader>
  </v-container>

</template>

<script>
    import Purchase from '@/store/database/Purchase';
    import {mapGetters} from 'vuex';
    import { apiUrl } from '@/api';

    export default {
        name: "Purchases",
        data: () => {
            return {
                headers: [
                    {text: 'Thumbnail', value: 'thumbnail', sortable: false,},
                    {text: 'Product', value: 'name'},
                    {text: 'Description', value: 'description'},
                    {text: 'Date', value: 'date', width: 150, align: 'center'},
                    {text: '', value: 'action', sortable: false, align: 'right'}
                ],
                search: '',
                selectedPurchases: [],
                downloadMulipleEnabled: false,
                loading: true,
            }
        },
        computed: {
            purchases() {
                return Purchase.getters('authenticatedUserPurchases');
            },
            ...mapGetters('app', ['isMobile']),
        },
        watch: {
            selectedPurchases: function () {
                this.downloadMulipleEnabled = this.selectedPurchases.length >= 1;
            }
        },
        mounted() {
            this.loadPurchases();
        },
        methods: {
            async loadPurchases() {
                this.loading = true;
                await Purchase.dispatch('loadAuthenticatedUserPurchases');
                this.loading = false;
            },
            async viewPurchase(purchase) {
                window.open(purchase.original);
            },
            async downloadPurchase(purchase) {
                window.open(purchase.download);
            },
            async downloadMultiple() {
                let purchaseIds = this.selectedPurchases.map(selectedItem => selectedItem.id);
                let idsString = Object.keys(purchaseIds).map(key => 'ids[]=' + purchaseIds[key]).join('&');
                window.open(`${apiUrl}/api/purchases/zip?${idsString}`)
            }
        }
    }
</script>

<style scoped>
  .layout {
    display: inline-block;
    width: 100%;
  }
</style>
