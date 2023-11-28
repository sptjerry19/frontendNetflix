<template>
  <Home />
  <SearchBar :name="$route.name" />
  <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
    <div class="px-6 pt-6 2xl:container">
      <ButtonTrans1Vue @click="isOpenModal = true" :name="'Create singer'" />
      <ModalFile
        v-click-outside="onClickOutside"
        v-if="isOpenModal"
        :table="'singers'"
        @closeModal="isOpenModal = false"
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
            v-for="singer in singers"
            :key="singer.id"
          >
            <td
              class="w-5 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ singer.id }}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ singer.name }}
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ moment(singer.created_at).format("DD-MM-YYYY") }}
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <router-link
                :to="'/update/singers/' + singer.id"
                class="text-blue-400 hover:text-blue-600 underline"
                >Edit</router-link
              >
              <button
                class="text-red-400 hover:text-red-600 underline pl-6"
                @click="removeSinger(singer.id)"
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
// import ModalForm from "../../../components/modals/modalForm.vue";
import ModalFile from "../../../components/modals/ModalFile.vue";
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
      singers: [],
      moment: moment,
      isOpenModal: false,
      token: localStorage.getItem("token"),
    };
  },
  created() {
    const api = this.$store.state.UrlServe + "/singers";
    axios
      .get(api)
      .then((response) => {
        this.singers = response.data.data;
        console.log(response);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    onClickOutside(event) {
      console.log("Clicked outside. Event: ", event);
    },
    removeSinger(id) {
      const api = this.$store.state.UrlServe + "/singers/" + id;
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
