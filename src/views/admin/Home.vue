<template>
  <aside
    class="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]"
  >
    <div>
      <div class="-mx-6 px-6 py-4">
        <a href="#" title="home">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            class=""
            alt="netflix logo"
          />
        </a>
      </div>

      <div class="mt-8 text-center">
        <img
          src="https://cdn3.iconfinder.com/data/icons/avatars-add-on-pack-2/48/v-32-512.png"
          alt=""
          class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
        />
        <h5 class="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
          SPT jerry
        </h5>
        <span class="hidden text-gray-400 lg:block">Admin</span>
      </div>

      <ul class="space-y-2 tracking-wide mt-8">
        <li>
          <router-link
            to="/settings"
            aria-label="dashboard"
            class="relative px-4 py-3 flex items-center space-x-4 rounded-xl"
            @click="isActive = 'dashboard'"
            :class="{
              'text-white bg-gradient-to-r from-sky-600 to-cyan-400':
                $route.name === 'Netflix settings',
            }"
          >
            <svg class="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                class="fill-current text-cyan-400 dark:fill-slate-600"
              ></path>
              <path
                d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                class="fill-current text-cyan-200 group-hover:text-cyan-300"
              ></path>
              <path
                d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                class="fill-current group-hover:text-sky-300"
              ></path>
            </svg>
            <span class="-mr-1 font-medium">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/settings/categories"
            class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
            @click="isActive = 'categories'"
            :class="{
              'text-white bg-gradient-to-r from-sky-600 to-cyan-400':
                $route.name === 'Netflix setting Categories',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                class="fill-current text-gray-300 group-hover:text-cyan-300"
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                clip-rule="evenodd"
              />
              <path
                class="fill-current text-gray-600 group-hover:text-cyan-600"
                d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
              />
            </svg>
            <span class="group-hover:text-gray-700">Categories</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/settings/genres"
            class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
            @click="isActive = 'genres'"
            :class="{
              'text-white bg-gradient-to-r from-sky-600 to-cyan-400':
                $route.name === 'Netflix setting genres',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                class="fill-current text-gray-300 group-hover:text-cyan-300"
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                clip-rule="evenodd"
              />
              <path
                class="fill-current text-gray-600 group-hover:text-cyan-600"
                d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
              />
            </svg>
            <span class="group-hover:text-gray-700">Genres</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/settings/singers"
            class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
            @click="isActive = 'singers'"
            :class="{
              'text-white bg-gradient-to-r from-sky-600 to-cyan-400':
                $route.name === 'Netflix setting singers',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                class="fill-current text-gray-300 group-hover:text-cyan-300"
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                clip-rule="evenodd"
              />
              <path
                class="fill-current text-gray-600 group-hover:text-cyan-600"
                d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
              />
            </svg>
            <span class="group-hover:text-gray-700">Singers</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/settings/musics"
            class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
            @click="isActive = 'musics'"
            :class="{
              'text-white bg-gradient-to-r from-sky-600 to-cyan-400':
                $route.name === 'Netflix setting musics',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                class="fill-current text-gray-300 group-hover:text-cyan-300"
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                clip-rule="evenodd"
              />
              <path
                class="fill-current text-gray-600 group-hover:text-cyan-600"
                d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
              />
            </svg>
            <span class="group-hover:text-gray-700">Musics</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link
            to="/settings/films"
            class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
            @click="isActive = 'films'"
            :class="{
              'text-white bg-gradient-to-r from-sky-600 to-cyan-400':
                isActive === 'films',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                class="fill-current text-gray-600 group-hover:text-cyan-600"
                fill-rule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clip-rule="evenodd"
              />
              <path
                class="fill-current text-gray-300 group-hover:text-cyan-300"
                d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
              />
            </svg>
            <span class="group-hover:text-gray-700">Films</span>
          </router-link>
        </li> -->
      </ul>
    </div>

    <div class="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
      <router-link to="/home">
        <button
          class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
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
          <span class="group-hover:text-gray-700">Logout</span>
        </button>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import DashBoard from "./contents/DashBoard.vue";
import SearchBar from "./contents/SearchBar.vue";
import Categories from "./contents/Categories.vue";
import FilmTable from "./contents/FilmTable.vue";
</script>

<script>
export default {
  data() {
    return {
      options: [
        "dashboard",
        "categories",
        "films",
        "musics",
        "genres",
        "singers",
      ],
      isActive: "dashboard",
    };
  },
};
</script>
