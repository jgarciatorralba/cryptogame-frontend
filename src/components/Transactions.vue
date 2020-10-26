<template>
    <div>
        <app-header></app-header>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <sidebar></sidebar>
                <div class="col-9 text-center">
                        <h3 class="mb-4">Transactions</h3>
                    <div class="col-8 mx-auto">
                        <div v-for="transaction in transactions" v-bind:key=transaction.id>
                            <div v-if="transaction.type == 'buy'" class="transaction transaction-bought">
                                <span>{{ transaction.user }}</span>
                                bought {{ transaction.quantity }}
                                of <span>{{ transaction.coin }}</span>
                                for ${{ new Intl.NumberFormat("de-DE").format(transaction.value) }}
                                - {{ transaction.date | moment("from") }}
                            </div>
                            <div v-else class="transaction transaction-sold">
                                <span>{{ transaction.user }}</span>
                                sold {{ transaction.quantity }}
                                of <span>{{ transaction.coin }}</span>
                                for ${{ new Intl.NumberFormat("de-DE").format(transaction.value) }}
                                - {{ transaction.date | moment("from") }}
                            </div>
                        </div>
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
        background-color:rgb(71, 196, 71);
    }
    .transaction:hover {
        transform: scale(1.2);
        box-shadow: 1px 2px gray;
        transition: ease-in-out 350ms;
    }
</style>

<script>
import AppHeader from "../components/partials/Header.vue";
import Sidebar from "../components/partials/Sidebar.vue";
import {transactions} from "../components/mock/coinlist.js";

export default {
    data() {
        return {
            transactions: transactions,
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