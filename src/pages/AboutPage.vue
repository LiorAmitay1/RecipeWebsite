<template>
  <div class="background">
    <div class="about-page">
      <div class="container">
        <h1>About Us</h1>
        <p class="intro">
          Welcome to our recipe site! We are a passionate team of developers
          dedicated to creating the best culinary experience for our users. Our
          mission is to bring delicious recipes to your kitchen easily and
          simply and help different chefs share their great recipes so that
          everyone can try their hand at making them.
        </p>

        <h2>Our Team</h2>
        <div class="team-section">
          <div class="team-member">
            <h3>Lior Amitay</h3>
            <p>Information systems engineering student</p>
            <p>Lior is a third year student at Ben Gurion University, Israel.</p>
          </div>
          <div class="team-photo-container">
            <img src="@/assets/Liorx2 pic.jpg" alt="Lior Amitay and Lior Levy" class="team-photo-large" />
          </div>
          <div class="team-member">
            <h3>Lior Levy</h3>
            <p>Information systems engineering student</p>
            <p>Lior is a third year student at Ben Gurion University, Israel.</p>
          </div>
        </div>

        <h2>Our Mission</h2>
        <p class="intro">
          Our goal is to empower home cooks and food enthusiasts with a wide
          variety of recipes that are easy to follow and delicious to taste. We
          believe that cooking should be fun, accessible, and enjoyable for
          everyone.
        </p>

        <h2>Contact Us</h2>
        <p class="intro">
          Have any questions or feedback? We'd love to hear from you! Contact us
          at <a href="mailto:support@vuerecipes.com">support@vuerecipes.com</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      team: [
        {
          id: 1,
          name: "Lior Amitay",
          role: "Information systems engineering student",
          bio: "Lior is a third year student at Ben Gurion University, Israel.",
        },
        {
          id: 2,
          name: "Lior Levy",
          role: "Information systems engineering student",
          bio: "Lior is a third year student at Ben Gurion University, Israel.",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* .background {
  background-image: url("~@/assets/backGround.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
} */

.about-page {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
  color: #333;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  width: 100%;

  .container {
    max-width: 1500px;
    margin: auto;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
  }

  h1,
  h2 {
    color: #981a51;
    margin-bottom: 15px;
    text-align: center;
    font-size: 2.5rem;
  }

  .intro, .container p {
    font-size: 1.5rem;
    margin-bottom: 20px;
    text-align: center;
  }

  .team-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .team-member {
      width: 20%;
      margin-bottom: 20px;
      text-align: center;

      h3 {
        margin: 10px 10 5px;
        font-size: 1.5rem;
      }

      p {
        margin: 5px 0;
      }
    }

    .team-photo-container {
      width: 50%;
      text-align: center;
      margin-bottom: 20px;


      .team-photo-large {
        width: 60%; /* Adjust the width to fit the container */
        height: auto;
        border-radius: 50px;
      }
    }
  }

  a {
    color: #685555;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (min-width: 600px) {
  .about-page {
    padding: 40px;
  }

  .intro, .container p {
    font-size: 1.4rem;
    text-align: justify;
  }

  .about-page h1 {
    font-size: 2.5rem;
  }

  .about-page h2 {
    font-size: 2rem;
  }

  .about-page .team-section .team-member h3 {
    font-size: 1.6rem;
  }

  .about-page .team-section .team-member p {
    font-size: 1rem;
  }
}

@media (min-width: 1024px) {
  .background {
    padding: 40px;
  }

  .about-page {
    padding: 60px;
  }

  .intro, .container p {
    font-size: 1.6rem;
    text-align: justify;
  }

  .about-page h1 {
    font-size: 3rem;
  }

  .about-page h2 {
    font-size: 2.5rem;
  }

  .about-page .team-section .team-member h3 {
    font-size: 1.8rem;
  }

  .about-page .team-section .team-member p {
    font-size: 1.2rem;
  }

  .team-section .team-member {
    width: 30%;
  }
}
</style>
