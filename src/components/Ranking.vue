<template>
    <div>
        <app-header></app-header>
        <div class="container">
            <div class="row">
                <sidebar></sidebar>
                <div class="col-10">
                    <h3 class="text-center">Leaderboard</h3>
                    <div class="row">

                        <div class="col-8 mx-auto row py-3 border-bottom">
                            <img class="rounded-circle col-2" src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png">
                            <div class="col-7">
                                <p class="h6">Username</p>
                                <small class="d-block">Wallet: $25.750</small>
                                <small class="">Most bought: Bitcoin</small>
                            </div>
                            <p class="col-3 h6 my-auto text-right">
                                <b-icon icon="trophy-fill" class="mr-1" variant="warning"></b-icon>
                                Rank 1
                            </p>
                        </div>

                        <div class="col-8 mx-auto row py-3 border-bottom">
                            <img class="rounded-circle col-2" src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png">
                            <div class="col-7">
                                <p class="h6">Username</p>
                                <small class="d-block">Wallet: $25.750</small>
                                <small class="">Most bought: Bitcoin</small>
                            </div>
                            <p class="col-3 h6 my-auto text-right">
                                <b-icon icon="trophy-fill" class="mr-1" variant="secondary"></b-icon>
                                Rank 2
                            </p>
                        </div>

                        <div class="col-8 mx-auto row py-3 border-bottom">
                            <img class="rounded-circle col-2" src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png">
                            <div class="col-7">
                                <p class="h6">Username</p>
                                <small class="d-block">Wallet: $25.750</small>
                                <small class="">Most bought: Bitcoin</small>
                            </div>
                            <p class="col-3 h6 my-auto text-right">
                                <b-icon icon="trophy-fill" class="mr-1" variant="danger"></b-icon>
                                Rank 3
                            </p>
                        </div>

                        <div class="col-8 mx-auto row py-3 border-bottom">
                            <img class="rounded-circle col-2" src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png">
                            <div class="col-7">
                                <p class="h6">Username</p>
                                <small class="d-block">Wallet: $25.750</small>
                                <small class="">Most bought: Bitcoin</small>
                            </div>
                            <p class="col-3 h6 my-auto text-right">
                                Rank 4
                            </p>
                        </div>

                        <div class="col-8 mx-auto row py-3 border-bottom">
                            <img class="rounded-circle col-2" src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png">
                            <div class="col-7">
                                <p class="h6">Username</p>
                                <small class="d-block">Wallet: $25.750</small>
                                <small class="">Most bought: Bitcoin</small>
                            </div>
                            <p class="col-3 h6 my-auto text-right">
                                Rank 5
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