import Vue from 'vue';
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Character from "../views/Character.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    }, {
        path: "/character/:characterId",
        name: "Character",
        component: Character,
    },
    { path: '/*', redirect: "/" },
];

const router = new VueRouter({
    mode: 'history',
    routes,
    linkExactActiveClass: "nav-item active"
});

export default router;