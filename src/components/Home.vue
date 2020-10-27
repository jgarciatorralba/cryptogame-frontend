<template>
  <div>
    <app-header></app-header>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <sidebar v-if="user !== null"></sidebar>
        <div class="col-9">
          <h3 class="text-center">All Cryptocurrencies</h3>
          <p v-if="loading" class="text-center mt-5">
            Loading cryptocoins data...
          </p>
          <div v-else>
            <coins v-bind:coins="coins" v-on:updated="replaceTable()"></coins>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/partials/Header.vue";
import Sidebar from "../components/partials/Sidebar.vue";
import Coins from "../components/partials/Coins.vue";
import { coinsTableUrl } from "../config/config.js";

export default {
  data() {
    return {
      coins: null,
      user: JSON.parse(localStorage.getItem("user")),
      loading: true,
    };
  },
  components: {
    Sidebar,
    AppHeader,
    Coins,
  },
  methods: {
    requestData() {
      this.$http.get(coinsTableUrl).then((response) => {
        this.coins = response;
        this.loading = false;
      });
    },
    replaceTable() {
      this.requestData();
      $("coins").remove();
      let el = $(
        '<coins v-bind:coins="coins" v-on:updated="replaceTable()"></coins>'
      );
      $(".container-fluid").prepend(el);
    },
  },
  mounted() {
    this.requestData();
  },
};
</script>

<style lang="scss" scoped>
</style>
