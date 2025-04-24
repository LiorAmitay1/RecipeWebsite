<!-- <template>
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
        <div class="form-group dietary-group">
          <label>Dietary Restrictions</label>
          <div class="checkbox-group">
            <label><input type="checkbox" v-model="isVegetarian"> Vegetarian</label>
            <label><input type="checkbox" v-model="isVegan"> Vegan</label>
            <label><input type="checkbox" v-model="isGlutenFree"> Gluten Free</label>
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
      visible: true
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitRecipe() {
      const newRecipe = {
        title: this.recipeName,
        description: this.ingredients,
        time: this.preparationTime,
        servings: this.servings,
        instructions: this.instructions,
        date: new Date().toLocaleDateString(),
        image: 'https://img.mako.co.il/2015/06/22/cakepops_shokolit_c.jpg',
        url: '#',
        dietaryRestrictions: {
          vegetarian: this.isVegetarian,
          vegan: this.isVegan,
          glutenFree: this.isGlutenFree
        }
      };

      let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
      recipes.push(newRecipe);
      localStorage.setItem('recipes', JSON.stringify(recipes));

      this.$router.push({ name: 'myRecipes' });
      this.closeModal();
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
  top: 40px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #a89979;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 700px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
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
  margin-bottom: 30px;
  font-size: 2.85rem;
  font-weight: bold;
  color: #6c4e3c;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align all elements to the right */
}

.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  width: 100%; /* Full width */
}

.form-group label {
  width: 30%;
  text-align: left;
  font-size: 1.3rem;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  margin-left: auto; /* Align to the right */
}

.form-group input,
.form-group textarea {
  width: 70%;
  margin-left: 10px; /* Add some space between label and input */
  padding: 10px;
  box-sizing: border-box;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  border-radius: 10px;
  border: 3px solid #5c4b4b;
}

.form-group textarea {
  height: 100px;
}

.dietary-group {
  justify-content: flex-start; /* Align to the left */
}

.checkbox-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 20px; /* Added gap for better spacing */
  width: 70%;
  margin-left: 10px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%; /* Full width */
}

.reset-button, .submit-button {
  width: 45%;
  padding: 8px;
  border-radius: 8px;
  font-size: 1.5rem;
  background-color: #dbcbb3 !important;
  border: 2px solid #6c4e3c !important; 
  color: #6c4e3c !important;
}
</style> -->
