<template>
    <div>
        <app-header></app-header>
        <div class="container-fluid">
            <div class="row">
                <h3 class="mb-5 mx-auto">User Profile</h3>
                <form class="col-10 offset-2">
                        <div class="row">
                            <div class="col-3 text-right">
                                <label for="avatar">
                                    <img src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png" class="col-6 rounded-circle">
                                    <input name="avatar" id="avatar" type="file" accept="image/jpeg" class="d-none">
                                </label>
                            </div>
                            <div class="col-6 my-auto">
                                <p class="h4">Username</p>
                                <small class="text-muted d-block">Wallet:</small>
                                <small class="text-muted">Ranking:</small>
                            </div>
                            <div class="col-9 offset-3 mt-4">
                                <label class="d-block">Name</label>
                                <input type="text">
                            </div>
                            <div class="col-9 offset-3 mt-4">
                                <label class="d-block">Email</label>
                                <input type="text">
                            </div>
                            <div class="col-3 offset-3">
                                <button class="btn-lg btn-primary mt-5">Save changes</button>
                            </div>
                        </div>
                </form>
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