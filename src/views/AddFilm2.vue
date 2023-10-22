<template>
  <div>
    <form @submit.prevent="uploadImage" method="POST">
      <input type="text" v-model="title" placeholder="Enter a title" />
      <input type="file" accept="image/*" @change="onFileChange" />
      <input type="text" v-model="video" placeholder="Enter a video" />
      <input type="text" v-model="over_view" placeholder="Enter a over_view" />
      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      image: null,
      video: "",
      over_view: "",
      views: 100,
      category_id: 1,
    };
  },
  methods: {
    onFileChange(e) {
      this.image = e.target.files[0];
    },
    uploadImage() {
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("image", this.image);
      formData.append("video", this.video);
      formData.append("over_view", this.over_view);
      formData.append("views", this.views);
      formData.append("category_id", this.category_id);

      console.log(formData.get("title"));

      // Use Axios to make the HTTP POST request to the API
      axios
        .post("http://127.0.0.1:8000/api/films", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          // Reset the form
          this.title = "";
          this.image = null;
          this.video = "";
          this.over_view = "";
          this.views = 100;
          this.category_id = 1;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
