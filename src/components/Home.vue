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
          <table v-else class="coins-table mx-auto">
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
                :to="'details/' + coin.name.toLowerCase()"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  <img :src="coin.image" class="coin-icon" />
                  {{ coin.name }}
                </td>
                <td>{{ coin.symbol }}</td>
                <td>
                  ${{ new Intl.NumberFormat("de-DE").format(coin.price) }} USD
                </td>
                <td v-if="coin.change >= 0" class="text-success">
                  <b-icon icon="caret-up-fill"></b-icon>
                  {{ coin.change.toFixed(1) }}%
                </td>
                <td v-else class="text-danger">
                  <b-icon icon="caret-down-fill"></b-icon>
                  {{ coin.change.toFixed(1) }}%
                </td>
                <td>
                  {{ new Intl.NumberFormat("de-DE").format(coin.high) }} US$
                </td>
                <td>
                  {{ new Intl.NumberFormat("de-DE").format(coin.low) }} US$
                </td>
                <td>
                  {{ new Intl.NumberFormat("de-DE").format(coin.volume) }} US$
                </td>
              </router-link>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.coins-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 100%;
  thead tr {
    background-color: rgb(33, 150, 243);
    color: #ffffff;
    text-align: left;
  }
  tbody tr {
    cursor: pointer;
    border-bottom: 1px solid #dddddd;
  }
  tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }
  tbody tr:last-of-type {
    border-bottom: 2px solid rgb(33, 150, 243);
  }
  tbody tr:hover {
    user-select: none;
    background-color: #c2c2c281;
  }
  th,
  td {
    padding: 12px 15px;
  }
  .coin-icon {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
}
</style>

<script>
import AppHeader from "../components/partials/Header.vue";
import Sidebar from "../components/partials/Sidebar.vue";

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
  },
  methods: {
    requestData() {
      this.$http.get("http://localhost:3000/api/coins").then((response) => {
        this.coins = response;
        this.loading = false;
      });
    },
	components: {
		Sidebar, AppHeader
    },
    methods: {
        requestData() {
            this.$http.get('http://localhost:3000/api/coins')
                .then(response => {
                    this.coins = response
                    this.loading = false;
                });
        }
    },
    mounted() {
        this.requestData();
    }
  }
}
</script>
