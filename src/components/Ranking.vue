<template>
    <div>
        <app-header></app-header>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <sidebar></sidebar>
                <div class="col-9">
                    <h3 class="text-center">Leaderboard</h3>
                    <div class="row">
                        <div v-for="(player,key) in ranking.data" v-bind:key="player.name" class="col-8 mx-auto row py-3 border-bottom">
                            <img class="rounded-circle col-2" src="player.avatar">
                            <div class="col-7">
                                <p class="h6">{{ player.name }}</p>
                                <small class="d-block">Balance: ${{ new Intl.NumberFormat("de-DE").format(player.balance) }} USD</small>
                                <small class="">Most bought: Bitcoin</small>
                            </div>
                            <p class="col-3 h6 my-auto text-right">
                                <b-icon v-if="key == 0" icon="trophy-fill" class="mr-1" variant="warning"></b-icon>
                                <b-icon v-if="key == 1" icon="trophy-fill" class="mr-1" variant="secondary"></b-icon>
                                <b-icon v-if="key == 2" icon="trophy-fill" class="mr-1" variant="danger"></b-icon>
                                Rank {{ key+1 }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>

<script>
import AppHeader from "../components/partials/Header.vue";
import Sidebar from "../components/partials/Sidebar.vue";
import {ranking} from "../components/mock/coinlist.js";

export default {
    data() {
        return {
            ranking: ranking,
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