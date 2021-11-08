import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCN_Vy_tg4hfvSCZOUkNCQumpffnAIgdmw",
  authDomain: "php-expert-718c2.firebaseapp.com",
  projectId: "php-expert-718c2",
  storageBucket: "php-expert-718c2.appspot.com",
  messagingSenderId: "260776262831",
  appId: "1:260776262831:web:795554c7b8a8884e3b285a",
};

initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
