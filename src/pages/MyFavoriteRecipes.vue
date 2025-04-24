<template>
  <div class="background">
    <div class="container">
      <h1 class="title">Favorite Recipes</h1>
      <div class="recipes-list">
        <RecipePreview
          v-for="(recipe, index) in favoriteRecipes"
          :key="index"
          :recipe="recipe"
          @toggle-favorite="removeFromFavorites"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from '../components/RecipePreview.vue';
import { getFavoriteRecipes } from '../services/user.js';

export default {
  name: 'FavoriteRecipesPage',
  components: {
    RecipePreview
  },
  data() {
    return {
      favoriteRecipes: []
    };
  },
  created() {
    this.loadFavoriteRecipes();
  },
  methods: {
    async loadFavoriteRecipes() {
      try {
        const response = await getFavoriteRecipes();
        this.favoriteRecipes = response;
      } catch (err) {
        console.error("Failed to load favorite recipes:", err);
      }
    },
    async removeFromFavorites(recipe) {
      try {
        await removeFavorite(recipe.id);
        this.favoriteRecipes = this.favoriteRecipes.filter(r => r.id !== recipe.id);
      } catch (err) {
        console.error("Failed to remove favorite recipe:", err);
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1200px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #981a51;
  font-size: 2.5rem;
}

.recipes-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
}

.recipe-preview {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 300px;
}
</style>
