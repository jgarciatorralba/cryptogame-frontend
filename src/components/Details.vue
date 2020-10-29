<template>
  <div class="cont-details">
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <sidebar v-if="user" :key="sidebarKey"></sidebar>
        <div v-else class="col-lg-2"></div>
        <div class="col-lg-8">
          <div v-if="loading">
            <p class="my-2">Loading coin information...</p>
          </div>
          <div v-else>
            <div v-if="coin == null">
              <errors v-bind:error="error" v-bind:success="success"></errors>
            </div>
            <div v-else>
              <div class="coin-details">
                <h2 class="my-2">
                  <img :src="coin.image.large" alt="Coin logo" />
                  {{ coin.id }}
                  <span>
                    ${{
                      coin.market_data.current_price.usd.toLocaleString("en-US")
                    }}
                  </span>
                  <span
                    v-if="coin.market_data.price_change_percentage_24h > 0"
                    class="gain"
                  >
                    +{{
                      coin.market_data.price_change_percentage_24h.toFixed(2)
                    }}%
                  </span>
                  <span v-else class="loss">
                    {{
                      coin.market_data.price_change_percentage_24h.toFixed(2)
                    }}%
                  </span>
                </h2>
              </div>

              <chart v-bind:details="details"></chart>

              <div v-if="!user" class="details-transaction">
                <div class="coin-transaction mb-5">
                  <div>
                    <span class="tag tag-buy active">BUY</span>
                    <span class="tag tag-sell">SELL</span>
                  </div>
                  <div class="details-transaction">
                    <p>You must log in to BUY or SELL some cryptocurrency.</p>
                  </div>
                </div>
              </div>
              <div v-else class="coin-transaction mb-5">
                <div>
                  <span class="tag tag-buy active" v-on:click="transactionClick"
                    >BUY</span
                  >
                  <span class="tag tag-sell" v-on:click="transactionClick"
                    >SELL</span
                  >
                </div>
                <div class="details-transaction" id="buy">
                  <div>
                    <label class="custom-label">Price:</label>
                    <input
                      type="text"
                      :value="'market value (' + coin.symbol + ')'"
                      disabled
                    />
                  </div>
                  <div>
                    <div class="custom-control custom-switch mb-3">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customSwitch1"
                        v-on:click="buyMode"
                      />
                      <label
                        class="custom-control-label"
                        for="customSwitch1"
                      ></label>
                      <span>USD / Coin unity</span>
                    </div>
                  </div>
                  <div v-if="!trade.byQnty">
                    <label class="custom-label">Amount:</label>
                    <input type="text" :value="trade.cost" disabled /><span>
                      USD</span
                    >
                  </div>
                  <div v-else>
                    <label class="custom-label">Amount:</label>
                    <input type="number" :value="trade.cost" disabled /><span>
                      {{ trade.coin.toUpperCase() }} Coins</span
                    >
                  </div>
                  <div>
                    <label class="custom-label">% :</label>
                    <input
                      v-model="trade.amount"
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      v-on:input="updateCost"
                    /><span> {{ trade.amount }}%</span>
                  </div>
                  <button class="btn btn-primary" v-on:click="buy">BUY</button>
                </div>
                <div class="details-transaction d-none" id="sell">
                  <div>
                    <label class="custom-label">Price:</label>
                    <input
                      type="text"
                      :value="'market value (' + coin.symbol + ')'"
                      disabled
                    />
                  </div>
                  <div>
                    <label class="custom-label">Amount:</label>
                    <input type="number" :value="trade.cost" disabled /><span>
                      {{ trade.coin.toUpperCase() }} Coins</span
                    >
                  </div>
                  <div>
                    <label class="custom-label">% :</label>
                    <input
                      v-model="trade.amount"
                      type="range"
                      class="sell-range"
                      min="0"
                      max="100"
                      step="1"
                      v-on:input="updateCost"
                    /><span> {{ trade.amount }}%</span>
                  </div>
                  <button class="btn btn-success" v-on:click="sell">
                    SELL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "./partials/Header.vue";
import Chart from "./partials/Chart";
import Errors from "./partials/Errors.vue";
import Sidebar from "../components/partials/Sidebar.vue";
import {
  coinDetailsUrl,
  buyUrl,
  sellUrl,
  walletUrl,
  coinPriceUrl,
  userUpdateUrl,
  getHeader,
} from "../config/config.js";

