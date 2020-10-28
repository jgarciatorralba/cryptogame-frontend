<template>
  <div>
    <app-header></app-header>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <sidebar></sidebar>
        <div class="col-9">
          <h3 class="text-center">Leaderboard</h3>
          <p v-if="loading" class="text-center mt-5">Loading raking data...</p>
          <div v-else class="row">
            <p v-if="ranking.error" class="col-12 text-center mt-5">
              {{ ranking.error }}
            </p>
            <div
              v-else
              v-for="player in ranking.data"
              v-bind:key="player.name"
              class="col-8 mx-auto row py-3 border-bottom"
            >
              <img
                v-if="player.avatar"
                class="rounded-circle col-2"
                :src="'http://'+player.avatar"
              />
              <img
                v-else
                class="rounded-circle col-2"
                src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png"
              />
              <div class="col-7">
                <p class="h6">{{ player.name }}</p>
                <small class="d-block"
                  >Total: ${{
                    new Intl.NumberFormat("de-DE").format(player.total)
                  }}
                  USD</small
                >
                <small class="">Most bought: Bitcoin</small>
              </div>
              <p class="col-3 h6 my-auto text-right">
                <b-icon
                  v-if="player.position == 1"
                  icon="trophy-fill"
                  class="mr-1"
                  variant="warning"
                ></b-icon>
                <b-icon
                  v-if="player.position == 2"
                  icon="trophy-fill"
                  class="mr-1"
                  variant="secondary"
                ></b-icon>
                <b-icon
                  v-if="player.position == 3"
                  icon="trophy-fill"
                  class="mr-1"
                  variant="danger"
                ></b-icon>
                Rank {{ player.position }}
              </p>
            </div>
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
import { rankingUrl, getHeader, imgPathUrl } from "../config/config.js";

export default {
  data() {
    return {
      ranking: null,
      loading: true,
      imgPathUrl : imgPathUrl
    };
  },
  components: {
    Sidebar,
    AppHeader,
  },
  methods: {
    requestData() {
      this.$http
        .get(rankingUrl, {
          headers: getHeader(),
        })
        .then((response) => {
          this.ranking = response.data;
          this.loading = false;
        });
    },
  },
  mounted() {
    this.requestData();
  },
};
</script>