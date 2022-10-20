import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// * Font Awesome icons
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";
/* add icons to the library */
library.add(fas);
/* import specific icons */
import { fab } from "@fortawesome/free-brands-svg-icons";
/* add icons to the library */
library.add(fab);
/* import specific icons */
import { far } from "@fortawesome/free-regular-svg-icons";
/* add icons to the library */
library.add(far);

import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch(); // This will kick of the initial replacement of i to svg tags and configure a MutationObserver

library.add(fas, fab, far);

import setupInterceptors from "./services/setupInterceptors";
setupInterceptors(store);

import Notifications from "@kyvg/vue3-notification";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .use(Notifications)
  .mount("#app");
