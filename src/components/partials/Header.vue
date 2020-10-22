<template>
    <div class="container-fluid headernav mb-5">
        <nav class="row">
            <div class="col-1 my-auto">
                <a>
                    <b-icon icon="bar-chart-line"></b-icon>
                    LOGO
                </a>
            </div>
            <div class="col-3 my-auto">
                <ul class="my-auto">
                    <li>
                        <router-link :to="'/'">Home</router-link>
                        <b-icon icon="house-fill"></b-icon>
                    </li>
                    <li>
                        <a><router-link :to="'/ranking'">Ranking</router-link></a>
                        <b-icon icon="card-list"></b-icon>
                    </li>
                </ul>
            </div>
            <div class="col-4 my-auto">
                <form>
                    <input type="text">
                    <button class="btn btn-warning" type="submit">Search</button>
                </form>
            </div>
            <div class="col-1">
                <ul class="my-auto d-flex flex-row" v-if="logged">
                    <li class="my-auto">
                        <a class=""><router-link :to="'/profile'">Profile</router-link></a>
                    </li>
                    <li class="my-auto">
                        <a><router-link :to="'/transactions'">Transactions</router-link></a>
                    </li>
                    <li class="my-auto">
                        <a><router-link :to="'/wallet'">Wallet</router-link></a>
                    </li>
                    <li>
                        <a class="btn btn-danger"><router-link :to="'/logout'">Logout</router-link></a>
                    </li>
                </ul>
                <ul class="my-auto" v-else>
                    <li class="my-auto">
                        <a class="btn btn-primary"><router-link :to="'/login'">Login</router-link></a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
    .headernav{
        font-family: "Trebuchet MS", roboto, ubuntu, sans-serif;
        background-color: rgb(30, 34, 45);
        color: rgb(255, 255, 255);
        padding: .6em 0;
        .row {
            justify-content: center;
        }
        svg {
            color: rgb(33, 150, 243);
        }
        ul {
            list-style-type: none;
        }
        li {
            padding: 0;
            margin: 0 10px;
            display: inline-block;
        }
        li:hover {
            cursor: pointer;
            transform: translateX(5px) scale(1.02);
            transition: ease-in-out 200ms;
        }
        a{
            color: inherit;
        }
        a:hover {
            color: rgb(33, 150, 243);
            text-decoration: none;
        }
    }
</style>

<script>

export default {
    data() {
        return {
            logged: true
        }
    }
};
</script>