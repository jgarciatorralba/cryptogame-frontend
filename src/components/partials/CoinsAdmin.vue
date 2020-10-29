<template>
  <div>
    <errors
      v-bind:error="error"
      v-bind:success="success"
      v-on:dismissed="resetMsg()"
    ></errors>
    <table class="coins-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th class="text-center">Symbol</th>
          <th class="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :data-id="coin.id"
          class="coin-row"
          v-for="(coin, index) in coins.data"
          v-bind:key="coin.id"
          tag="tr"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="coin.image" class="coin-icon" />
            <span>{{ coin.name }}</span>
          </td>
          <td class="text-center">{{ coin.symbol }}</td>
          <td class="text-center">
            <button class="btn btn-primary" v-on:click="deleteCoin(coin)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { coinUrl, getHeader } from "../../config/config.js";
import Errors from "../partials/Errors.vue";

export default {
  data() {
    return {
      success: null,
      error: null,
    };
  },
  props: ["coins"],
  components: {
    Errors,
  },
  methods: {
    deleteCoin(coin) {
      this.$http
        .delete(coinUrl + coin.id, {
          headers: getHeader(),
        })
        .then((response) => {
          if (response.error == null) {
            this.success = response.data.data;
            this.$emit("updated");
          } else {
            this.error = response.data.error;
          }
        });
    },
    resetMsg() {
      this.success = null;
      this.error = null;
    },
  },
  mounted() {
    if (this.$route.params.success == undefined) {
      this.success = null;
    } else {
      this.success = this.$route.params.success;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/coins.scss";
</style>