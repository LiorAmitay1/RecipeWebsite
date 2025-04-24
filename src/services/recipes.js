// src/services/recipes.js


import axios from 'axios';

// const API_URL = 'http://localhost:80';
const API_URL = 'https://liors-recipes.cs.bgu.ac.il';

export async function fetchRandomRecipesFromServer() {
  try {
    const response = await axios.get(`${API_URL}/recipes/recipe/random`, {
      params: { number: 3 },
      withCredentials: true
    });
    return { data: { recipes: response.data } };
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return { data: { recipes: [] } };
  }
}


export async function getRecipeById(recipeId) {
  try {
    const response = await axios.get(`${API_URL}/recipes/${recipeId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    throw error;
  }
}

export async function searchRecipes(query, cuisine, diet, intolerance, number) {
  try {
    const response = await axios.get(`${API_URL}/recipes/search`, {
      params: {
        recipeName: query,
        cuisine: cuisine,
        diet: diet,
        intolerance: intolerance,
        number: number
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for recipes:', error);
    throw error;
  }
}
export async function markRecipeAsWatched(recipeId) {
  try {
    const response = await axios.post(`${API_URL}/users/watched`, 
      { recipeId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error marking recipe as watched:', error);
    throw error;
  }
}

export async function getLastViewedRecipes(number) {
  try {
    const response = await axios.get(`${API_URL}/users/lastWatchedRecipes`, {
      params: { number },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching last viewed recipes:', error);
    throw error;
  }
}

export async function isRecipeWatched(recipeId) {
  try {
    const response = await axios.post(`${API_URL}/users/isWatched`, 
      { recipeId },
      { withCredentials: true }
    );
    return response.data.watched;
  } catch (error) {
    console.error('Error checking if recipe is watched:', error);
    throw error;
  }
}