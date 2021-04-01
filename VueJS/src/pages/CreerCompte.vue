<template>
  <div>
    <form id="signup-form" @submit.prevent="processForm">
      <input type="email" class="input" name="mail" v-model="email" />
      <input type="password" class="input" name="password" v-model="password" />
      <button type="submit" class="button is-danger">Submit</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "CreerCompte",
  methods: {
    processForm: function () {
      console.log({ mail: this.email, password: this.password });
      axios.post("http://localhost:3002/create");
      alert("Compte créé !");
    },
  },
};
</script>