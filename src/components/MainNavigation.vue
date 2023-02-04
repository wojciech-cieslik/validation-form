<template>
  <div class="main-navigation">
    <div class="navigation-bar">
      <div v-for="link in links" :key="link.name">
        <RouterLink
          class="navigation-element"
          :to="{ name: 'contact-form', params: { id: link.id } }"
          >{{ link.name }}</RouterLink
        >
      </div>
    </div>
    <RouterView :key="$route.path" />
  </div>
</template>

<script>
import { RouterView, RouterLink } from "vue-router";

export default {
  name: "MainNavigation",
  data() {
    return {
      links: [
        { name: "Primary Form", id: "primary" },
        { name: "Secondary Form", id: "secondary" },
        { name: "Contact Form", id: "contact" },
      ],
    };
  },
  components: {
    RouterView,
    RouterLink,
  },
};
</script>

<style scoped>
.main-navigation {
  width: 100vw;
  background-color: #bbb;
  min-height: 100vh;
}

.navigation-bar {
  display: flex;
  justify-content: center;
}

.navigation-element {
  display: block;
  width: 200px;
  height: 40px;
  background-color: #6c757d;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  margin: 20px;
}

.navigation-element:hover {
  text-decoration: none;
  color: #fff;
  background-color: #5a6268;
}

.router-link-active,
.router-link-active:hover {
  background-color: green;
}
</style>
