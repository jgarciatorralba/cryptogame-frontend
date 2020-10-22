<template>
    <div>
        <app-header></app-header>
        <div class="container">
            <div class="row">
                <sidebar></sidebar>
                <div class="col-10">
                    <h3 class="text-center">All Cryptocurrencies</h3>
                    <table class="coins-table mx-auto">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Symbol</th>
                                <th>Price</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Bitcoin</td>
                                <td>BTC</td>
                                <td>$12.911,95</td>
                                <td>+5.04%</td>
                                <td>+14.2%</td>
                                <td>$239,167,147,880</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Bitcoin</td>
                                <td>BTC</td>
                                <td>$12.911,95</td>
                                <td>+5.04%</td>
                                <td>+14.2%</td>
                                <td>$239,167,147,880</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Bitcoin</td>
                                <td>BTC</td>
                                <td>$12.911,95</td>
                                <td>+5.04%</td>
                                <td>+14.2%</td>
                                <td>$239,167,147,880</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Bitcoin</td>
                                <td>BTC</td>
                                <td>$12.911,95</td>
                                <td>+5.04%</td>
                                <td>+14.2%</td>
                                <td>$239,167,147,880</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Bitcoin</td>
                                <td>BTC</td>
                                <td>$12.911,95</td>
                                <td>+5.04%</td>
                                <td>+14.2%</td>
                                <td>$239,167,147,880</td>
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
            border-bottom: 1px solid #dddddd;
        }
        tbody tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }
        tbody tr:last-of-type {
            border-bottom: 2px solid rgb(33, 150, 243);
        }
        th, td {
            padding: 12px 15px;
        }
    }
</style>

<script>
import AppHeader from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";

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
        requestData() {}
    },
    mounted() {
        this.requestData();
    }
};
</script>