<template>
  <!-- <div class="container">
    <div class="main-container">
      <div class="main-container-left">
        <div class="mainVideo-infos">
          <div class="imgaciklama">
            <img :src="database[randomNumber].logo" alt="" />
            <div class="description">
              <p>{{ database[randomNumber].videoDescription }}</p>
            </div>
          </div>
          <div class="buttons">
            <router-link
              :to="{ path: '/watch', query: { id: database[randomNumber].id } }"
              class="play"
              ><i class="fas fa-play"></i>Oynat</router-link
            >
            <router-link :to="{ query: { id: database[randomNumber].id } }">
              <div class="dahaFazlaBilgi" @click="dahafazlabilgi">
                <i class="bi bi-info-circle"></i>
                <p>Daha Fazla Bilgi</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="main-container-right">
        <div class="muted">
          <div class="iconDiv" @click="sesFonksiyon">
            <i :class="mutedControl ? mutedClass : mutedClassActive"></i>
          </div>
        </div>
        <div class="fixedAge">
          <p>{{ database[randomNumber].age }}+</p>
        </div>
      </div>
    </div>

    <div class="mobile">
      <img :src="database[randomNumber].logo" alt="" />
      <div class="description">
        <p>
          Guadalajara Karteli'nin yükselişinin gerçek öyküsünü anlatan bu yeni
          ve cesur Narcos hikâyesinde, Meksika'daki uyuşturucu savaşının
          1980'lerdeki doğuşuna tanıklık edin.
        </p>
      </div>

      <div rel="peload" class="buttons">
        <router-link
          :to="{ path: '/watch', query: { id: database[randomNumber].id } }"
          class="play"
          ><i class="fas fa-play"></i>Oynat</router-link
        >
        <router-link :to="{ query: { id: database[randomNumber].id } }">
          <div class="dahaFazlaBilgi" @click="dahafazlabilgi">
            <i class="bi bi-info-circle"></i>
            <p>Daha Fazla Bilgi</p>
          </div>
        </router-link>
      </div>

      <div class="main-container-right">
        <div class="muted">
          <div class="iconDiv" @click="sesFonksiyon">
            <i :class="mutedControl ? mutedClass : mutedClassActive"></i>
          </div>
        </div>
        <div class="fixedAge">
          <p>{{ database[randomNumber].age }}+</p>
        </div>
      </div>
    </div>

    <div class="top-shadow">
      <img src="https://i.ibb.co/ts2rccj/top-Header-shadow.png" alt="" />
    </div>
    <div class="bottom-shadow">
      <img src="https://i.ibb.co/82JvkhQ/main-Video-bottom-shadow.png" alt="" />
    </div>
    <video
      id="bigVideo"
      ref="bigVideo"
      :current-time.prop="currentTime"
      autoplay
      :muted="mutedControl"
      loop
      :src="database[randomNumber].videosrc"
      playsinline
    ></video>
  </div> -->
  <h1>big video</h1>
</template>

<script>
import axios from "axios";

export default {
  //   props: ["database", "selectType"],
  data() {
    return {
      index: null,
      mutedClass: "fas fa-volume-mute",
      mutedClassActive: "fas fa-volume-up",
      mutedControl: true,
      videoPlayerControl: true,
      currentTime: null,
      popupLastStatus: false,
      randomNumber: 2,
    };
  },
  methods: {
    dahafazlabilgi() {
      this.$store.state.popup = true;
      this.$refs["bigVideo"].pause();
    },
    sesFonksiyon() {
      this.$store.state.cardSound = !this.$store.state.cardSound;
    },
  },
  //   mounted() {
  //     this.videoPlayerControl = this.$store.getters["getBigVideoPlayerControl"];

  //     if (this.$store.state.popup == true) {
  //       this.$refs["bigVideo"].pause();
  //     }

  //     setTimeout(() => {
  //       document.querySelector(".description").style.opacity = "0";
  //       document.querySelector(".description").style.marginTop = "18vw";
  //       document.querySelector(".imgaciklama").children[0].style.marginTop =
  //         "8vw";
  //       document.querySelector(".imgaciklama").children[0].style.width = "25%";
  //     }, 10000);
  //   },
  //   created() {
  //     if (this.selectType == "all") {
  //       var newData = this.database;
  //       this.database = newData;
  //     } else if (this.selectType == "Film" || this.selectType == "Dizi") {
  //       var newData = this.database.filter(
  //         (item) => item.type == this.selectType
  //       );
  //       this.database = newData;
  //     }

  //     var rastgelesayı = Math.floor(Math.random() * this.database.length);
  //     this.randomNumber = rastgelesayı;

  //     this.mutedControl = this.$store.state.cardSound;
  //     this.$store.state.bigVideoPlayerControl = true;
  //   },
  //   watch: {
  //     "$store.state.bigVideoPlayerControl"() {
  //       var veri = this.$store.state.bigVideoPlayerControl;
  //       if (veri == false) {
  //         //card tarafından duraklatma
  //         this.$refs["bigVideo"].pause();
  //       } else {
  //         this.$refs["bigVideo"].play();
  //       }
  //     },
  //     "$store.state.cardSound"() {
  //       this.mutedControl = this.$store.state.cardSound;
  //     },
  //     $route(gelenVeri) {
  //       if (
  //         gelenVeri.fullPath == "/browse" ||
  //         gelenVeri.fullPath == "/diziler" ||
  //         gelenVeri.fullPath == "/filmler"
  //       ) {
  //         this.$refs["bigVideo"].play();
  //       } else if (this.$route.query.id == this.database[this.randomNumber].id) {
  //         //popup duraklatma
  //         this.$refs["bigVideo"].pause();
  //       }
  //     },
  //     "$store.state.popup"(gelenveri) {
  //       if (gelenveri == false) {
  //         this.$refs["bigVideo"].play();
  //       }
  //       this.popupLastStatus = this.$store.state.popup;
  //     },
  //   },
};
</script>
