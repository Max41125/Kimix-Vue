<template>
  <component :is="layout"> </component>
</template>
<script>
import AppLayout from "@/layouts/AppLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
export default {
  name: "App",
  components: { AppLayout, AuthLayout },
  computed: {
    layout() {
      return "AppLayout";
    },
  },
};
</script>
<style></style>
