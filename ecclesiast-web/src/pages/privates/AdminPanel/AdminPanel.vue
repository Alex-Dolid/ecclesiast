<template>
  <main class="page-width admin-panel">
    <h1>Admin Panel</h1>
    <nav class="nav">
      <router-link
        v-for="route of routes"
        :key="route.name"
        :to="`/admin/${route.path}`"
        class="nav__link"
        exact-active-class="nav__link_active"
      >
        {{ route.meta.title }}
      </router-link>
    </nav>
    <router-view/>
  </main>
</template>

<script>
// Core
import { defineComponent } from "vue";
// Routes
import routes from "./routes";

export default defineComponent({
  name: "AdminPanel",

  setup() {
    return {
      routes
    }
  }
});
</script>

<style scoped lang="scss">
@import "src/styles/style-guide/variables";

.admin-panel {
  height: 100%;
  text-align: center;
}

.nav {
  font-size: 18px ;
  &__link {
    color: $black;

    &::after {
      content: " | ";
    }

    &:last-child {
      &::after {
        content: none;
      }
    }

    &_active {
      color: $green;
    }
  }
}
</style>
