//../src/Chart.js
import {generateChart, mixins} from 'vue-chartjs'

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
  global: {
    defaultFontColor: "#444"
  }
});

const CustomLine = generateChart('custom-line', 'LineWithLine');

export default {
  extends: CustomLine,
  mixins: [mixins.reactiveProp],
  props: {
    customOptions: {
      type: Object,
      default: {}
    },
    chartData: {
      type:Object,
      default: null
    },
    ready: Boolean
  },
  data() {
    return {
      options: {
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            beforeBody: function () {
              return '';
            }, labelColors: []
          },
          custom: function (tooltip) {
            if (!tooltip) return;
            tooltip.displayColors = false;
          },
        },
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 14,
              beginAtZero: true,
              maxTicksLimit: 4,
              padding: 20,
            },
            gridLines: {
              color: '#AAA',
              drawTicks: false
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 14,
              padding: 20,
              autoSkip: true,
              maxTicksLimit: 14,
              userCallback: function (value) {
                let date = new Date(value);
                let dateStr = date.toDateString();
                return dateStr.substring(4, dateStr.length - 5);
              }
            },
            gridLines: {
              color: '#AAA',
              drawTicks: false,
              display: false
            }
          }]
        },
        elements: {
          line: {
            tension: 0
          }
        },
        legend: {
          display: false,
        },
      },
    }
  },
  watch: {
    /**
     * Is used to fix a bug:
     * The custom options where not set correctly for the first chart out of two.
     * To be removed if possible.
     * @param val
     */
    ready(val) {
      if (val === true) {
        this.updateChart();
      }
    },
  },
  mounted() {
    this.updateChart();
  },
  methods: {
    hexToRGBA: (hex, alpha) => {
      let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

      if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      } else {
        return `rgba(${r}, ${g}, ${b})`;
      }
    },
    getBackgroundColorGradient: function (context, color) {
      let gradient = context.createLinearGradient(0, 0, 0, 225);
      gradient.addColorStop(0, this.hexToRGBA(color, 1));
      gradient.addColorStop(0, this.hexToRGBA(color, 0.2));
      return gradient;
    },
    updateChart() {
      // this.chartData.datasets[0].backgroundColor = this.getBackgroundColorGradient(this.$refs.canvas.getContext('2d'), this.chartData.datasets[0].borderColor);
      if (this.customOptions) {
        this.options.tooltips.callbacks.label = this.customOptions.tooltip;
        this.options.scales.yAxes[0].ticks.userCallback = this.customOptions.yTicks;
        this.renderChart(this.chartData, this.options);
      }
    }
  }

}
