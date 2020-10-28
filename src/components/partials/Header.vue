<template>
  <div class="container-fluid headernav mb-5">
    <nav class="row justify-content-around">
      <div class="col-2 my-auto">
        <a>
          <b-icon icon="bar-chart-line"></b-icon>
          <span>Cryptogame</span>
        </a>
      </div>
      <div class="col-3 my-auto">
        <ul class="my-auto">
          <li class="header-link">
            <router-link :to="'/'">Home</router-link>
            <b-icon icon="house-fill"></b-icon>
          </li>
          <li class="header-link" v-if="user">
            <router-link :to="'/ranking'">Leaderboard</router-link>
            <b-icon icon="card-list"></b-icon>
          </li>
        </ul>
      </div>
      <div class="col-5">
        <ul class="my-auto text-right" v-if="user">
          <li class="header-link" v-if="user.role == 1">
            <router-link :to="'/admin'">Admin</router-link>
          </li>
          <li class="header-link">
            <router-link :to="'/profile'">Profile</router-link>
          </li>
          <li class="header-link" v-if="user">
            <router-link :to="'/transactions'">Transactions</router-link>
          </li>
          <li class="header-link" v-if="user">
            <router-link :to="'/wallet'">Wallet</router-link>
          </li>
          <li v-if="user">
            <button @click="logout" class="btn btn-danger">Logout</button>
          </li>
        </ul>
        <ul class="my-auto float-right" v-else>
          <li>
            <router-link :to="'/login'" class="btn btn-primary"
              >Login</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.headernav {
  font-family: "Trebuchet MS", roboto, ubuntu, sans-serif;
  background-color: rgb(30, 34, 45);
  color: rgb(255, 255, 255);
  padding-top: 1em;
  padding-bottom: 1em;
  .row {
    justify-content: space-around;
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
  .header-link:hover {
    cursor: pointer;
    transform: translateX(5px) scale(1.02);
    transition: ease-in-out 200ms;
  }
  a {
    color: inherit;
  }
  .header-link a:hover {
    color: rgb(33, 150, 243);
    text-decoration: none;
  }
}
</style>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      if (this.$route.path == "/") {
        this.$router.go();
      } else {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>