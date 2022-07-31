import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// * Font Awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch(); // This will kick of the initial replacement of i to svg tags and configure a MutationObserver

library.add(fas, fab, far);

import setupInterceptors from "./services/setupInterceptors";
setupInterceptors(store);

import Notifications from "@kyvg/vue3-notification";
import velocity from "velocity-animate";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .use(Notifications, { velocity })
  .mount("#app");
