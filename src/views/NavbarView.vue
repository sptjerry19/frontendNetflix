<template>
  <!-- new -->
  <!-- :class="{ 'backdrop-blur-md': $route.name !== 'Netflix Film' }" -->
  <header
    class="fixed top-0 w-full z-30 bg-transparent pt-4"
    :class="[!isTop && 'backdrop-blur-md']"
    @mouseleave="isOpenSetting = false"
  >
    <div v-if="isOpenNavleft">
      <nav>
        <a href="#">Trang chủ</a>
        <a href="#">Giới thiệu</a>
        <a href="#">Liên hệ</a>
      </nav>
    </div>
    <!-- <div class="header__overlay absolute inset-0 w-full h-full"></div> -->
    <nav class="px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
      <router-link to="/">
        <NetFlix />
      </router-link>
      <ul
        class="hidden lg:flex col-start-2 col-end-8 text-black-500 items-center"
      >
        <router-link
          to="/home"
          class="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative hover:text-red-700"
          :class="{
            ' text-red-700': $route.name === 'Netflix',
            'text-white': $route.name !== 'Netflix',
          }"
          >Home</router-link
        >
        <router-link
          to="/categories"
          class="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative hover:text-red-700"
          :class="{
            ' text-red-700': $route.name === 'Netflix Categories',
            'text-white': $route.name !== 'Netflix Categories',
          }"
          >Categories</router-link
        >
        <!-- <router-link
          to="/about"
          class="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative hover:text-red-700"
          :class="{
            ' text-red-700': $route.name === 'about',
            'text-white': $route.name !== 'about',
          }"
          >About</router-link
        > -->
        <router-link
          to="/IMDB"
          class="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative hover:text-red-700"
          :class="{
            ' text-red-700': $route.name === 'IMDB',
            'text-white': $route.name !== 'IMDB',
          }"
          >IMDB</router-link
        >
        <router-link
          to="/music"
          :class="{
            'text-red-700': $route.name === 'Netflix Create',
            'text-white': $route.name !== 'Netflix Create',
          }"
          class="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative hover:text-red-700"
          >Musics</router-link
        >
        <router-link
          to="/favorites"
          :class="{
            'text-red-700': $route.name === 'Netflix Create',
            'text-white': $route.name !== 'Netflix Create',
          }"
          class="px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative hover:text-red-700"
          >Favorites</router-link
        >
      </ul>
      <div
        class="col-start-10 col-end-12 font-medium flex justify-end items-center"
      >
        <div class="relative text-lg bg-transparent text-red-800">
          <div class="flex items-center border-b border-red-500 py-2">
            <form
              v-if="$route.path === '/songs' || $route.path === '/music'"
              method="get"
              action="/songs"
            >
              <input
                class="bg-transparent border-none mr-3 px-2 leading-tight focus:outline-none"
                type="text"
                name="a"
                placeholder="search"
              />
              <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
                <svg
                  class="h-4 w-4 fill-current text-red-800"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style="enable-background: new 0 0 56.966 56.966"
                  xml:space="preserve"
                  width="512px"
                  height="512px"
                >
                  <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                  />
                </svg>
              </button>
            </form>
            <form v-else method="get" action="/categories">
              <input
                class="bg-transparent border-none mr-3 px-2 leading-tight focus:outline-none"
                type="text"
                name="a"
                placeholder="search"
              />
              <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
                <svg
                  class="h-4 w-4 fill-current text-red-800"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style="enable-background: new 0 0 56.966 56.966"
                  xml:space="preserve"
                  width="512px"
                  height="512px"
                >
                  <path
                    d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div
          v-if="tokenStorage"
          class="flex ml-14 items-center space-x-4"
          @mouseover="isOpenSetting = true"
          @click="isOpenSetting = true"
        >
          <img
            class="w-10 h-10 rounded"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Default avatar"
          />
        </div>
        <div v-else class="flex items-center justify-center ml-10">
          <router-link
            class="text-white px-2 py-1 hover:text-cyan-300"
            to="/login"
            >Login</router-link
          >
          <router-link class="" to="/register">
            <ButtonTrans1 :name="'Register'" />
          </router-link>
        </div>
        <div
          class="absolute top-20 right-4 text-black bg-gray-300 rounded-md"
          v-if="isOpenSetting"
        >
          <div class="px-2 py-1 hover:text-blue-500">
            <router-link class="flex items-center" to="/settings"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="ml-2">setting</span></router-link
            >
          </div>
          <div class="px-2 py-1 hover:text-gray-500">
            <router-link class="flex items-center" to="/about"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              <span class="ml-2">information</span></router-link
            >
          </div>
          <div>
            <button
              class="flex items-center flex-row px-2 py-1 hover:text-red-500"
              @click="logOut"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span class="ml-2">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import NetFlix from "../components/logos/NetFlix.vue";
import ButtonTrans1 from "../components/buttons/ButtonTrans1.vue";
</script>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selectList: ["Home", "Categories", "About", "Add Video"],
      isOpenSetting: false,
      tokenStorage: localStorage.getItem("token"),
      isTop: true,
      isOpenNavleft: false,
      isDragging: false,
      startX: 0,
      endX: 0,
    };
  },
  methods: {
    logOut() {
      const api = this.$store.state.UrlServe + "/logout";
      const token = this.tokenStorage;
      localStorage.removeItem("token");
      this.$router.push("/");
      axios
        .post(api, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.$store.state.tokenUser = "";
          this.$store.state.isAuthenticated = false;
          localStorage.removeItem("token");
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
    handleScroll() {
      this.isTop = window.scrollY === 0;
    },
    openNavLeft() {
      this.isOpenNavleft = true;
    },
    navFadeIn() {
      this.$refs.nav.style.opacity = 0;
      this.$refs.nav.style.transition = "opacity 200ms ease-in-out";
      this.$refs.nav.style.opacity = 1;
    },

    navFadeOut() {
      this.$refs.nav.style.opacity = 1;
      this.$refs.nav.style.transition = "opacity 200ms ease-in-out";
      this.$refs.nav.style.opacity = 0;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    // document.addEventListener("mousedown", function (event) {
    //   this.isDragging = true;
    //   console.log(event.clientX);
    //   this.startX = event.clientX;
    //   // console.log(event.clientY);
    // });
    // document.addEventListener("mouseup", function (event) {
    //   this.isDragging = false;
    //   console.log(event.clientX);
    //   this.endX = event.clientX;
    //   // console.log(event.clientY);
    //   if (this.endX - this.startX >= 150) {
    //     this.isOpenNavleft = true;
    //     console.log(this.isOpenNavleft);
    //   }
    // });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {},
};
</script>
