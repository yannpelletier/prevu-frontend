<template>

  <v-card class="overflow-hidden" :loading="loading">
    <v-tabs v-model="selectedInterval">
      <v-tab v-for="interval in intervals" style="font-size: 12pt">
        {{ interval }}
      </v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-tabs background-color="#F3F3F3" icons-and-text>
      <v-tabs-slider/>

      <v-tab>
        Gross volume
        <v-icon>mdi-currency-usd</v-icon>
      </v-tab>
      <v-tab>
        Products sold
        <v-icon>mdi-percent</v-icon>
      </v-tab>
      <!--<v-tab>
        Visits
        <v-icon>mdi-eye</v-icon>
      </v-tab>-->

      <v-tab-item v-for="chart in charts">
        <v-card flat tile>
          <v-card-text>
            <chart :height="180" :chart-data="chart.data" :custom-options="chart.options"
                   :ready="ready"/>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
    import Chart from "@/components/infographics/Chart.js";
    import SellerProgression from "@/views/Dashboard/SellerProgression";
    import User from '@/store/database/User';

    export default {
        name: 'Charts',
        components: {
            SellerProgression,
            Chart
        },
        data() {
            return {
                intervals: ['1W', '2W', '1M', '3M', '1Y'],
                selectedInterval: 0,
                loading: false,
                charts: {
                    grossVolume: {data: null, options: null},
                    itemsSold: {data: null, options: null}
                },
                ready: false
            };
        },
        async mounted() {
            this.loading = true;
            await User.dispatch('loadAnalytics');
            this.fillData();
            this.loading = false;
            this.ready = true;
        },
        watch: {
            selectedInterval(val) {
                this.fillData();
            }
        },
        computed: {
            authenticatedUser() {
                return User.getters('authenticatedUser')();
            },
            days: function () {
                switch (this.selectedInterval) {
                    case 0:
                        return 7;
                    case 1:
                        return 14;
                    case 2:
                        return 30;
                    case 3:
                        return 91;
                }
                return 365;
            },
            labels: function () {
                let labels = [];
                let currentDate = new Date();
                currentDate.setDate(currentDate.getDate() - this.days);
                for (let i = 0; i < this.days; i++) {
                    currentDate.setDate(currentDate.getDate() + 1);
                    labels.push(currentDate.toDateString());
                }
                return labels;
            },
        },
        methods: {
            fillData() {
                this.charts = {
                    grossVolume: {
                        data: {
                            labels: this.labels,
                            datasets: [
                                {
                                    label: "Daily sales",
                                    data: this.authenticatedUser.analytics.grossVolume
                                        .slice(-this.days).map((value) => value / 100),
                                    borderColor: 'rgba(23,232,174,1)',
                                    backgroundColor: 'rgba(23,232,174,0.20)'
                                }
                            ],
                        },
                        options: {
                            tooltip: function (toolTipItem, data) {
                                return "$ " + data.datasets[0].data[toolTipItem.index].toFixed(2);
                            },
                            yTicks: function (value) {
                                return '$ ' + value;
                            }
                        }
                    },
                    itemsSold: {
                        data: {
                            labels: this.labels,
                            datasets: [
                                {
                                    label: "Products sold",
                                    data: this.authenticatedUser.analytics.itemsSold
                                        .slice(-this.days),
                                    borderColor: 'rgba(22,232,225,1)',
                                    backgroundColor: 'rgba(22,232,225,0.20)'
                                }
                            ],
                        },
                        options: {
                            tooltip: (toolTipItem, data) => {
                                return data.datasets[0].data[toolTipItem.index] + " products";
                            },
                            yTicks: (value) => {
                                return value;
                            }
                        }
                    }
                };
            }
        }
    }
</script>

<style lang="scss">

</style>
