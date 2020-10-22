<template>
    <div>
        <app-header></app-header>
        <div class="container">
            <div class="row">
                <sidebar></sidebar>
                <div class="col-10">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
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

<script>
import AppHeader from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
    data() {
        return {
            coins: null
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