export default {
  props: ["coinId"],
  data() {
    return {
      coin: null,
      error: null,
      success: null,
      user: null,
      details: {
        id: this.coinId,
        currency: "usd",
        days: 1,
      },
      trade: {
        coin: null,
        amount: 0,
        amountCoins: 0,
        cost: null,
        type: "buy",
        byQnty: false,
        wallet: null,
        price: null,
      },
      loading: true,
      sidebarKey: 0,
    };
  },
  components: {
    Chart,
    AppHeader,
    Errors,
    Sidebar,
  },
  methods: {
    getCoinData() {
      fetch(coinDetailsUrl(this.coinId))
        .then((response) => response.json())
        .then((data) => {
          if (data.error == undefined) {
            this.coin = data;
            this.trade.coin = data.symbol;
            this.getUserData();
          } else {
            this.error = data.error;
          }
          this.loading = false;
        })
        .catch((e) => {
          this.error = e;
          this.loading = false;
        });
    },
    getUserData() {
      if (localStorage.getItem("user") !== null) {
        this.$http
          .get(userUpdateUrl, { headers: getHeader() })
          .then((response) => {
            this.user = response.data.data;
            this.user.mostBought = "Bitcoin";
            this.getWallet();
            this.getPrice();
          });
      }
    },
    getPrice() {
      this.$http.get(`${coinPriceUrl}/${this.trade.coin}`).then((response) => {
        this.trade.price = response.data.data.price;
      });
    },
    getWallet() {
      this.$http
        .get(`${walletUrl}/${this.trade.coin}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((response) => {
          this.trade.wallet = response.data.data.quantity;
        });
    },
    transactionClick() {
      if (!event.target.classList.contains("active")) {
        let operation = event.target.innerText.toLowerCase();
        this.trade.type = operation;
        this.updateCost();
        document.querySelectorAll(".details-transaction").forEach((div) => {
          div.classList.add("d-none");
        });
        document.querySelector("#" + operation).classList.remove("d-none");
        document.querySelector(".active").classList.remove("active");
        event.target.classList.add("active");
      }
    },
    updateCost() {
      if (this.trade.type == "buy") {
        let cost = this.trade.amount * 0.01 * this.user.balance;
        this.trade.coinsQnty = cost / this.trade.price;
        if (!this.trade.byQnty) {
          this.trade.cost = new Intl.NumberFormat("de-DE").format(cost);
        } else {
          this.trade.cost = this.trade.coinsQnty;
        }
      } else {
        this.trade.coinsQnty = this.trade.amount * 0.01 * this.trade.wallet;
        this.trade.cost = this.trade.coinsQnty;
      }
    },
    buyMode() {
      this.trade.byQnty = !this.trade.byQnty;
      this.updateCost();
    },
    buy() {
      if (this.trade.coinsQnty > 0) {
        this.hideTradeForm();
        this.$http(buyUrl, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
          data: { symbol: this.trade.coin, quantity: this.trade.coinsQnty },
        })
          .then((response) => {
            this.showTradeResponse(response);
          })
          .catch((error) => {
            this.showTradeResponse(error.response);
          });
      }
    },
    sell() {
      if (this.trade.coinsQnty > 0) {
        this.hideTradeForm();
        this.$http(sellUrl, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
          data: { symbol: this.trade.coin, quantity: this.trade.coinsQnty },
        }).then((response) => {
          this.showTradeResponse(response);
        });
      }
    },
    hideTradeForm() {
      let transactionDiv = document.querySelector(".coin-transaction");
      let messageDiv = document.querySelector("#message");
      transactionDiv.addEventListener("transitionend", function (e) {
        e.target.innerText = "Processing request...";
      });
    },
    showTradeResponse(res) {
      let transactionDiv = document.querySelector(".coin-transaction");
      transactionDiv.addEventListener("transitionend", () => {
        if (res.data.error) {
          transactionDiv.innerHTML =
            "<div class='bg-danger text-light p-2 text-center rounded'><span>" +
            res.data.error +
            "</span><div>";
        } else {
          transactionDiv.innerHTML =
            "<div class='bg-success text-light p-2 text-center rounded'><span>" +
            res.data.data +
            "</span><div>";
        }
        transactionDiv.classList.add("fadein");
      });
      transactionDiv.classList.add("fadeout");
      this.sidebarKey += 1;
    },
  },
  mounted() {
    this.getCoinData();
    setInterval(this.getCoinData, 5 * 60 * 1000);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/details.scss";
</style>