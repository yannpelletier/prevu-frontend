<template>
  <v-data-table
    :headers="headers"
    :items="sales"
    :items-per-page="30"
    class="elevation-1"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Transactions</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:item.price="{ item }">
      {{ formatPrice(item.price, item.currency)}}
    </template>
  </v-data-table>
</template>

<script>
    import {mapState} from 'vuex';
    import currencyUtils from '@/utils/currency';

    export default {
        name: "Transactions",
        data() {
            return {
                headers: [
                    {text: 'Date', value: 'date'},
                    {text: 'Product', value: 'name'},
                    {text: 'Price', value: 'price'},
                    {text: 'Customer', value: 'buyerEmail'}
                ],
                loading: true,
            }
        },
        computed: {
            ...mapState('dashboard', ['sales'])
        },
        methods: {
            formatPrice(price, currency) {
                return currencyUtils.formatPrice(price, currency);
            },
        },
        async mounted() {
            this.loading = true;
            await this.$store.dispatch("dashboard/loadSales");
            this.loading = false;
        }
    }
</script>

<style scoped>

</style>
