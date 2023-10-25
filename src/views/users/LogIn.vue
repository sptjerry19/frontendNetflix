<template>
  <div
    class="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
    style="
      background-image: url('https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/1a5c57fd-7621-42e4-8488-e5ae84fe9ae5/VN-vi-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg');
    "
  >
    <div
      class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8"
    >
      <div class="text-white">
        <div class="mb-8 flex flex-col items-center">
          <!-- <img width="150" alt="" srcset="" /> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="200"
            height="150"
            viewBox="0 0 48 48"
          >
            <path
              fill="#F44336"
              d="M5 18c.7 0 1.3 0 2 0 0 4.1 0 8.1 0 12.2-.8.1-1.6.2-2.3.3-1-2.5-2.7-6.8-2.7-6.8S2 28 2 30.8c.4 0-.2 0-2 .3 0-4.3 0-8.7 0-13 .8 0 2 0 2 0l3 7.3C5 25.4 5 20.8 5 18zM14.7 20c0-.6 0-1.4 0-2-1.9 0-3.8 0-5.7 0 0 4 0 8 0 12 1.9-.2 3.8-.4 5.7-.6 0-.6 0-1.4 0-2-1.2.1-2.4.1-3.7.4 0-1.1 0-1.7 0-2.8.9 0 2.1 0 3 0 0-.6 0-1.4 0-2-.9 0-2.1 0-3 0 0-1.1 0-1.9 0-3C11.6 20.1 14.2 20.1 14.7 20zM16 20c.1 0 1.9 0 2 0 0 3.2 0 6 0 9.2.7 0 1.3 0 2-.1 0-3.2 0-5.9 0-9.1.7 0 1.3 0 2 0 0-.6 0-1.4 0-2-2.1 0-3.9 0-6 0C16 18.6 16 19.4 16 20zM28.6 18c-1.9 0-3.7 0-5.6 0 0 3.8 0 7.2 0 11 .2 0 .4 0 .6 0 .4 0 .9 0 1.4 0 0-1.6 0-2.4 0-4 .1 0 2.4 0 2.7 0 0-.6 0-1.4 0-2-.3 0-2.6 0-2.7 0 0-1 0-2 0-3 .2 0 3.1 0 3.6 0C28.6 19.5 28.6 18.6 28.6 18zM32 27.5c0-3.3 0-6.2 0-9.5-.7 0-1.3 0-2 0 0 3.8 0 7.4 0 11.2 1.8.1 3.6.2 5.4.4 0-.6 0-1.3 0-1.9C34.3 27.6 33.1 27.5 32 27.5zM37 29.7c.7.1 1.3.1 2 .2 0-4 0-7.9 0-11.9-.7 0-1.3 0-2 0C37 22 37 25.8 37 29.7zM45.4 24.2c.9-2 1.7-4 2.6-6.1-.7 0-1.5 0-2.2 0-.5 1.3-.9 2.2-1.4 3.4-.5-1.3-.8-2.2-1.3-3.4-.7 0-1.5 0-2.2 0 .8 2 1.5 4 2.4 6.1-.9 2-1.7 4-2.6 6 .7.1 1.4.2 2.1.3.5-1.3 1-2.2 1.5-3.5.5 1.4 1 2.4 1.5 3.8.7.1 1.6.2 2.3.3C47.1 28.7 46.2 26.3 45.4 24.2z"
            ></path>
          </svg>
          <h1 class="mb-2 text-2xl">Netflix</h1>
          <span class="text-gray-300">Enter Login Details</span>
        </div>
        <form method="POST" @submit.prevent="logIn">
          <label for="">Email:</label>
          <div class="mb-4 text-lg">
            <input
              class="rounded-3xl border-none bg-red-600 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              type="text"
              name="name"
              v-model="email"
            />
          </div>

          <label for="">Password:</label>
          <div class="mb-4 text-lg">
            <input
              class="rounded-3xl border-none bg-red-600 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              type="Password"
              name="name"
              v-model="password"
            />
          </div>
          <div class="mt-8 flex justify-center text-lg text-black">
            <button
              type="submit"
              class="rounded-3xl bg-red-800 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-red-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    logIn() {
      const formData = new FormData();
      formData.append("email", this.email);
      formData.append("password", this.password);

      // Use Axios to make the HTTP POST request to the API
      axios
        .post(this.$store.state.UrlServe + "/login", formData)
        .then((response) => {
          console.log(response.data.token);
          this.$store.dispatch("saveToken", response.data.token);
          localStorage.setItem("token", response.data.token);
          this.$router.push({ path: "/home" });
          // Reset the form
          this.email = "";
          this.password = "";
        })
        .catch((error) => {
          console.log(error);
          // const errors = error.response.data.errors;
          // this.error.email = errors.email;
          // this.error.password = errors.password;
        });
      // reset
      this.error.email = "";
      this.error.password = "";
    },
  },
  mounted() {
    console.log(this.$store.state.UrlServe);
  },
};
</script>
