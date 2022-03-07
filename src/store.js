import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: null,
        role: null,
        id: null,
        cart: null,
        list_cart: [],
        searchName: null,
    },
    getters: {
        user: (state) => {
            return state.user || localStorage.getItem('user');
        },
        role: (state) => {
            return state.role || localStorage.getItem('role');
        },
        id: (state) => {
            return state.id || localStorage.getItem('id');
        },
        cart: (state) => {
            return state.cart || localStorage.getItem('cart');
        },
        list_cart: (state) => {
            return state.list_cart;
        },
        searchName: (state) => {
            return state.searchName;
        },
    },
    actions: {
        user(context, user) {
            context.commit('user', user);
        },
        role(context, role) {
            context.commit('role', role);
        },
        id(context, id) {
            context.commit('id', id);
        },
        cart(context, cart) {
            context.commit('cart', cart);
        },
        list_cart(context, list_cart) {
            context.commit('list_cart', list_cart);
        },
        searchName(context, searchName) {
            context.commit('searchName', searchName);
        },
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
        role(state, role) {
            state.role = role;
        },
        id(state, id) {
            state.id = id;
        },
        cart(state, cart) {
            state.cart = cart;
        },
        list_cart(state, list_cart) {
            state.list_cart = list_cart;
        },
        searchName(state, searchName) {
            state.searchName = searchName;
        },
    }
});
