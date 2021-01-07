import Vue from "vue";
import Router from "vue-router";
import Form from "../components/Form.vue";
import SuccessView from "../components/SuccessView.vue";
Vue.use(Router);

const RouterVue = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      name: "default",
      path: "/",
      redirect: "/form",
    },
    {
      path: "/form",
      name: "form",
      component: Form,
      props: (route) => ({ id: route.params.id || "default" }),
    },
    {
      path: "/success",
      name: "success",
      component: SuccessView,
      props: true,
    },
  ],
});

export default RouterVue;
