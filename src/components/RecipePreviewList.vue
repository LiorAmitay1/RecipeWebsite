<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in displayedRecipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type: Array,
      required: true
    },
    amountToShow: {
      type: Number,
      default: 3
    }
  },
  computed: {
    displayedRecipes() {
      return this.recipes.slice(0, this.amountToShow);
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 400px;
}
</style>
