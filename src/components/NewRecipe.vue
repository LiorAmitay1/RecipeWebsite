<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Submit Your Recipe</h2>
      <form @submit.prevent="submitRecipe">
        <div class="form-group">
          <label for="recipe-name">Recipe Name</label>
          <input type="text" id="recipe-name" v-model="recipeName" required class="form-input">
        </div>
        <div class="form-group">
          <label for="ingredients" class="multi-line-label">
            <div>Ingredients</div>
            <div>and</div>
            <div>Quantity</div>
          </label>
          <textarea id="ingredients" v-model="ingredients" rows="5" required class="form-textarea"></textarea>
        </div>
        <div class="form-group">
          <label for="preparation-time">Preparation Time (in minutes)</label>
          <input type="number" id="preparation-time" v-model="preparationTime" required class="form-input">
        </div>
        <div class="form-group">
          <label for="servings">Number of Servings</label>
          <input type="number" id="servings" v-model="servings" required class="form-input">
        </div>
        <div class="form-group">
          <label for="instructions">Instructions</label>
          <textarea id="instructions" v-model="instructions" rows="5" required class="form-textarea"></textarea>
        </div>
        <div class="form-group">
          <label for="image-url">Image URL</label>
          <input type="text" id="image-url" v-model="imageUrl" class="form-input">
        </div>
        <div class="form-group dietary-group">
          <label>Dietary Restrictions</label>
          <div class="checkbox-group">
            <label class="custom-checkbox">
              <input type="checkbox" v-model="isVegetarian">
              <span class="checkmark"></span> Vegetarian
            </label>
            <label class="custom-checkbox">
              <input type="checkbox" v-model="isVegan">
              <span class="checkmark"></span> Vegan
            </label>
            <label class="custom-checkbox">
              <input type="checkbox" v-model="isGlutenFree">
              <span class="checkmark"></span> Gluten Free
            </label>
          </div>
        </div>
        <div class="modal-buttons">
          <b-button type="button" class="reset-button" @click="closeModal">Cancel</b-button>
          <b-button type="submit" class="submit-button">OK</b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { createRecipe } from '../services/user.js'; // Import the createRecipe function

export default {
  name: 'NewRecipe',
  data() {
    return {
      recipeName: '',
      ingredients: '',
      preparationTime: '',
      servings: '',
      instructions: '',
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      visible: true,
      imageUrl: '' // הוספת שדה URL לתמונה
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async submitRecipe() {
      try {
        const newRecipe = {
          title: this.recipeName,
          imageUrl: this.imageUrl, // שימוש ב-URL של התמונה
          preparation_time: this.preparationTime,
          vegan: this.isVegan,
          vegetarian: this.isVegetarian,
          gluten_free: this.isGlutenFree,
          ingredients: this.ingredients,
          instructions: this.instructions,
          servings: this.servings
        };

        await createRecipe(newRecipe);

        this.$router.push({ name: 'myRecipes' });
        this.closeModal();
      } catch (error) {
        console.error('Failed to submit recipe:', error);
        alert('Failed to submit recipe. Please try again.');
      }
    }
  },
  mounted() {
    this.visible = true;
  }
};
</script>

<style scoped>
@import "@/scss/form-style.scss";

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0; 
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  padding-bottom: 20px; 
  padding-top: 180px; 
}

.modal-content {
  background-color: #a89979;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 70%;
  max-width: 700px;
  max-height: 90vh; 
  overflow-y: auto; 
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  margin-top: 20px; 
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

h2 {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  font-weight: bold;
  color: #6c4e3c;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-end; 
}

.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px; 
  width: 100%; 
}

.form-group label {
  width: 30%;
  text-align: left;
  font-size: 1.2rem; 
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  margin-left: 0%; 
}

.form-group input,
.form-group textarea {
  width: 70%;
  margin-left: 10px; 
  padding: 8px; 
  box-sizing: border-box;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  border-radius: 10px;
  border: 2px solid #5c4b4b; 
}

.form-group textarea {
  height: 80px; 
}

.dietary-group {
  justify-content: flex-start; 
}

.checkbox-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px; 
  width: 100%;
  margin-left: 10px;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 0.8rem;
  user-select: none;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.custom-checkbox .checkmark {
  position: absolute;
  top: 110;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border: 2px solid #6c4e3c;
  border-radius: 4px;
}

.custom-checkbox:hover input ~ .checkmark {
  background-color: #dbcbb3;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #6c4e3c;
}

.custom-checkbox .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
}

.reset-button, .submit-button {
  width: 45%;
  padding: 8px;
  border-radius: 8px;
  font-size: 1.2rem;
  background-color: #dbcbb3 !important;
  border: 2px solid #6c4e3c !important; 
  color: #6c4e3c !important;
  cursor: pointer; 
}

.reset-button:hover, .submit-button:hover {
  background-color: #b89b89 !important;
  border-color: #6c4e3c !important; 
  color: #6c4e3c !important;
}

.form-group-upload {
  display: flex;
  align-items: center;
  justify-content: flex-start; 
}

.form-group-upload label {
  margin-right: 10px;
}

.form-group input[type="file"] {
  display: none; 
}

.form-group button {
  padding: 10px 20px;
  background-color: #dbcbb3;
  border: 2px solid #6c4e3c;
  color: #6c4e3c;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: inline-block;
}

.form-group button:hover {
  background-color: #b89b89;
}

.form-group span {
  margin-left: 10px;
  font-size: 1rem;
  display: inline-block;
}
</style>
