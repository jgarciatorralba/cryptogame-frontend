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
    };
  },
  methods: {
    getData() {
      fetch(
        coinChartUrl(this.details.id, this.details.currency, this.details.days)
      )
        .then((response) => response.json())
        .then((data) => {
          this.chartData = data.prices;
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
                    unit: "hour",
                  },
                  ticks: {
                    source: "auto",
                    autoSkip: true,
                    maxTicksLimit: 10,
                    maxRotation: 0,
                    minRotation: 0,
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
      this.getData();
      this.destroyChart();
      this.createChart();
    },
  },
  mounted() {
    this.getData();

    // Set Interval to refresh data every 5 min
    setInterval(this.refreshChart, 5 * 60 * 1000);
  },
  updated() {
    this.createChart();
  },
};
</script>

<style scoped>
</style>