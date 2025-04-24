<template>
    <div class="meal-planning-page">
      <h1 class="title">Meal Planning</h1>
      <div v-if="plannedRecipes.length === 0">
        <p>No recipes planned yet.</p>
      </div>
      <div v-else>
        <div v-for="(recipe, index) in plannedRecipes" :key="index">
          <FullRecipeView :recipe="recipe" @remove-from-meal-planning="removeFromMealPlanning" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import FullRecipeView from "@/components/FullRecipeView.vue";
  
  export default {
    name: 'MealPlanningPage',
    components: {
      FullRecipeView
    },
    data() {
      return {
        plannedRecipes: []
      };
    },
    mounted() {
      const storedRecipes = localStorage.getItem('plannedRecipes');
      if (storedRecipes) {
        this.plannedRecipes = JSON.parse(storedRecipes);
      }
    },
    methods: {
      removeFromMealPlanning(recipe) {
        this.plannedRecipes = this.plannedRecipes.filter(r => r.id !== recipe.id);
        localStorage.setItem('plannedRecipes', JSON.stringify(this.plannedRecipes));
      }
    }
  };
  </script>
  
  <style scoped>
  .title {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
    color: #981a51;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .meal-planning-page {
    max-width: 1500px;
    margin: auto;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: #685555;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
  }
  </style>
  