<template>
    <div>
        <app-header></app-header>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <sidebar></sidebar>
                <div class="col-9 px-5">
                    <h3 class="text-center mb-4">Wallet <b-icon icon="wallet2"></b-icon></h3>
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
                            <tr v-for="(coin,key) in wallet.data.coins" v-bind:key=coin.symbol>
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
import {wallet} from "../components/mock/coinlist.js";

export default {
    data() {
        return {
            wallet: wallet,
            logged: true
        }
    },
	components: {
		Sidebar, AppHeader
    },
    methods: {
        requestData() {}
    },
    mounted() {
        this.requestData();
    }
};
</script>