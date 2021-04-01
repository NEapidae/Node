import Home from "../pages/Home";
import Articles from "../pages/Articles";
import ArticleAjouter from "../pages/ArticleAjouter";
import CreerCompte from "../pages/CreerCompte";

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/Articles", component: Articles, name: "Articles" },
  {
    path: "/ArticleAjouter",
    component: ArticleAjouter,
    name: "ArticleAjouter"
  },
  {
    path: "/CreerCompte",
    component: CreerCompte,
    name: "CreerCompte"
  }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

export default router;
