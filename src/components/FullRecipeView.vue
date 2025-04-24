<template>
  <div v-if="recipe" class="recipe-container">
    <div class="recipe-header mt-3 mb-4">
      <h1 class="title">{{ recipe.title }}</h1>
      <img :src="recipeImage" class="center" />
    </div>
    <div class="recipe-body">
      <div class="wrapper">
        <div class="wrapped">
          <div class="mb-3">
            <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
            <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            <div>Servings: {{ recipe.servings }}</div>
            <div class="icons">
              <img v-if="recipe.vegetarian" src="@/assets/vegetarian.jpg" alt="Vegetarian" class="icon" v-b-tooltip.hover="'Vegetarian'" />
              <img v-if="recipe.vegan" src="@/assets/vegan.jpg" alt="Vegan" class="icon" v-b-tooltip.hover="'Vegan'" />
              <img v-if="recipe.glutenFree" src="@/assets/glutenfree.jpg" alt="Gluten Free" class="icon" v-b-tooltip.hover="'Gluten Free'" />
            </div>
          </div>
          Ingredients:
          <ul>
            <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.id">
              {{ r.original }}
            </li>
          </ul>
        </div>
        <div class="wrapped">
          Instructions:
          <ol>
            <li v-for="(s, index) in recipe.analyzedInstructions[0]?.steps || []" :key="index">
              {{ s.step }}
            </li>
          </ol>
        </div>
      </div>
      <div class="summary">
        <p v-html="recipe.summary"></p>
      </div>
    </div>
    <div class="status">
      <div class="icon-container">
        <img :src="favoriteIcon" alt="Favorite" class="favorite-icon" @click="toggleFavorite" @mouseover="favoriteHover = true" @mouseleave="favoriteHover = false" v-b-tooltip.hover="'Add to Favorite'" />
      </div>
      <div class="icon-container">
        <img :src="addIcon" alt="Add to Meal Planning" class="add-icon" @click="toggleMealPlanning" @mouseover="addHover = true" @mouseleave="addHover = false" v-b-tooltip.hover="'Add to Meal Planning'" />
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { getRecipeById, markRecipeAsWatched } from "@/services/recipes";
import { addFavorite, removeFavorite } from "@/services/user";

export default {
  data() {
    return {
      recipe: null,
      favoriteHover: false,
      addHover: false,
      isPlanned: false
    };
  },
  async created() {
    const recipeId = this.$route.params.id;
    try {
      const response = await getRecipeById(recipeId);
      this.recipe = response;
      await markRecipeAsWatched(recipeId);
      console.log("Recipe:", this.recipe);
    } catch (error) {
      console.error("Failed to fetch recipe or mark as watched:", error);
    }
  },
  computed: {
    recipeImage() {
      return this.recipe.image && this.recipe.image.match(/\.(jpeg|jpg|gif|png)$/) ? this.recipe.image : require('@/assets/defult_recipe_image.jpg');
    },
    favoriteIcon() {
      if (this.favoriteHover || (this.recipe && this.recipe.favorited)) {
        return require('@/assets/heart_filled.png');
      } else {
        return require('@/assets/heart_empty.png');
      }
    },
    addIcon() {
      if (this.addHover || this.isPlanned) {
        return require('@/assets/add_black.png');
      } else {
        return require('@/assets/add_white.png');
      }
    }
  },
  methods: {
    async toggleFavorite() {
      if (!this.$root.store.username) {
        alert('Please log in to add favorites');
        return;
      }
      
      try {
        if (this.recipe.favorited) {
          await removeFavorite(this.recipe.id);
          this.recipe.favorited = false;
        } else {
          await addFavorite(this.recipe.id);
          this.recipe.favorited = true;
        }
      } catch (error) {
        console.error("Failed to toggle favorite:", error);
        alert('Failed to update favorite status.');
      }
    },
    toggleMealPlanning() {
      this.isPlanned = !this.isPlanned;
      if (this.isPlanned) {
        this.$emit('add-to-meal-planning', this.recipe);
      } else {
        this.$emit('remove-from-meal-planning', this.recipe);
      }
    }
  }
};
</script>

<style scoped>
.recipe-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
}
  
.title {
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 20px;
}
  
.recipe-body {
  font-size: 1.2em;
}
  
.wrapper {
  display: flex;
}
  
.wrapped {
  width: 50%;
}
  
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}
  
.icons {
  margin-bottom: 10px;
}
  
.icon {
  width: 40px;
  height: 40px;
  margin: 0 5px;
  cursor: pointer;
}
  
.favorite-icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
  
.favorite-icon:hover {
  opacity: 0.7;
}
  
.add-icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
  margin-left: 10px;
}
  
.add-icon:hover {
  opacity: 0.7;
}
  
.status {
  margin-top: 20px;
  text-align: center;
}
  
.icon-container {
  display: inline-block;
  position: relative;
}
  
.tooltip {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
}
</style>
