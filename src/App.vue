<template>
  <div id="app">
    <div id="nav" class="d-flex justify-content-between align-items-center nav-custom">
      <b-nav pills class="flex-grow-1 nav-links">
        <b-nav-item :to="{ name: 'main' }">Vue Recipes</b-nav-item>
        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        
        <template v-if="!$root.store.username">
          <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
          <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
        </template>
        <template v-else>
          <b-nav-item @click="showNewRecipeModal">Add new recipe</b-nav-item>
          <b-nav-item-dropdown text="Personal Area" right>
            <b-dropdown-item :to="{ name: 'favorites' }">My favorite recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'myRecipes' }">My recipes</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'familyRecipes' }">My family recipes</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'mealPlanning' }" class="position-relative" v-b-tooltip.hover title="Meal Planning">
            <img src="@/assets/chef.png" alt="Meal Planning" class="chef-icon">
            <span class="badge badge-pill custom-badge">{{ mealCount }}</span>
          </b-nav-item>
        </template>
      </b-nav>
      <div class="nav-user d-flex align-items-center">
        <template v-if="!$root.store.username">
          <span>Hello Guest!</span>
        </template>
        <template v-else>
          <b-nav-item @click="Logout" class="nav-link logout-button">Logout</b-nav-item>
          <span class="separator"></span>
          <span>{{ $root.store.username }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="White" class="bi bi-person user-icon" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
          </svg>
        </template>
      </div>
    </div>
    <router-view @add-to-meal-planning="addToMealPlanning" @remove-from-meal-planning="removeFromMealPlanning" />
    <NewRecipe v-if="isModalVisible" @close="hideNewRecipeModal"/>
  </div>
</template>

<script>
import NewRecipe from './components/NewRecipe.vue';

export default {
  name: "App",
  components: {
    NewRecipe
  },
  data() {
    return {
      isModalVisible: false,
      mealCount: 0,
      plannedRecipes: []
    };
  },
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    showNewRecipeModal() {
      this.isModalVisible = true;
    },
    hideNewRecipeModal() {
      this.isModalVisible = false;
    },
    addToMealPlanning(recipe) {
      if (!this.plannedRecipes.some(r => r.id === recipe.id)) {
        this.plannedRecipes.push(recipe);
        this.mealCount = this.plannedRecipes.length;
        localStorage.setItem('plannedRecipes', JSON.stringify(this.plannedRecipes));
      }
    },
    removeFromMealPlanning(recipe) {
      this.plannedRecipes = this.plannedRecipes.filter(r => r.id !== recipe.id);
      this.mealCount = this.plannedRecipes.length;
      localStorage.setItem('plannedRecipes', JSON.stringify(this.plannedRecipes));
    }
  },
  created() {
    const plannedMeals = JSON.parse(localStorage.getItem('plannedRecipes')) || [];
    this.plannedRecipes = plannedMeals;
    this.mealCount = plannedMeals.length;
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #6c4e3c;
  min-height: 100vh;
  padding-top: 100px;
}

#nav {
  padding: 20px;
  background-color: rgb(85, 73, 48);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

#nav a, 
#nav .nav-user span, 
#nav .nav-links .nav-link {
  font-weight: bold;
  color: #f3eada;
}

#nav a.router-link-exact-active {
  color: #f3eada;
}

.nav-custom {
  background-color: rgb(85, 73, 48);
}

.nav-links .nav-link {
  color: #f3ebda !important;
}

.nav-user span {
  color: #13bde3;
}

.nav-custom .dropdown-menu {
  background-color: rgb(85, 73, 48);
  border: 3px solid #f3ebda;
}

.nav-custom .dropdown-item {
  color: #f3eada;
}

.nav-custom .dropdown-item:hover {
  background-color: rgb(158, 122, 75);
}

.nav-links .nav-link:hover {
  background-color: #f8dec0ce;
  color: #000000 !important;
}

.logout-button {
  color: #f3eada !important;
  cursor: pointer;
  margin-right: -35px;
}

.separator {
  border-left: 1px solid #f3eada;
  height: 30px;
  margin: 0 20px;
  display: inline-block;
  vertical-align: middle;
}

.user-icon {
  margin-left: 10px;
}

.badge {
  font-size: 12px;
  position: absolute;
  top: 0;
  right: -10px;
}

.custom-badge {
  background-color: #f8dec0ce;
  color: #000000;
  border: 2px solid #ffffff;
}

.chef-icon {
  width: 35px;
  height: 35px;
  margin-right: 1px;
}
</style>
