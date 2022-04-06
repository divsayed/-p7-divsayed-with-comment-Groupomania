<template>
  <Header v-if="this.$route.path != '/'" />
  <router-view/>
</template>

<script src="./script.js"></script>
<style src="./style.css"></style>
