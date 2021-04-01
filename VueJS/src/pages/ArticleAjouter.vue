<template>
  <div>
    <form id="signup-form" @submit.prevent="processForm">
      <input type="text" class="input" name="name" v-model="name" />
      <input type="number" class="input" name="qt" v-model="name" />
      <input type="number" class="input" name="prix" v-model="name" />
      <button type="submit" class="button is-danger">Submit</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "ArticleAjouter",
  methods: {
    processForm: function () {
      console.log({ name: this.name, quantite: this.qt, prix: this.prix });
      axios.post("http://localhost:3002/add");
      alert("Article ajouté !");
    },
  },
};
</script>