<template>
    <div>
        <app-header></app-header>
        <div class="container">
            <div class="row">
                <sidebar></sidebar>
                <div class="col-10">
                    <h3 class="text-center">Ranking</h3>
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