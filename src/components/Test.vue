<template>
  <div class="container">
    <h1 class="text-center my-3">Test</h1>
    <div class="chart-cont border p-3">
      <div class="chart">Loading data...</div>
      <p>{{ test }}</p>
    </div>
    <button @click="getData" class="btn btn-primary my-3">
      Generate chart
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: "hola",
      values: [],
    };
  },
  methods: {
    getData() {
      let now = new Date();
      console.log(now);

      // fetch('http://example.com/movies.json')
      //   .then(response => response.json())
      //   .then(data => console.log(data));
    },
    refreshPageData() {
      // console.log("Hola!");
      this.test = "hola updated";
    },
  },
  mounted() {
    //TODO ajax request first page load

    // Set Interval to refresh data every 5 min
    setInterval(this.refreshPageData, 5000);
  },
};
</script>

<style scoped>
</style>