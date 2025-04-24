<template>
  <div class="background">
    <div class="container">
      <div class="left-side-container">
        <div class="left-side">
          <h2 class="container-title">Random Recipes</h2>
          <RecipePreviewList :recipes="randomRecipes" :amount-to-show="numRandomRecipes" />
          <div class="button-container">
            <button @click="fetchRandomRecipes" class="form-button-custom">Get New Recipes</button>
          </div>
        </div>
      </div>
      <div class="right-side-container">
        <div class="right-side">
          <template v-if="!$root.store.username">
            <LoginForm @login-success="onLoginSuccess" />
          </template>

          <template v-else>
            <div class="user-section">
              <h2 class="container-title">Last Viewed Recipes</h2>
              <div v-if="lastViewedRecipes.length === 0" class="no-recipes-message">
                <p>You haven't viewed any recipes yet.</p>
              </div>
              <div v-else>
                <RecipePreviewList :recipes="lastViewedRecipes" :amount-to-show="numLastViewedRecipes" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLastViewedRecipes, fetchRandomRecipesFromServer } from "@/services/recipes";
import RecipePreviewList from "@/components/RecipePreviewList.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  components: {
    RecipePreviewList,
    LoginForm
  },
  data() {
    return {
      recipeListTitle: 'My Recipe List',
      lastViewedRecipes: [],
      randomRecipes: [],
      numRandomRecipes: 3,
      numLastViewedRecipes: 5
    };
  },
  methods: {
    async fetchLastViewedRecipes() {
      if (this.$root.store.username) {
        try {
          const response = await getLastViewedRecipes(this.numLastViewedRecipes);
          console.log('Last viewed recipes fetched:', response);
          this.lastViewedRecipes = response;
        } catch (error) {
          console.error('Error fetching last viewed recipes:', error);
        }
      }
    },
    async fetchRandomRecipes() {
      try {
        const response = await fetchRandomRecipesFromServer();
        console.log('Random recipes fetched:', response.data.recipes);
        this.randomRecipes = response.data.recipes;
      } catch (error) {
        console.error('Error fetching random recipes:', error);
      }
    },
    onLoginSuccess() {
      this.fetchLastViewedRecipes();
    }
  },
  mounted() {
    this.fetchLastViewedRecipes();
    this.fetchRandomRecipes(); // Load initial random recipes
  }
}
</script>

<style scoped>
@import "@/scss/form-style.scss";

.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1700px;
  gap: 20px; /* Added gap for better spacing */
  flex-wrap: nowrap; /* Ensure no wrapping */
}
.left-side-container, .right-side-container {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1 1 auto; /* Flexible width with a base of 48% */
  max-width: 60%;
}
.left-side, .right-side {
  padding: 20px;
}
.container-title {
  font-size: 2.0rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #981a51; /* Adjust the color to match your theme */
}
.guest-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.login, .register {
  display: inline-block;
  padding: 20px 40px; /* Increased padding for bigger buttons */
  background-color: #c8a65d;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 20px;
  font-size: 20px; /* Increased font size */
  text-align: center;
}
.form-button-custom {
  font-size: 1.55rem;
  padding: 10px 20px;
  border-radius: 11px;
  background-color: #dbcbb3;
  border: 3px solid #6c4e3c;
  color: #6c4e3c;
  cursor: pointer; /* Adds pointer cursor on hover */
  transition: background-color 0.3s, color 0.3s; /* Smooth transition for hover effect */
}

.form-button-custom:hover {
  background-color: #6c4e3c;
  color: #dbcbb3;
}

.button-container {
  display: flex;
  justify-content: center; /* Centers the button horizontally */
  margin-top: 20px; /* Adjust as needed for vertical spacing */
}

.no-recipes-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 1.5rem;
  color: #981a51; /* Adjust the color to match your theme */
}
</style>
