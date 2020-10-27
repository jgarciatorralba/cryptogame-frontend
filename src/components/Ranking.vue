<template>
    <div>
        <app-header></app-header>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <sidebar></sidebar>
                <div class="col-9">
                    <h3 class="text-center">Leaderboard</h3>
                    <p v-if="loading" class="text-center mt-5">
                        Loading raking data...
                    </p>
                    <div v-else class="row">
                        <p v-if="ranking.error" class="col-12 text-center mt-5">
                            {{ ranking.error }}
                        </p>
                        <div v-else v-for="player in ranking.data" v-bind:key="player.name" class="col-8 mx-auto row py-3 border-bottom">
                            <img class="rounded-circle col-2" src="player.avatar">
                            <div class="col-7">
                                <p class="h6">{{ player.name }}</p>
                                <small class="d-block">Total: ${{ new Intl.NumberFormat("de-DE").format(player.total) }} USD</small>
                                <small class="">Most bought: Bitcoin</small>
                            </div>
                            <p class="col-3 h6 my-auto text-right">
                                <b-icon v-if="player.position == 1" icon="trophy-fill" class="mr-1" variant="warning"></b-icon>
                                <b-icon v-if="player.position == 2" icon="trophy-fill" class="mr-1" variant="secondary"></b-icon>
                                <b-icon v-if="player.position == 3" icon="trophy-fill" class="mr-1" variant="danger"></b-icon>
                                Rank {{ player.position }}
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

export default {
    data() {
        return {
            ranking: null,
            loading: true
        }
    },
	components: {
		Sidebar, AppHeader
    },
    methods: {
        requestData() {
            this.$http.get("http://localhost:3000/api/ranking", {
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}})
                .then((response) => {
                    this.ranking = response.data;
                    this.loading = false;
            });
        }
    },
    mounted() {
        this.requestData();
    }
};
</script>