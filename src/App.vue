<template>
	<div>
		<app-header></app-header>
		<router-view></router-view>
	</div>
</template>

<script>
import AppHeader from "./components/partials/Header.vue";
export default {
	components: {
		AppHeader
	}
};
</script>

