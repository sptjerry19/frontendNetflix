<template>
  <Home />
  <SearchBar :name="$route.name" />
  <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
    <div class="px-6 pt-6 2xl:container">
      <ButtonTrans1Vue @click="isOpenModal = true" :name="'Create Category'" />
      <ModalForm
        v-click-outside="onClickOutside"
        v-if="isOpenModal"
        @closeModal="isOpenModal = false"
        :table="'categories'"
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
            v-for="category in categories"
            :key="category.id"
          >
            <td
              class="w-5 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ category.id }}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ category.name }}
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ moment(category.created_at).format("DD-MM-YYYY") }}
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <router-link
                :to="'/update/category' + category.id"
                class="text-blue-400 hover:text-blue-600 underline"
                >Edit</router-link
              >
              <button
                class="text-red-400 hover:text-red-600 underline pl-6"
                @click="removeCategory(category.id)"
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
      categories: [],
      moment: moment,
      isOpenModal: false,
      token: localStorage.getItem("token"),
    };
  },
  created() {
    const api = this.$store.state.UrlServe + "/categories";
    axios
      .get(api)
      .then((response) => {
        this.categories = response.data.data;
        console.log(response);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    onClickOutside(event) {
      console.log("Clicked outside. Event: ", event);
    },
    removeCategory(id) {
      const api = this.$store.state.UrlServe + "/categories/" + id;
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
