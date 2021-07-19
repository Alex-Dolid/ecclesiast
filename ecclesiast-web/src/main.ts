// Core
import { createApp } from "vue"
// Store
import store, { key } from "./store"
// App
import App from "./App.vue"
// Styles
import "./styles/index.scss";

const app = createApp(App);

// configuring...
app.use(store, key);

app.mount("#app");
