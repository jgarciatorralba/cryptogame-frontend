<template>
  <div class="container border p-3 my-3 bg-white">
    <div v-if="loading" class="text-center">
      <p class="my-2">Loading content...</p>
    </div>
    <div v-else class="cont-chart">
      <div class="chart">
        <canvas id="myChart"></canvas>
      </div>
    </div>
    <div class="button-cont">
      <button
        @click="swapTo8h()"
        id="btn-8h"
        class="btn btn-light border btn-sm"
      >
        <small>8h</small>
      </button>
      <button
        @click="swapTo1d()"
        id="btn-1d"
        class="btn btn-light border btn-sm"
        disabled
      >
        <small>1d</small>
      </button>
      <button
        @click="swapTo7d()"
        id="btn-7d"
        class="btn btn-light border btn-sm"
      >
        <small>7d</small>
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Chart from "chart.js";
import { coinChartUrl } from "../../config/config.js";

export default {
  props: ["details"],
  data() {
    return {
      loading: true,
      chartData: null,
      symbol: null,
      interval: null,
    };
  },
  methods: {
    getData() {
      fetch(coinChartUrl(this.symbol, this.details.days))
        .then((response) => response.json())
        .then((data) => {
          this.chartData = data.data.prices;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },
    createChart() {
      if (this.chartData == null) {
        $(".chart").empty();
        let p = $("<p>");
        p.text("There was a problem fetching the data.");
        p.addClass("my-2 text-center");
        $(".chart").append(p);
      } else {
        let unit;
        let callback;
        if (this.details.days == 7) {
          unit = "days";
          callback = function (value, index, values) {
            return moment(value).format("MMM Do");
          };
        } else {
          unit = "hour";
          callback = function (value, index, values) {
            return value;
          };
        }

        let labels = [];
        let data = [];
        this.chartData.forEach((item) => {
          labels.push(item[0]);
          data.push(item[1]);
        });

        let ctx = document.getElementById("myChart");
        let myLineChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: ["rgba(255, 159, 64, 0.2)"],
                borderColor: ["rgba(255, 159, 64, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  type: "time",
                  time: {
                    // tooltipFormat: "h:mm:ss a",
                    unit: unit,
                  },
                  ticks: {
                    source: "auto",
                    autoSkip: true,
                    maxTicksLimit: 10,
                    maxRotation: 0,
                    minRotation: 0,
                    callback: callback,
                  },
                },
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: false,
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                      let nf = new Intl.NumberFormat("en-US");
                      let formated = "$" + nf.format(value);
                      return formated;
                    },
                  },
                },
              ],
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  let label =
                    data.datasets[tooltipItem.datasetIndex].label || "Price";

                  if (label) {
                    label += ": ";
                  }

                  let nf = new Intl.NumberFormat("en-US");
                  let formated = "$" + nf.format(tooltipItem.yLabel.toFixed(2));
                  label += formated;
                  return label;
                },
              },
            },
          },
        });
      }
    },
    destroyChart() {
      $(".chart").remove();
      let chart = $("<div>");
      chart.addClass("chart");
      let canvas = $("<canvas>");
      canvas.attr("id", "myChart");
      canvas.height("50vh").width("100%");
      canvas.appendTo(chart);
      $(".cont-chart").append(chart);
    },
    refreshChart() {
      fetch(coinChartUrl(this.symbol, this.details.days))
        .then((response) => response.json())
        .then((data) => {
          this.chartData = data.data.prices;
          this.destroyChart();
          this.createChart();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    swapTo7d() {
      this.details.days = 7;

      $("#btn-8h").removeClass("active");
      $("#btn-1d").removeClass("active");
      $("#btn-7d").addClass("active");
      $("#btn-8h").prop("disabled", false);
      $("#btn-1d").prop("disabled", false);
      $("#btn-7d").prop("disabled", true);

      fetch(coinChartUrl(this.symbol, this.details.days))
        .then((response) => response.json())
        .then((data) => {
          this.chartData = data.data.prices;
          this.destroyChart();
          this.createChart();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    swapTo1d() {
      this.details.days = 1;

      $("#btn-8h").removeClass("active");
      $("#btn-1d").addClass("active");
      $("#btn-7d").removeClass("active");
      $("#btn-8h").prop("disabled", false);
      $("#btn-1d").prop("disabled", true);
      $("#btn-7d").prop("disabled", false);

      fetch(coinChartUrl(this.symbol, this.details.days))
        .then((response) => response.json())
        .then((data) => {
          this.chartData = data.data.prices;
          this.destroyChart();
          this.createChart();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    swapTo8h() {
      this.details.days = 0;
      let to = Date.now() / 1000;
      let from = to - 60 * 60 * 8;

      $("#btn-8h").addClass("active");
      $("#btn-1d").removeClass("active");
      $("#btn-7d").removeClass("active");
      $("#btn-8h").prop("disabled", true);
      $("#btn-1d").prop("disabled", false);
      $("#btn-7d").prop("disabled", false);

      fetch(coinChartUrl(this.symbol, this.details.days))
        .then((response) => response.json())
        .then((data) => {
          this.chartData = data.data.prices;
          this.destroyChart();
          this.createChart();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.symbol = this.$route.query.symbol;
    this.getData();

    // Set Interval to refresh data every 5 min
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(this.refreshChart, 5 * 60 * 1000);
  },
  updated() {
    this.createChart();
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}
.button-cont {
  position: absolute;
  top: 1vh;
  right: 1vw;
}
</style>