<template>
    <div>
        <app-header></app-header>
        <div v-if="loaded" class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-10">
                    <h3 class="mb-5 col-12 text-center">User Profile</h3>
                    <div class="row justify-content-center">
                        <div class="col-2 text-right">
                            <label for="avatar">
                                <img v-if="user.avatar" :src="user.avatar" class="avatar align-self-end rounded-circle">
                                <img v-else src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png" class="avatar align-self-end rounded-circle">
                                <input name="avatar" id="avatar" type="file" accept="image/jpeg/png" class="d-none">
                            </label>
                        </div>
                        <div class="col-3">
                            <p class="h4">{{user.name}}</p>
                            <div class="row">
                                <div class="col-5">
                                    <small class="text-muted d-block">Ranking: #{{ user.ranking }}</small>
                                    <small class="text-muted d-block">Wallet: ${{ new Intl.NumberFormat("de-DE").format(user.estimated) }}</small>
                                </div>
                                <div class="col-6">
                                    <small class="text-muted d-block">Balance: ${{ new Intl.NumberFormat("de-DE").format(user.balance) }}</small>
                                    <small class="text-muted d-block">Most bought: {{ user.mostBought }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center mt-4">
                        <div class="col-2">
                            <label class="d-block">Name</label>
                            <input type="text" class="form-control" :value="user.name" name="name">
                        </div>
                    </div>
                    <div class="row justify-content-center mt-4">
                        <div class="col-2">
                            <label class="d-block">Email</label>
                            <input type="text" class="form-control" :value="user.email" name="email">
                        </div>
                    </div>
                    <div class="row justify-content-center mt-4">
                        <div class="col-2">
                            <label class="d-block">Password</label>
                            <input type="password" class="form-control" name="password">
                            <small class="badge badge-danger">Fill it to change your password</small>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-2 mt-5">
                            <button class="btn-lg btn-primary float-right" v-on:click="update">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
        .avatar {
            width: 100px;
            cursor: pointer;
        }
        input {
            width: 300px;
        }
</style>

<script>
import AppHeader from "../components/partials/Header.vue";
import Sidebar from "../components/partials/Sidebar.vue";
import { userUpdateUrl, getHeader } from "../config/config.js";

export default {
    data() {
        return {
            user: null,
            loaded: false
        }
    },
	components: {
		Sidebar, AppHeader
    },
    methods: {
        update() {
            var formData = new FormData();

            let imagefile = document.querySelector('#avatar');
            let name = document.querySelector('input[name="name"]').value;
            let email = document.querySelector('input[name="email"]').value;
            let password = document.querySelector('input[name="password"]').value;

            formData.append("avatar", imagefile.files[0]);
            if(password != "") formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);

            this.$http.patch(userUpdateUrl, formData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                window.location.reload();
            });
        },
        requestData() {
			this.$http.get(userUpdateUrl, { headers: getHeader() }).then((response) => {
				this.user = response.data.data;
                this.user.mostBought = 'Bitcoin';
                this.loaded = true;
			});
		}
    },
    mounted() {
        this.requestData();
    }
};
</script>