<template>
  <div class="cont-details">
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <div class="col-lg-2"></div>
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
              <div class="coin-transaction">
                <div>
                  <span class="tag tag-buy active" v-on:click="transactionClick">BUY</span>
                  <span class="tag tag-sell" v-on:click="transactionClick">SELL</span>
                </div>
                <div class="details-transaction" id="buy">
                  <div>
                    <label>Price:</label>
                    <input type="text" :value="'market value ('+coin.symbol+')'" disabled>
                  </div>
                  <div>
                    <label>Amount:</label>
                    <input type="number" :value=trade.amount disabled>
                  </div>
                  <div>
                    <label>% :</label>
                    <input v-model="trade.amount" type="range" min="0" max="100" step="1">
                  </div>
                  <button class="btn btn-primary">BUY</button>
                </div>
                <div class="details-transaction d-none" id="sell">
                  <div>
                    <label>Price:</label>
                    <input type="text" :value="'market value ('+coin.symbol+')'" disabled>
                  </div>
                  <div>
                    <label>Amount:</label>
                    <input type="number" :value=trade.amount disabled>
                  </div>
                  <div>
                    <label>% :</label>
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

export default {
  props: ["coinId"],
  data() {
    return {
      coin: null,
      error: null,
      success: null,
      details: {
        id: this.coinId,
        currency: "usd",
        days: 1,
      },
      trade: {
        coin: null,
        amount: null,
        type: 'buy'
      },
      loading: true,
    };
  },
  components: {
    Chart,
    AppHeader,
    Errors,
  },
  methods: {
    getCoinData() {
      fetch(
        `https://api.coingecko.com/api/v3/coins/${this.coinId}?localization=false`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error == undefined) {
            this.coin = data;
            this.trade.coin = data.symbol;
            console.log(data);
          } else {
            this.error = data.error;
          }
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.error = e;
          this.loading = false;
        });
    },
    transactionClick() {
      if(!event.target.classList.contains('active')) {
        let operation = event.target.innerText.toLowerCase();
        document.querySelectorAll(".details-transaction").forEach((div) => {
          div.classList.add('d-none');
        });
        document.querySelector("#"+operation).classList.remove('d-none');
        document.querySelector('.active').classList.remove('active')
        event.target.classList.add('active')
      }
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