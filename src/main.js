import { createApp } from 'vue';
import App from './App.vue';
import './style.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

// Import the package
import VueAwesomePaginate from "vue-awesome-paginate";

// Import the necessary CSS file
import "vue-awesome-paginate/dist/style.css";

// Import local storage plugin
import VueLocalStorage from 'vue-localstorage';

// Import the router
import { router } from './router.js';





createApp(App).use(router).use(VueAwesomePaginate).mount('#app') 
