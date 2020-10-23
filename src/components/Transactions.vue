<template>
    <div>
        <app-header></app-header>
        <div class="container-fluid">
            <div class="row">
                <sidebar></sidebar>
                <div class="col-8 text-center">
                        <h3 class="mb-4">Transactions</h3>
                    <div class="col-8 mx-auto">
                        <div class="bg-danger rounded-lg text-light px-5 py-2 mb-1"><span class="font-weight-bold">Someone</span> bought $321,00 in <span class="font-weight-bold">Bitcoins</span> - 44 mins ago</div>
                        <div class="bg-success rounded-lg text-light px-5 py-2 mb-1"><span class="font-weight-bold">Someone</span> sold $121,00 in <span class="font-weight-bold">Bitcoins</span> - 51 mins ago</div>
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