import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {

    // server_domain: "http://localhost:3000",

    // server_domain: "http://132.72.65.211/",
    server_domain: "https://liors-recipes.cs.bgu.ac.il",
    
};


// const state = {
//   server_domain: "http://localhost:3000",
//   username: localStorage.getItem('username') || null,
//   recipes: []
// };

// const mutations = {
//   setUsername(state, username) {
//     state.username = username;
//     if (username) {
//       localStorage.setItem('username', username);
//     } else {
//       localStorage.removeItem('username');
//     }
//   },
//   addRecipe(state, recipe) {
//     state.recipes.push(recipe);
//   },
//   deleteRecipe(state, id) {
//     state.recipes = state.recipes.filter(recipe => recipe.id !== id);
//   }
// };

// export default new Vuex.Store({
//   state,
//   mutations
// });
