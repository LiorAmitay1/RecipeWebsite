<template>
  <div class="background">
    <div class="container">
      <FullRecipeView v-if="recipe" :recipe="recipe" />
    </div>
  </div>
</template>

<script>
import FullRecipeView from "@/components/FullRecipeView.vue";
import { getRecipeById, markRecipeAsWatched } from "../services/recipes.js";

export default {
  name: 'RecipeViewPage',
  components: {
    FullRecipeView
  },
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      const recipeId = this.$route.params.id;
      const response = await getRecipeById(recipeId);

      const { analyzedInstructions, instructions, extendedIngredients, aggregateLikes, readyInMinutes, image, title, vegetarian, vegan, glutenFree, servings } = response;

      const _instructions = analyzedInstructions
        .map(fstep => {
          fstep.steps[0].step = fstep.name + fstep.steps[0].step;
          return fstep.steps;
        })
        .reduce((a, b) => [...a, ...b], []);

      this.recipe = {
        instructions,
        _instructions,
        analyzedInstructions,
        extendedIngredients,
        aggregateLikes,
        readyInMinutes,
        image,
        title,
        vegetarian,
        vegan,
        glutenFree,
        servings
      };

      await markRecipeAsWatched(recipeId); // סימון המתכון כנצפה
    } catch (error) {
      console.log(error);
      this.$router.replace("/NotFound");
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1500px;
  margin: auto;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: #685555;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left; /* Ensure the container text is left-aligned */
}
</style>
