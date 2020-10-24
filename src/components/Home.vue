<template>
    <div>
        <app-header></app-header>
        <div class="container-fluid">
            <div class="row">
                <sidebar></sidebar>
                <div class="col-8">
                    <h3 class="text-center">All Cryptocurrencies</h3>
                    <table class="coins-table mx-auto">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>Price</th>
                                <th>24h (Price)</th>
                                <th>24h (Market)</th>
                                <th>Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="coin in coins" v-bind:key="coin.id">
                                <td>{{coin.market_cap_rank}}</td>
                                <td>
                                    <img :src=coin.image class="coin-icon">
                                    {{ coin.id }}
                                </td>
                                <td>{{ coin.symbol }}</td>
                                <td>${{ coin.current_price }} USD</td>
                                <td v-if="coin.price_change_percentage_24h >= 0" class="text-success">
                                    <b-icon icon="caret-up-fill"></b-icon>
                                    {{ coin.price_change_percentage_24h.toFixed(1) }}%
                                </td>
                                <td v-else class="text-danger">
                                    <b-icon icon="caret-down-fill"></b-icon>
                                    {{ coin.price_change_percentage_24h.toFixed(1) }}%
                                </td>
                                <td v-if="coin.market_cap_change_percentage_24h == null" class="text-muted">
                                    N.A.
                                </td>
                                <td v-else-if="coin.market_cap_change_percentage_24h >= 0" class="text-success">
                                    <b-icon icon="caret-up-fill"></b-icon>
                                    {{ coin.market_cap_change_percentage_24h.toFixed(1) }}%
                                </td>
                                <td v-else class="text-danger">
                                    <b-icon icon="caret-down-fill"></b-icon>
                                    {{ coin.market_cap_change_percentage_24h.toFixed(1) }}%
                                </td>
                                <td>{{ new Intl.NumberFormat("de-DE").format(coin.market_cap) }} US$</td>
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
        margin: 25px 0;
        font-size: 0.9em;
        font-family: sans-serif;
        width: 90%;
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
import {coinsList} from "../components/mock/coinlist.js";

export default {
    data() {
        return {
            coins: null,
            logged: true
        }
    },
	components: {
		Sidebar, AppHeader
    },
    methods: {
        requestData() {
            this.coins = coinsList;
        }
    },
    mounted() {
        this.requestData();
    }
};
</script>
