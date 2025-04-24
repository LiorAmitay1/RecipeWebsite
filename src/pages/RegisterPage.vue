<template>
  <div class="background">
    <div class="container custom-font">
      <h1 class="title">Register</h1>
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <b-form-group
          id="input-group-username"
          label-cols-sm="3"
          label="Username:"
          label-for="username"
        >
          <b-form-input
            id="username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
            class="form-input"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.username.required">
            Username is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.username.length">
            Username length should be between 3-8 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.username.alpha">
            Username should be alphabetic
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-firstname"
          label-cols-sm="3"
          label="First Name:"
          label-for="firstname"
        >
          <b-form-input
            id="firstname"
            v-model="$v.form.firstname.$model"
            type="text"
            :state="validateState('firstname')"
            class="form-input"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstname.required">
            First name is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-lastname"
          label-cols-sm="3"
          label="Last Name:"
          label-for="lastname"
        >
          <b-form-input
            id="lastname"
            v-model="$v.form.lastname.$model"
            type="text"
            :state="validateState('lastname')"
            class="form-input"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastname.required">
            Last name is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-email"
          label-cols-sm="3"
          label="Email:"
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model="$v.form.email.$model"
            type="email"
            :state="validateState('email')"
            class="form-input"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">
            Email is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.email.email">
            Email must be valid
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-country"
          label-cols-sm="3"
          label="Country:"
          label-for="country"
        >
          <b-form-select
            id="country"
            v-model="$v.form.country.$model"
            :options="countries"
            :state="validateState('country')"
            class="form-select"
          ></b-form-select>
          <b-form-invalid-feedback>
            Country is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-password"
          label-cols-sm="3"
          label="Password:"
          label-for="password"
        >
          <b-form-input
            id="password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
            class="form-input"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.password.required">
            Password is required
          </b-form-invalid-feedback>
          <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
            Your password should be <strong>strong</strong>. <br />
            For that, your password should be:
          </b-form-text>
          <b-form-invalid-feedback
            v-if="$v.form.password.required && !$v.form.password.length"
          >
            Have length between 5-10 characters long
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-confirmedPassword"
          label-cols-sm="3"
          label="Confirm Password:"
          label-for="confirmedPassword"
        >
          <b-form-input
            id="confirmedPassword"
            type="password"
            v-model="$v.form.confirmedPassword.$model"
            :state="validateState('confirmedPassword')"
            class="form-input"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
            Password confirmation is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.confirmedPassword.sameAsPassword"
          >
            The confirmed password is not equal to the original password
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="form-buttons">
          <b-button type="reset" variant="danger" class="reset-button">Reset</b-button>
          <b-button type="submit" variant="primary" class="submit-button">Register</b-button>
        </div>
        <div class="mt-2">
          You have an account already?
          <router-link to="login" class="login-link">Log in here</router-link>
        </div>
      </b-form>
      <b-alert
        class="mt-2"
        v-if="form.submitError"
        variant="warning"
        dismissible
        show
      >
        Register failed: {{ form.submitError }}
      </b-alert>
    </div>
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";
import { register } from "../services/auth.js"; // שימוש בפונקציה register

export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstname: {
        required
      },
      lastname: {
        required
      },
      email: {
        required,
        email
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const userDetails = {
          username: this.form.username,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          country: this.form.country,
          password: this.form.password,
          email: this.form.email
        };

        const response = await register(userDetails);

        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },

    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 100px;
  width: 700px; /* Width of the container */
  height: 770px;
  background-color: rgb(168, 153, 121);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-font, .custom-font * {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; /* ניתן להחליף את Arial לפונט הרצוי */
  font-size: 1.55rem;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.85rem;
  color: #333;
}

.form-input {
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 10px;
}

.form-select {
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 10px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.reset-button, .submit-button {
  width: 48%;
  padding: 10px;
  border-radius: 11px;
  font-size: 1.55rem;
  background-color: #dbcbb3;
  border: 3px solid #6c4e3c; 
  color: #6c4e3c;
}

.login-link {
  color: #ffffff;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
