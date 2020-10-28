<template>
  <div>
    <app-header></app-header>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <sidebar v-if="user !== null"></sidebar>
        <div class="col-9">
          <errors
            v-bind:error="error"
            v-bind:success="success"
            v-on:dismissed="resetMsg()"
          >
          </errors>
          <h3 class="text-center">All Cryptocurrencies</h3>
          <p v-if="loading" class="text-center mt-5">
            Loading cryptocoins data...
          </p>
          <div v-else>
            <p
              v-if="coins.error"
              class="bg-danger rounded text-light mt-4 text-center"
            >
              {{ coins.error }}
            </p>
            <coins
              v-else
              v-bind:coins="coins.data"
              v-on:updated="replaceTable()"
            ></coins>
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
import Errors from "./partials/Errors.vue";

export default {
  data() {
    return {
      coins: null,
      user: JSON.parse(localStorage.getItem("user")),
      loading: true,
      error: null,
      success: null,
    };
  },
  components: {
    Sidebar,
    AppHeader,
    Coins,
    Errors,
  },
  methods: {
    requestData() {
      this.$http.get(coinsTableUrl + 1 + "&" + 20).then((response) => {
        this.coins = response;
        this.loading = false;
      });
    },
    replaceTable() {
      this.requestData();
      // $("coins").remove();
      // let el = $(
      //   '<coins v-bind:coins="coins" v-on:updated="replaceTable()"></coins>'
      // );
      // $(".container-fluid").prepend(el);
    },
    resetMsg() {
      this.success = null;
      this.error = null;
    },
  },
  mounted() {
    this.requestData();

    if (this.$route.params.error == undefined) {
      this.error = null;
    } else {
      this.error = this.$route.params.error;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
