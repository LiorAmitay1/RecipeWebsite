// src/services/user.js
import axios from 'axios';

// const API_URL = 'http://localhost:80'; // Adjust the URL according to your backend server configuration
const API_URL = 'https://liors-recipes.cs.bgu.ac.il';

export async function addFavorite(recipeId) {
  try {
    const response = await axios.post(`${API_URL}/users/favorites`, 
      { recipeId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function removeFavorite(recipeId) {
  try {
    const response = await axios.delete(`${API_URL}/users/favorites`, 
      { 
        data: { recipeId },
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function getFavoriteRecipes() {
  try {
    const response = await axios.get(`${API_URL}/users/favorites`, 
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function getUserRecipes() {
  try {
    const response = await axios.get(`${API_URL}/users/userRecipes`, 
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function createRecipe(recipe) {
  try {
    const response = await axios.post(`${API_URL}/users/createARecipe`, recipe, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response;
  }
}
export async function deleteRecipe(title) {
  try {
    const response = await axios.delete(`${API_URL}/users/deleteRecipe`, {
      params: { title },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function isFavorite(recipeId) {
  try {
    const response = await axios.post(`${API_URL}/users/isFavorite`, 
      { recipeId },
      { withCredentials: true }
    );
    return response.data.favorite;
  } catch (error) {
    throw error.response;
  }
}

