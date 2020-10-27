<template>
    <div>
        <app-header></app-header>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <sidebar></sidebar>
                <div class="col-9 px-5">
                    <h3 class="text-center mb-4">Wallet <b-icon icon="wallet2"></b-icon></h3>
                    <p v-if="loading" class="text-center mt-5">
                        Loading wallet data...
                    </p>
                    <div v-else>
                        <p v-if="wallet.error" class="col-12 py-2 badge badge-danger">{{ wallet.error }}</p>
                        <div v-else>
                            <table class="coins-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Symbol</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="wallet.data.coins.length == 0"><td colspan=5 class="text-center">You don't own any cryptocurrency :(</td></tr>
                                    <tr v-else v-for="(coin,key) in wallet.data.coins" v-bind:key=coin.symbol>
                                        <td>{{ key+1 }}</td>
                                        <td>{{ coin.symbol }}</td>
                                        <td>{{ coin.quantity }}</td>
                                        <td>${{ new Intl.NumberFormat("de-DE").format(coin.price) }}</td>
                                        <td>${{ new Intl.NumberFormat("de-DE").format(coin.value) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="coins-table col-2 float-right">
                                <thead>
                                    <tr>
                                        <th>Sub-total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${{ new Intl.NumberFormat("de-DE").format(wallet.data.value) }}</td>
                                    </tr>
                                </tbody>
                                <thead>
                                    <tr>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${{ new Intl.NumberFormat("de-DE").format(wallet.data.balance) }}</td>
                                    </tr>
                                </tbody>
                                <thead>
                                    <tr>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${{ new Intl.NumberFormat("de-DE").format(wallet.data.total) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .coins-table {
        border-collapse: collapse;
        font-family: sans-serif;
        width: 100%;
        thead tr {
            background-color: rgb(33, 150, 243);
            color: #ffffff;
            text-align: left;
        }
        tbody tr {
            border-bottom: 1px solid #dddddd;
        }
        tbody tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }
        tbody tr:last-of-type {
            border-bottom: 2px solid rgb(33, 150, 243);
        }
        tbody tr:hover {
            cursor: pointer;
            user-select: none;
            background-color: #c2c2c281;
        }
        th, td {
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
            wallet: null,
            loading: true
        }
    },
	components: {
		Sidebar, AppHeader
    },
    methods: {
        requestData() {
            this.$http.get("http://localhost:3000/api/wallet", {
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
                .then((response) => {
                    this.wallet = response.data;
                    this.loading = false;
            });
        }
    },
    mounted() {
        this.requestData();
    }
};
</script>