<template>
  <div>
    <app-header></app-header>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-9">
          <h3 class="text-center">List of coins</h3>
          <p v-if="loading" class="text-center mt-5">
            Loading cryptocoins data...
          </p>
          <div v-else class="coins-cont">
            <p
              v-if="coins.error"
              class="bg-danger rounded text-light mt-4 text-center"
            >
              {{ coins.error }}
            </p>
            <coins-admin
              v-else
              v-bind:coins="coins.data"
              v-on:updated="refreshTable()"
            ></coins-admin>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "./partials/Header.vue";
import CoinsAdmin from "./partials/CoinsAdmin.vue";
import { coinsTableUrl } from "../config/config.js";

export default {
  data() {
    return {
      coins: null,
      loading: true,
      error: null,
      success: null,
    };
  },
  components: {
    AppHeader,
    CoinsAdmin,
  },
  methods: {
    requestData() {
      this.$http.get(coinsTableUrl).then((response) => {
        this.coins = response;
        this.loading = false;
      });
    },
    refreshTable() {
      this.requestData();
      $("coins-admin").remove();
      let el = $(
        '<coins-admin v-else v-bind:coins="coins.data" v-on:updated="refreshTable()"></coins-admin>'
      );
      $(".coins-cont").append(el);
    },
  },
  mounted() {
    this.requestData();
  },
};
</script>

<style lang="scss" scoped>
</style>