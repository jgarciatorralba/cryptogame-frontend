<template>
  <div class="container">
    <h1 class="text-center my-3">Test</h1>
    <div class="chart-cont border p-3">
      <div class="chart">Hola</div>
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
  },
};
</script>

<style scoped>
</style>