import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast, { POSITION } from "vue-toastification";


// * Font Awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

library.add(fas);

import setupInterceptors from './services/setupInterceptors';
setupInterceptors(store);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    // newestOnTop: true,
    position: POSITION.TOP_LEFT
  })
  .mount("#app");

