<template>
  <div class="background">
    <div class="container">
      <h1 class="title">My Family Recipes</h1>
      <div class="recipes-list">
        <FullRecipe
          v-for="(recipe, index) in familyRecipes"
          :key="index"
          :recipe="recipe"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FullRecipe from '../components/FullRecipeFamily.vue';

export default {
  name: 'FamilyRecipesPage',
  components: {
    FullRecipe
  },
  data() {
    return {
      familyRecipes: [
        {
          title: "Kahi (קאאי)",
          image: require('@/assets/kahi.jpg'),
          familyDetails: "My grandmother would prepare it the morning after the eve of Shavuot and all the family members would come to her to taste this food. We would wait all year to eat it and it is a traditional Iraqi dish.",
          ingredients: [
            "1 kg flour",
            "5 tablespoons oil",
            "1/4 teaspoon salt",
            "500 ml water",
            "1/4 teaspoon yeast"
          ],
          instructions: [
            "Mix all the ingredients in a large bowl until you get a uniform mixture.",
            "Form dough balls and roll each piece thinly.",
            "Spread butter on each dough piece and fold until you achieve a square of desired size, typically the size of the pan.",
            "Heat butter in a pan over medium heat.",
            "Fry the dough until golden brown on both sides.",
            "Remove from the pan onto a plate and serve with sugar sprinkled on top."
          ],
          servings: 9
        },
        {
          title: "Crepe cake",
          image: require('@/assets/crepe.jpg'),
          familyDetails: "We really like sweets and crepes so I decided to make this cake a year ago and since then I have been making it many times.",
          ingredients: [
            "8 eggs L",
            "Cup of sugar",
            "3.5 cups of flour",
            "2 cups of milk",
            "2 cups of water",
            "500 ml sweet whipping cream",
            "100 grams of mascarpone cheese",
            "1/2 cup sugar",
            "1 vanilla pudding"
          ],
          instructions: [
            "Put eggs, sugar and milk in a bowl and mix well, add the flour and water and continue mixing.",
            "Heat a pan with a little butter and pour some of the batter into the hot pan and make crepes",
            "After the crepes cool, we will start assembling the cake.",
            "Let's move on to the cream - in the bowl of a mixer put whipping cream mascarpone cheese, sugar and vanilla pudding, turn on medium speed to get a stable cream.",
            "We will move on to assembly - on a serving plate we will place a crepe and spread an even and thin layer of the cream we prepared on top we will place another crepe and so we will continue to build the layers until we get a tall cake full of layers",
            "We will save a little of the cream and decorate the top, put some fruit for decoration and that's it."
          ],
          servings: 10
        },
        {
          title: "Pasta with Tomato and Basil Sauce",
          image: require('@/assets/pasta.jpg'),
          familyDetails: "We really like Italian food and especially pasta so this is a regular recipe that we make at least once a week",
          ingredients: [
            "500g penne pasta",
            "2 tablespoons olive oil",
            "3 garlic cloves, chopped",
            "5 tomatoes, grated",
            "1 tablespoon tomato paste",
            "A handful of fresh basil leaves",
            "Salt and pepper to taste",
            "1/2 cup grated Parmesan cheese"
          ],
          instructions: [
            "Cook the pasta according to the package instructions and drain.",
            "Heat olive oil in a large skillet and sauté the chopped garlic until golden.",
            "Add the grated tomatoes and tomato paste and cook over medium heat for 10 minutes.",
            "Add the basil leaves, salt, and pepper, and cook for another 2 minutes.",
            "Mix the sauce with the cooked pasta and sprinkle the grated Parmesan cheese on top.",
            "Serve hot."
          ],
          servings: 4
        },
        {
          title: "Baked Cheesecake",
          image: require('@/assets/cheese_cake.jpg'),
          familyDetails: "My grandmother used to make this cake for us when I was little and since then she makes it every Friday",
          ingredients: [
            "500g cream cheese",
            "1 cup sugar",
            "4 eggs",
            "1 teaspoon vanilla extract",
            "1 tablespoon flour",
            "1/2 cup heavy cream",
            "1/2 cup biscuit crumbs"
          ],
          instructions: [
            "Preheat the oven to 180°C (350°F).",
            "In a large bowl, mix the cream cheese with the sugar until smooth.",
            "Add the eggs one at a time ,mixing well after each addition.",
            "Add the vanilla extract and flour and mix well.",
            "Add the heavy cream and mix until everything is well combined.",
            "Spread the biscuit crumbs at the bottom of a baking pan and pour the cheese mixture on top.",
            "Bake in the preheated oven for 50-60 minutes until the cake is set and golden.",
            "Let cool before serving."
          ],
          servings: 8
        }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  width: 100%;
}

.title {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  color: #981a51;
  margin-bottom: 20px;
  text-align: center;
}

.recipes-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
