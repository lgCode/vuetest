<template>
  <div class="home">
    <div>paramsname:{{ paramsname }}</div>
    <div>queryname:{{ queryname }}</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  created() {
    // this.userId = this.$route.query.userId;
    this.paramsname = this.$route.params.paramsname;
    this.queryname = this.$route.query.queryname;
  }
};
</script>
