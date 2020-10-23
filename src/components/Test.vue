<template>
  <div class="container">
    <h1 class="text-center my-3">Test</h1>
    <div class="chart-cont border p-3">
      <div v-if="loading">
        <p>Loading data...</p>
      </div>
      <div v-else>
        <div class="chart">
          <canvas id="myChart" width="100%" height="50vh"></canvas>
        </div>
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
      let curatedData = [];

      fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=1"
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.prices)

          data.prices.forEach((el) => {
            let record = {};
            record.date = moment(el[0]).format("LT");
            record.value = el[1];
            curatedData.push(record);
          });

          this.chartData = curatedData;
          this.loading = false;
        });
    },
    refreshChart() {
      console.log("Hola!");
    },
  },
  mounted() {
    //TODO ajax request first page load
    this.getData();

    // Set Interval to refresh data every 5 min
    setInterval(this.refreshChart, 5 * 60 * 1000);
  },
  updated() {
    let labels = [];
    let data = [];
    this.chartData.forEach((value) => {
      labels.push(value.date);
      data.push(value.value);
    });
    console.log(labels);
    console.log(data);

    let ctx = document.getElementById("myChart");
    let myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "bitcoin",
            data: data,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
      },
    });
  },
};
</script>

<style scoped>
</style>