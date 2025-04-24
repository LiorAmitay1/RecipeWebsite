<template>
  <div class="background">
    <div class="search-page">
      <div class="search-container">
        <h1 class="title">Search Recipes</h1>
        <div class="search-bar">
          <input v-model="query" placeholder="Search for recipes..." />
        </div>
        <div class="filters">
          <select v-model="resultsLimit">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <select v-model="selectedCuisine">
            <option value="">All Cuisines</option>
            <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
          </select>
          <select v-model="selectedDiet">
            <option value="">All Diets</option>
            <option v-for="diet in diets" :key="diet" :value="diet">{{ diet }}</option>
          </select>
          <select v-model="selectedIntolerance">
            <option value="">All Intolerances</option>
            <option v-for="intolerance in intolerances" :key="intolerance" :value="intolerance">{{ intolerance }}</option>
          </select>
        </div>
        <button class="search-button" @click="searchRecipes">Search</button>
      </div>
      <div class="results-container">
        <h1 class="title">Search Results</h1>
        <div class="results">
          <p v-if="recipes.length === 0">No results found.</p>
          <RecipePreviewList v-else :recipes="recipes" :amountToShow="resultsLimit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from '@/components/RecipePreviewList.vue';
import { searchRecipes, fetchRandomRecipesFromServer } from '../services/recipes';

export default {
  name: 'RecipeSearchPage',
  components: {
    RecipePreviewList
  },
  data() {
    return {
      query: '',
      resultsLimit: 5,  // Set default value for the number of results
      selectedCuisine: '',
      selectedDiet: '',
      selectedIntolerance: '',
      recipes: [],
      cuisines: ['Italian', 'Chinese', 'American', 'Mexican'],
      diets: ['Vegetarian', 'Vegan', 'Gluten Free', 'Ketogenic'],
      intolerances: ['Dairy', 'Egg', 'Gluten', 'Peanut']
    };
  },
  methods: {
    async searchRecipes() {
      try {
        const response = await searchRecipes(
          this.query,
          this.selectedCuisine,
          this.selectedDiet,
          this.selectedIntolerance,
          parseInt(this.resultsLimit)
        );
        console.log('Recipes found:', response);
        this.recipes = response;
      } catch (error) {
        console.error('Failed to search recipes:', error);
        alert('Failed to search recipes. Please try again.');
      }
    },
    async fetchRandomRecipes() {
      try {
        const response = await fetchRandomRecipesFromServer();
        console.log('Random recipes:', response.data.recipes);
        this.recipes = response.data.recipes;
      } catch (error) {
        console.error('Failed to fetch random recipes:', error);
      }
    }
  },
  created() {
    this.fetchRandomRecipes();
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box; /* Ensure consistent box-sizing */
}

.search-page {
  width: 100%;
  max-width: 1200px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #981a51; /* Title color */
}

.search-container, .results-container {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 30px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar input {
  margin-right: 10px;
  padding: 10px;
  font-size: 18px;
  width: 100%; /* Ensure input takes full width */
  max-width: 550px; /* Limit maximum width */
  min-width: 400px;
  border: 2px solid #685555; /* Border color */
  border-radius: 10px; /* Rounded corners */
  background-color: #f5f5f5; /* Background color */
  color: #685555; /* Text color */
  transition: background-color 0.3s, border-color 0.3s, color 0.3s; /* Smooth transition */
}

.search-bar input:hover {
  background-color: #553d3d; /* Hover background color */
  border-color: #685555; /* Hover border color */
  color: #dbcbb3; /* Hover text color */
}

.search-bar select {
  margin-right: 10px;
  padding: 10px;
  font-size: 18px;
  border: 2px solid #685555; /* Border color */
  border-radius: 10px; /* Rounded corners */
  background-color: #f5f5f5; /* Background color */
  color: #685555; /* Text color */
  transition: background-color 0.3s, border-color 0.3s, color 0.3s; /* Smooth transition */
}

.search-bar select:hover {
  background-color: #a89e9e; /* Hover background color */
  border-color: #685555; /* Hover border color */
  color: #ffffff; /* Hover text color */
}

.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filters select {
  margin-right: 10px;
  padding: 10px;
  font-size: 18px;
  border: 2px solid #685555; /* Border color */
  border-radius: 10px; /* Rounded corners */
  background-color: #f5f5f5; /* Background color */
  color: #685555; /* Text color */
  transition: background-color 0.3s, border-color 0.3s, color 0.3s; /* Smooth transition */
}

.filters select:hover {
  background-color: #553d3d; /* Hover background color */
  border-color: #685555; /* Hover border color */
  color: #dbcbb3; /* Hover text color */
}

.search-button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  font-size: 20px;
  background-color: #dbcbb3;
  border: 3px solid #6c4e3c;
  color: #6c4e3c;
  border-radius: 10px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #553d3d;
  color: #dbcbb3;
}

.results {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
