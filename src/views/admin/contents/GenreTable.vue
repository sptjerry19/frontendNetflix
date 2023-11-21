<template>
  <Home />
  <SearchBar :name="$route.name" />
  <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
    <div class="px-6 pt-6 2xl:container">
      <ButtonTrans1Vue @click="isOpenModal = true" :name="'Create genre'" />
      <ModalForm
        v-click-outside="onClickOutside"
        v-if="isOpenModal"
        @closeModal="isOpenModal = false"
        :table="'genres'"
      />
      <updateGenre
        v-if="isUpdateModal"
        @closeModal="isUpdateModal = false"
        :id="currentId"
        :genreName="currentGenre"
      />
      <table class="mt-2 border-collapse w-11/12 max-w-full">
        <thead>
          <tr>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              id
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              name
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              created_at
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
            v-for="genre in genres"
            :key="genre.id"
          >
            <td
              class="w-5 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ genre.id }}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static hover:cursor-pointer"
            >
              <router-link :to="'/genres/' + genre.id">
                {{ genre.name }}
              </router-link>
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ moment(genre.created_at).format("DD-MM-YYYY") }}
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <button
                class="text-blue-400 hover:text-blue-600 underline"
                @click="
                  (currentId = genre.id),
                    (currentGenre = genre.name),
                    (isUpdateModal = true)
                "
              >
                Edit
              </button>
              <button
                class="text-red-400 hover:text-red-600 underline pl-6"
                @click="removeGenre(genre.id)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import Home from "../Home.vue";
import SearchBar from "./SearchBar.vue";
import ModalForm from "../../../components/modals/modalForm.vue";
import axios from "axios";
import ButtonTrans1Vue from "../../../components/buttons/ButtonTrans1.vue";
import updateGenre from "../../../components/modals/updateGenre.vue";
</script>

<script>
import vClickOutside from "click-outside-vue3";
import moment from "moment";
export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      genres: [],
      moment: moment,
      isOpenModal: false,
      isUpdateModal: false,
      currentId: 0,
      currentGenre: "",
      token: localStorage.getItem("token"),
    };
  },
  created() {
    const api = this.$store.state.UrlServe + "/genres";
    axios
      .get(api)
      .then((response) => {
        this.genres = response.data.data;
        console.log(response);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    onClickOutside(event) {
      console.log("Clicked outside. Event: ", event);
    },
    removeGenre(id) {
      const api = this.$store.state.UrlServe + "/genres/" + id;
      axios
        .delete(api, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
