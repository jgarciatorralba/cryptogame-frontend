<template>
  <div class="cont-error" v-if="errors.length > 0">
    <div class="alert alert-danger alert-dismissible fade hide show">
      <strong>Error! </strong>{{ errors[0].message }}
      <button @click="dismissAlert" type="button" class="close">&times;</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["errors"],
  methods: {
    dismissAlert() {
      $(".cont-error").fadeOut(400);
    },
  },
  updated() {
    $(".cont-error").fadeIn(400);
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/errors.scss";
</style>