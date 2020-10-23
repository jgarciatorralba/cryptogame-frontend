<template>
	<div class="col-2 offset-1 sidebar">
		<div>
			<img class="img-thumbnail mb-3" src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png"/>
		</div>
		<div>
			<ul>
				<li>
					<b-icon icon="person-fill"></b-icon>
					Username
				</li>
				<li>
					<b-icon icon="wallet2"></b-icon>
					Wallet:
				</li>
				<li>
					<b-icon icon="percent"></b-icon>
					Last balance:
				</li>
				<li>
					<b-icon icon="bookmark-star"></b-icon>
					Most bought:
				</li>
				<li>
					<b-icon icon="trophy"></b-icon>
					Ranking:
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.sidebar{
		border-radius: 6px;
		box-shadow: 0 0 0 1px #e0e3eb;
		padding: 20px 10px;
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