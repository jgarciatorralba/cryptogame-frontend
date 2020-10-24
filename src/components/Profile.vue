<template>
    <div>
        <app-header></app-header>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <form class="col-10">
                    <h3 class="mb-5 col-12 text-center">User Profile</h3>
                    <div class="row justify-content-center">
                        <div class="col-2 text-right">
                            <label for="avatar">
                                <img src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png" class="avatar align-self-end rounded-circle">
                                <input name="avatar" id="avatar" type="file" accept="image/jpeg" class="d-none">
                            </label>
                        </div>
                        <div class="col-3">
                            <p class="h4">Username</p>
                            <div class="row">
                                <div class="col-4">
                                <small class="text-muted d-block">Ranking:</small>
                                <small class="text-muted d-block">Wallet:</small>
                                </div>
                                <div class="col-6">
                                <small class="text-muted d-block">Last balance:</small>
                                <small class="text-muted d-block">Most bought:</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center mt-4">
                        <div class="col-2">
                            <label class="d-block">Name</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row justify-content-center mt-4">
                        <div class="col-2">
                            <label class="d-block">Email</label>
                            <input type="text" class="form-control">
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-2 mt-5">
                            <button class="btn-lg btn-primary float-right">Save changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .avatar {
        width: 100px;
    }
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