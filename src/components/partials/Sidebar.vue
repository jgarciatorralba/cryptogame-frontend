<template>
	<div v-if="loaded" class="col-2 sidebar">
		<div class="d-flex justify-content-center">
			<img v-if="user.avatar" class="img-thumbnail mb-3" :src="user.avatar">
			<img v-else class="img-thumbnail mb-3" src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png"/>
		</div>
		<div>
			<ul>
				<li class="badge badge-secondary p-2">
					<b-icon icon="person-fill"></b-icon>
					{{ user.name }}
				</li>
				<li class="border rounded mb-2">
					<div class="rounded-top badge-primary p-1 mb-1">
						<b-icon icon="wallet2" class="ml-2"></b-icon>
						<small class="badge">Wallet</small>
					</div>
					<div class="d-block ml-3">${{ new Intl.NumberFormat("de-DE").format(user.estimated) }}</div>
				</li>
				<li class="border rounded mb-2">
					<div class="rounded-top badge-primary p-1 mb-1">
						<b-icon icon="cash-stack" class="ml-2"></b-icon>
						<small class="badge">Balance</small>
					</div>
					<div class="d-block ml-3">${{ new Intl.NumberFormat("de-DE").format(user.balance) }}</div>
				</li>
				<li class="border rounded mb-2">
					<div class="rounded-top badge-primary p-1 mb-1">
						<b-icon icon="bookmark-star" class="ml-2"></b-icon>
						<small class="badge">Most bought</small>
					</div>
					<div class="d-block ml-3">{{ user.mostBought }}</div>
				</li>
				<li class="border rounded mb-2">
					<div class="rounded-top badge-primary p-1 mb-1">
						<b-icon icon="trophy" class="ml-2"></b-icon>
						<small class="badge">Ranking</small>
					</div>
					<div class="d-block ml-3">#{{ user.ranking }}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.sidebar{
		border-radius: 6px;
		ul {
			padding: 0;
            list-style-type: none;
        }
		li {
			margin: 0px 10px;
            display: block;
		}
	}
</style>

<script>
import { userUpdateUrl, getHeader } from '../../config/config';

export default {
	data () {
		return {
			user: null,
			loaded: null
		}
	},
	methods: {
		requestData() {
			this.$http.get(userUpdateUrl, { headers: getHeader() }).then((response) => {
				this.user = response.data.data;
				this.user.mostBought = 'Bitcoin';
				this.loaded = true
			});
		}
    },
	mounted() {
		this.requestData();
	}
}
</script>