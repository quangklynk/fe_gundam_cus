import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
// ---Error
import Error from "./components/Error/404.vue";

// ---ErrorBuy
import ErrorBuy from "./components/Status/Error.vue";

// ---Success
import Success from "./components/Status/Success.vue";

// ---Login Page
import LogPage from "./components/Log/Index.vue";
import Login from "./components/Log/Login.vue";
import Register from "./components/Log/Register.vue";
import Forgot from "./components/Log/Forgot.vue";
import Reset from "./components/Log/Reset.vue";

// ---Home Page
import Home from "./components/Home/Index.vue";
import Main from "./components/Home/Main.vue";

// ---Search Page
import Search from "./components/Search/Index.vue";
import SearchCategory from "./components/Search/Index.vue";
import SearchName from "./components/Search/Index.vue";


// ---Product Page
import Product from "./components/Product/Index.vue";

// ---Blog
import Blog from "./components/Blog/Index.vue";

// ---Cart Page
import Cart from "./components/Cart/Index.vue";

// ---Checkout
import Order from "./components/Order/Index.vue";

// ---Contact
import Contact from "./components/Contact/Index.vue";

// ---User Page
import User from "./components/User/Index.vue";
import UserInfo from "./components/User/InfoUser.vue";
import UserChange from "./components/User/ChangePass.vue";
import UserOrder from "./components/User/OrderUser.vue";

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login', component: LogPage, children: [
                { path: '/', component: Login },
                { path: '/register', component: Register },
                { path: '/forgot', component: Forgot },
                { path: '/reset', component: Reset },

            ]
        },
        {
            path: '/', component: Home, children: [
                { path: '/', component: Main },
                { path: '/product/:id', component: Product },
                { path: '/contact', component: Contact },
                { path: '/blog', component: Blog },
                // { path: '/search/category/:id', component: Search },
                {
                    path: '/search/price', component: Search, children: [
                        { path: '/search/category/:id', component: SearchCategory },
                        { path: '/search/name/:name', component: SearchName },
                    ]
                },
                { path: '/cart', component: Cart },
                { path: '/order', component: Order },
            ]
        },
        {
            path: '/user', component: User, children: [
                { path: '/', component: UserInfo },
                { path: '/user/changepass', component: UserChange },
                { path: '/user/order', component: UserOrder },
            ]
        },
        { path: '/404', name: 'errorpage', component: Error },//token, user
        { path: '/success', name: 'successpage', component: Success },//token, user
        { path: '/error', name: 'errorbuy', component: ErrorBuy },//token, user
        { path: '*', redirect: '/404' }
    ]

})

export default router