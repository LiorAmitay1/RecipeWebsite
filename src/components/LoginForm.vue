<template>
  <div class="login-container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label="Username:"
        label-for="Username"
        class="form-group-custom"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
          class="form-input-custom"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label="Password:"
        label-for="Password"
        class="form-group-custom"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
          class="form-input-custom"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        class="form-button-custom"
        >Login</b-button>
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register" class="login-link"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import axios from "axios"; // וודא ש-axios מיובאת נכון

export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        console.log("Attempting to log in...");
        const credentials = {
          username: this.form.username,
          password: this.form.password
        };
        const response = await axios.post(
          // "http://localhost:80/Login",
          "https://liors-recipes.cs.bgu.ac.il/Login",
          credentials
        );

        this.$root.store.login(this.form.username);
        this.$router.push("/");
      } catch (err) {
        console.error("Error during login:", err);
        if (err.response && err.response.data && err.response.data.message) {
          this.form.submitError = err.response.data.message;
        } else {
          this.form.submitError = "An error occurred during login.";
        }
      }
    },
    onLogin() {
      console.log("onLogin called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    }
  }
};
</script>

<style scoped>
.login-container {
  background: rgb(168, 153, 121);
  padding: 40px;
  border-radius: 25px;
  box-shadow: 0 10px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.3rem;
  width: 100%;
}

.title {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.0rem;
  color: #6c4e3c;
  font-weight: bold;
}

.form-group-custom {
  font-size: 1.3rem;
}

.form-input-custom {
  border-radius: 8px;
  font-size: 1.3rem;
  padding: 10px;
}

.form-button-custom {
  font-size: 1.55rem;
  padding: 10px 20px;
  border-radius: 11px;
  background-color: #dbcbb3;
  border: 3px solid #6c4e3c;
  color: #6c4e3c;
  width: 100%;
}

.login-link {
  color: #ffffff;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
