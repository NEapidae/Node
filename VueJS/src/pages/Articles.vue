<template>
  <div>
    <div v-if="isLoading">Chargement en cours ...</div>
    <img v-else :src="ArticlesUrl" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Articles",
  data() {
    return {
      ArticlesUrl: "",
      isLoading: true,
    };
  },
  mounted() {
    axios.get("http://localhost:3002/getliste").then((response) => {
      this.ArticlesUrl = response.data[0].url;
      this.isLoading = false;
    });
  },
};
</script>