<template>
  <div>
    <app-header></app-header>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <sidebar></sidebar>
        <div class="col-9 text-center">
          <h3 class="mb-4">Transactions</h3>
          <p v-if="loading" class="text-center mt-5">
            Loading transactions data...
          </p>
          <div v-else class="col-9 mx-auto">
            <p v-if="transactions.error" class="text-center mt-5">
              {{ transactions.error }}
            </p>
            <div
              v-else
              v-for="transaction in transactions.data.trades"
              v-bind:key="transaction.id"
            >
              <div
                v-if="transaction.type == 'buy'"
                class="transaction transaction-bought"
              >
                <span>{{ transaction.user }}</span>
                bought {{ transaction.quantity }} of
                <span>{{ transaction.coin }}</span> for ${{
                  new Intl.NumberFormat("de-DE").format(transaction.value)
                }}
                - {{ transaction.date | moment("from") }}
              </div>
              <div v-else class="transaction transaction-sold">
                <span>{{ transaction.user }}</span>
                sold {{ transaction.quantity }} of
                <span>{{ transaction.coin }}</span> for ${{
                  new Intl.NumberFormat("de-DE").format(transaction.value)
                }}
                - {{ transaction.date | moment("from") }}
              </div>
            </div>
            <button v-if="page > 1" class="btn btn-light border mt-3" v-on:click="previousPage">&laquo; Back</button>
            <button v-if="!end" class="btn btn-light border mt-3" v-on:click="nextPage">Next &raquo;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.transaction {
  border-radius: 03rem;
  color: #ffffff;
  padding: 0.5rem 3rem;
  margin-bottom: 0.25rem;
  span {
    font-weight: bold;
  }
}
.transaction-bought {
  background-color: #f7554c;
}
.transaction-sold {
  background-color: rgb(71, 196, 71);
}
.transaction:hover {
  transform: scale(1.2);
  box-shadow: 1px 2px gray;
  transition: ease-in-out 180ms;
}
</style>

<script>
import AppHeader from "../components/partials/Header.vue";
import Sidebar from "../components/partials/Sidebar.vue";
import { transactionsUrl, getHeader } from "../config/config.js";

export default {
  data() {
    return {
      transactions: null,
      loading: true,
      page: 1,
      end: false,
      limit: 12
    };
  },
  components: {
    Sidebar,
    AppHeader,
  },
  methods: {
    requestData() {
      this.$http
        .get(transactionsUrl(1, this.limit), {
          headers: getHeader(),
        })
        .then((response) => {
          this.transactions = response.data;
          this.loading = false;
        });
    },
    nextPage() {
      this.page++;
      this.$http
        .get(transactionsUrl(this.page, this.limit), { headers: getHeader() }).then((response) => {
          this.transactions = response.data;
          if(response.data.data.trades.length < this.limit) this.end = true;
        });
    },
    previousPage() {
      this.page--;
      this.$http
        .get(transactionsUrl(this.page, this.limit), { headers: getHeader() }).then((response) => {
          this.transactions = response.data;
          if(this.end == true) this.end = false;
        });
    }
  },
  mounted() {
    this.requestData();
  },
};
</script>