<template>
  <div class="recipe-preview">
    <div 
      class="recipe-image-container"
      @click="viewRecipe"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <img :src="recipeImage" alt="Recipe Image" class="recipe-image" />
      <div v-if="hover" class="overlay">
        <span>Click to view</span>
      </div>
    </div>
    <div class="recipe-content">
      <h3 class="recipe-title">{{ recipe.title }}</h3>
      <div class="icons">
        <img v-if="recipe.vegetarian" 
             src="@/assets/vegetarian.jpg" 
             alt="Vegetarian" 
             class="icon" 
             v-b-tooltip="'Vegetarian'" />
        <img v-if="recipe.vegan" 
             src="@/assets/vegan.jpg" 
             alt="Vegan" 
             class="icon" 
             v-b-tooltip="'Vegan'" />
        <img v-if="recipe.glutenFree" 
             src="@/assets/glutenfree.jpg" 
             alt="Gluten Free" 
             class="icon" 
             v-b-tooltip="'Gluten Free'" />
      </div>
      <p class="recipe-meta">
        <strong>Preparation time:</strong> {{ recipe.readyInMinutes || 'N/A' }} minutes<br>
        <strong>Likes:</strong> {{ recipe.aggregateLikes  || Math.floor(Math.random() * 300) + 1 }}
      </p>
      <div class="status">
        <img 
          :src="viewedIcon" 
          alt="Viewed" 
          class="viewed-icon" 
          v-b-tooltip="'Viewed'" 
        />
        <img 
          :src="favoriteIcon" 
          alt="Favorite" 
          class="favorite-icon" 
          v-b-tooltip="'Favorite'" 
          @click="toggleFavorite" 
          @mouseover="favoriteHover = true"
          @mouseleave="favoriteHover = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { addFavorite, removeFavorite, isFavorite } from '../services/user.js';
import { isRecipeWatched } from '../services/recipes.js';

export default {
  name: "RecipePreview",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hover: false,
      favoriteHover: false,
      favorited: false,
      viewed: false // Add this line to track the viewed state
    };
  },
  computed: {
    recipeImage() {
      return this.recipe.image && this.recipe.image.match(/\.(jpeg|jpg|gif|png)$/) ? this.recipe.image : require('@/assets/defult_recipe_image.jpg');
    },
    favoriteIcon() {
      if (this.favorited) {
        return require('@/assets/heart_filled.png');
      } else {
        return require('@/assets/heart_empty.png');
      }
    },
    viewedIcon() {
      if (this.viewed) {
        return require('@/assets/seen.png');
      } else {
        return require('@/assets/not_seen.png');
      }
    },
    isLoggedIn() {
      return this.$root.store.username;
    }
  },
  async created() {
    try {
      this.favorited = await isFavorite(this.recipe.id);
      this.viewed = await isRecipeWatched(this.recipe.id);
    } catch (error) {
      console.error("Error checking favorite or viewed status:", error);
    }
  },
  methods: {
    viewRecipe() {
      this.$router.push({ name: 'recipe', params: { id: this.recipe.id } });
    },
    async toggleFavorite() {
      if (!this.isLoggedIn) {
        alert('Please log in to add favorites');
        return;
      }
      
      try {
        if (this.favorited) {
          await removeFavorite(this.recipe.id);
          this.favorited = false;
        } else {
          await addFavorite(this.recipe.id);
          this.favorited = true;
        }
      } catch (err) {
        console.error("Failed to toggle favorite:", err);
        alert("Failed to toggle favorite. Please try again.");
      }
    }
  }
};
</script>
<style scoped>
.recipe-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 20px;
  max-width: 200px;
  max-height: 450px;
  min-height: 450px;
  min-width: 200px;
}

.recipe-image-container {
  position: relative;
  cursor: pointer;
}

.recipe-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0.8;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.recipe-content {
  padding: 10px;
  text-align: center;
}

.recipe-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
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

.recipe-meta {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.status {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* Add space between the icons */
}

.viewed {
  display: block;
  color: green;
  font-size: 14px;
  margin-bottom: 5px;
}

.favorite-icon, .viewed-icon {
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.favorite-icon:hover, .viewed-icon:hover {
  opacity: 0.7;
}
</style>
