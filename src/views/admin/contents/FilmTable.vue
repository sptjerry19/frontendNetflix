<template>
  <div class="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] w-40">
    <div class="px-6 pt-6 2xl:container">
      <table class="border-collapse">
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
              image
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              vieo
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              title
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              over_view
            </th>
            <th
              class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
            >
              category_id
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
            v-for="film in films"
            :key="film.id"
          >
            <td
              class="w-5 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ film.id }}
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <img
                class="h-44 w-full object-cover transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
                :src="'http://localhost:8000/storage/' + film.image"
                style="filter: grayscale(0)"
              />
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span class="rounded bg-red-400 py-1 px-3 text-xs font-bold">{{
                film.video
              }}</span>
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ film.title }}
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ film.over_view }}
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              {{ film.category_id }}
            </td>
            <td
              class="w-1/6 lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <a href="#" class="text-blue-400 hover:text-blue-600 underline"
                >Edit</a
              >
              <a
                href="#"
                class="text-blue-400 hover:text-blue-600 underline pl-6"
                >Remove</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      films: [],
    };
  },
  created() {
    const api = this.$store.state.UrlServe + "/films";
    console.log(api);
    axios
      .get(api, {
        params: { a: this.$route.query.a },
      })
      .then((response) => {
        this.films = response.data.data;
        console.log(this.films);
      })
      .catch(() => console.log(console.error()));
  },
};
</script>
