<template>
  <div>
    <app-header></app-header>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-9">
          <h3 class="text-center">
            List of coins
            <button
              id="btn-addCoin"
              class="btn btn-lg btn-secondary rounded-circle btn-add ml-3"
              data-toggle="modal"
              data-target="#modalNewCoin"
              type="button"
              @click="showModal"
            >
              +
            </button>
          </h3>
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

            <div v-else>
              <errors
                v-bind:error="error"
                v-bind:success="success"
                v-on:dismissed="resetMsg()"
              ></errors>

              <coins-admin
                v-bind:coins="coins.data"
                v-on:updated="requestData()"
              ></coins-admin>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="is_modal_visible"
        class="modal"
        id="modalNewCoin"
        tabindex="-1"
      >
        <div class="modal-dialog shadow">
          <div class="modal-content">
            <div class="modal-header bg-light">
              <h5 class="modal-title">Insert new coin</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="hideModal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form class="form-login" autocomplete="off">
                <input
                  type="text"
                  v-model="symbol"
                  id="symbol"
                  name="symbol"
                  class="form-control my-2 shadow"
                  placeholder="Symbol"
                  required
                  autofocus
                />

                <input
                  type="text"
                  v-model="pair"
                  id="pais"
                  name="pais"
                  class="form-control my-2 shadow"
                  placeholder="Pair"
                  required
                />

                <input
                  type="text"
                  v-model="name"
                  id="name"
                  name="name"
                  class="form-control my-2 shadow"
                  placeholder="Name"
                  required
                />
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="hideModal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="createCoin">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "./partials/Header.vue";
import CoinsAdmin from "./partials/CoinsAdmin.vue";
import Errors from "./partials/Errors.vue";
import { coinsTableUrl, coinUrl, getHeader } from "../config/config.js";

export default {
  data() {
    return {
      coins: null,
      loading: true,
      error: null,
      success: null,
      symbol: null,
      pair: null,
      name: null,
      is_modal_visible: false,
    };
  },
  components: {
    AppHeader,
    CoinsAdmin,
    Errors,
  },
  methods: {
    requestData() {
      this.$http.get(coinsTableUrl + 1 + "&" + 40).then((response) => {
        this.coins = response;
        this.loading = false;
      });
    },
    showModal() {
      this.is_modal_visible = true;
      this.$nextTick(() => {
        $("#modalNewCoin").show();
      });
    },
    hideModal() {
      this.is_modal_visible = false;
      this.$nextTick(() => {
        $("#modalNewCoin").hide();
      });
    },
    createCoin() {
      let symbol = this.symbol;
      let pair = this.pair;
      let name = this.name;

      this.$http({
        method: "post",
        url: coinUrl,
        data: {
          symbol: symbol,
          pair: pair,
          name: name,
        },
        headers: getHeader(),
        validateStatus: function (status) {
          return status >= 200 && status <= 500;
        },
      }).then((response) => {
        if (response.error == null) {
          this.success = response.data.data;
          this.requestData();
        } else {
          this.error = response.data.error;
        }
        this.hideModal();
      });
    },
    resetMsg() {
      this.success = null;
      this.error = null;
    },
  },
  mounted() {
    this.requestData();
  },
};
</script>

<style lang="scss" scoped>
.btn-add {
  width: 50px !important;
  height: 50px !important;
}
</style>