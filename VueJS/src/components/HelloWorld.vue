<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>
      <a href="/#/Articles" target="_blank" rel="noopener">Les articles</a>
    </h3>
    <br />
    <h3>
      <a href="/#/ArticleAjouter" target="_blank" rel="noopener"
        >Ajouter un article</a
      >
    </h3>
    <br />
    <h3>
      <a href="/#/CreerCompte" target="_blank" rel="noopener"
        >Créer un compte</a
      >
    </h3>
    <br />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
