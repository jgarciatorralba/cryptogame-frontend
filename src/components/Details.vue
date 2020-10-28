<template>
  <div class="cont-details">
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <sidebar v-if="user"></sidebar>
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
                    <input type="text" :value="'market value ('+coin.symbol+')'" disabled>
                  </div>
                  <div>
                    <div class="custom-control custom-switch mb-3">
                      <input type="checkbox" class="custom-control-input" id="customSwitch1" v-on:click="buyMode">
                      <label class="custom-control-label" for="customSwitch1"></label>
                      <span>USD / Coin unity</span>
                    </div>
                  </div>
                  <div v-if="!trade.byQnty">
                    <label class="custom-label">Amount:</label>
                    <input type="text" :value=trade.cost disabled><span> USD</span>
                  </div>
                  <div v-else>
                    <label class="custom-label">Amount:</label>
                    <input type="number" :value=trade.cost disabled><span> {{trade.coin.toUpperCase()}} Coins</span>
                  </div>
                  <div>
                    <label class="custom-label">% :</label>
                    <input v-model="trade.amount" type="range" min="0" max="100" step="1" v-on:input="updateCost"><span> {{ trade.amount }}%</span>
                  </div>
                  <button class="btn btn-primary" v-on:click="buy">BUY</button>
                </div>
                <div class="details-transaction d-none" id="sell">
                  <div>
                    <label class="custom-label">Price:</label>
                    <input type="text" :value="'market value ('+coin.symbol+')'" disabled>
                  </div>
                  <div>
                    <label class="custom-label">Amount:</label>
                    <input type="number" :value=trade.cost disabled>
                  </div>
                  <div>
                    <label class="custom-label">% :</label>
                    <input v-model="trade.amount" type="range" class="sell-range" min="0" max="100" step="1">
                  </div>
                  <button class="btn btn-success">SELL</button>
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
import { coinDetailsUrl, buyUrl, sellUrl, walletUrl, coinPriceUrl } from "../config/config.js";

export default {
  props: ["coinId"],
  data() {
    return {
      coin: null,
      error: null,
      success: null,
      user: JSON.parse(localStorage.getItem("user")),
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
        type: 'buy',
        byQnty: false,
        wallet: null,
        price: null
      },
      loading: true,
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
            this.getWallet();
            this.getPrice();
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
    getPrice() {
      this.$http.get(`${coinPriceUrl}/${this.trade.coin}`).then((response) => {
        this.trade.price = response.data.data.price;
      });
    },
    getWallet() {
      this.$http.get(`${walletUrl}/${this.trade.coin}`, {
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}
              }).then((response) => {
        this.trade.wallet = response.data.data.quantity;
      });
    },
    transactionClick() {
      if (!event.target.classList.contains("active")) {
        let operation = event.target.innerText.toLowerCase();
        this.trade.operation = operation;
        document.querySelectorAll(".details-transaction").forEach((div) => {
          div.classList.add("d-none");
        });
        document.querySelector("#" + operation).classList.remove("d-none");
        document.querySelector(".active").classList.remove("active");
        event.target.classList.add("active");
      }
    },
    updateCost() {
      let cost = (this.trade.amount * 0.01) * this.user.walletBalance;
      this.trade.coinsQnty =  cost / this.trade.price;
      if (!this.trade.byQnty) {
        this.trade.cost = new Intl.NumberFormat("de-DE").format(cost);
      } else {
        this.trade.cost = this.trade.coinsQnty
      }
    },
    buyMode() {
      this.trade.byQnty = !this.trade.byQnty;
      this.updateCost();
    },
    buy() {
      if (this.trade.coinsQnty > 0) {
        this.$http("http://localhost:3000/api/buy", {
                    method: 'POST',
                    headers: {
                      'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                      'Content-Type': 'application/json'
                    },
                    data: {symbol: this.trade.coin, quantity: this.trade.coinsQnty }
                  }).then((response) => {
                      console.log(response);
                  });
      }
    },
    sell() {
      
    }
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