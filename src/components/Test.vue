<template>
  <div class="container border p-3 my-5">
    <div v-if="loading">
      <p>Loading data...</p>
    </div>
    <div v-else class="cont-chart">
      <div class="chart">
        <canvas id="myChart" width="100%" height="50vh"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Chart from "chart.js";

export default {
  data() {
    return {
      loading: true,
      chartData: [],
    };
  },
  methods: {
    getData() {
      fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
      )
        .then((response) => response.json())
        .then((data) => {
          this.chartData = data.prices;
          this.loading = false;
        });
    },
    createChart() {
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
                var label =
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