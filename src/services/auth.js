// // src/services/auth.js


//   export function mockLogin(credentials, success = true) {
//     // Check if already logged in
//     if (!success) {
//       throw { status: 409, response: { data: { message: "A user is already logged in", success: false } } };
//     }

//     // If all checks pass, return a success message
//     return { status: 200, response: { data: { message: "login succeeded", success: true}} };
//   }
  

//   export function mockRegister(userDetails, success = true) {

//     if (!success) {
//       throw { status: 409, response: { data: { message: "Username taken", success: false } } };
//     }
  
//     return { status: 200, response: { data: { message: "user created", success: true}} };
//   }
  


//   export function mockLogout() {
//     return { status: 200, response: { data: { message: "logout succeeded", success: true}} };

//   }
  

// src/services/auth.js
import axios from "axios";

// const API_URL = "http://localhost:80"; // Adjust the URL according to your backend server configuration
const API_URL = "https://liors-recipes.cs.bgu.ac.il";
export async function register(userDetails) {
  try {
    const response = await axios.post(`${API_URL}/register`, userDetails);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export async function logout() {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}
