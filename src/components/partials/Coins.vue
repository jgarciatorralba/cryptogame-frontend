<template>
  <div>
    <table class="coins-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Change (24h)</th>
          <th>High (24h)</th>
          <th>Low (24h)</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        <router-link
          v-for="(coin, index) in coins.data"
          v-bind:key="coin.id"
          tag="tr"
          :to="'details/' + coin.name.toLowerCase().replace(/ /g, '-')"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="coin.image" class="coin-icon" />
            <span>{{ coin.name }}</span>
          </td>
          <td>{{ coin.symbol }}</td>
          <td>${{ new Intl.NumberFormat("de-DE").format(coin.price) }} USD</td>
          <td v-if="coin.change >= 0" class="text-success">
            <b-icon icon="caret-up-fill"></b-icon>
            {{ coin.change.toFixed(1) }}%
          </td>
          <td v-else class="text-danger">
            <b-icon icon="caret-down-fill"></b-icon>
            {{ coin.change.toFixed(1) }}%
          </td>
          <td>{{ new Intl.NumberFormat("de-DE").format(coin.high) }} US$</td>
          <td>{{ new Intl.NumberFormat("de-DE").format(coin.low) }} US$</td>
          <td>{{ new Intl.NumberFormat("de-DE").format(coin.volume) }} US$</td>
        </router-link>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["coins"],
  methods: {
    timeout() {
      setInterval(this.emit, 1000);
    },
    emit() {
      this.$emit("updated");
    },
  },
  mounted() {
    this.timeout();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/coins.scss";
</style>