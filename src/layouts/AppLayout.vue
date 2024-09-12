<template>
  <div class="container">
    <Header style="position: fixed; width: 100%; z-index: 10000" />
    <router-view style="padding: 110px 0 0 0" />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "AppLayout",
  components: { Header },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1440px) {
  router-view {
    padding: 90px 0 0 0;
  }
}
</style>
