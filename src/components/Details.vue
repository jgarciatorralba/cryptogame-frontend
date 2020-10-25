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
              <p class="my-2">{{ error }}</p>
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
                  <span>
                    {{
                      coin.market_data.price_change_percentage_24h.toFixed(2)
                    }}%
                  </span>
                </h2>
              </div>
              <chart v-bind:details="details"></chart>
              <div class="description my-2 px-3">
                <p>
                  <span v-html="coin.description.en"></span>
                </p>
              </div>
              <div class="text-center">
                <button class="btn btn-primary mb-3">Buy now</button>
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

export default {
  props: ["coinId"],
  data() {
    return {
      coin: null,
      error: null,
      details: {
        id: this.coinId,
        currency: "usd",
        days: 1,
      },
      loading: true,
    };
  },
  components: {
    Chart,
    AppHeader,
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