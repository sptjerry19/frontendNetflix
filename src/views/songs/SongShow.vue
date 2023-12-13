<template>
  <div class="flex flex-col min-h-full items-center justify-center bg-zinc-900">
    <NavbarView />
    <div class="mt-20 w-full sm:w-2/3">
      <div
        class="bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8 items-center"
      >
        <div class="flex items-center space-x-4">
          <img
            :src="$store.state.urlStorage + song.image"
            alt=""
            class="flex-none rounded-lg w-20 h-20 bg-slate-100 object-cover"
            loading="lazy"
          />
          <div class="min-w-0 flex-auto space-y-1 font-semibold">
            <p class="text-cyan-500 dark:text-cyan-400 text-sm leading-6">
              <abbr title="Track">Track:</abbr> {{ song.id }}
            </p>
            <h2
              class="text-slate-500 dark:text-slate-400 text-sm leading-6 truncate"
            >
              Music: {{ song.name }}
            </h2>
            <p class="text-slate-900 dark:text-slate-50 text-lg">
              {{ song.singer_name }}
            </p>
          </div>
        </div>
        <div class="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            v-model="volume"
            class="bg-cyan-500 dark:bg-cyan-400 h-2 rounded-full overflow-hidden"
          />
          <div class="relative">
            <input
              type="range"
              min="0"
              :max="duration"
              v-model="currentTime"
              class="bg-cyan-500 dark:bg-cyan-400 w-full h-2 rounded-full overflow-hidden"
            />
          </div>
          <div
            class="flex justify-between text-sm leading-6 font-medium tabular-nums"
          >
            <div class="text-cyan-500 dark:text-slate-100">
              {{ formatTime(currentTime) }}
            </div>
            <div class="text-slate-500 dark:text-slate-400">
              {{ formatTime(duration) }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center"
      >
        <div class="flex-auto flex items-center justify-evenly">
          <button type="button" aria-label="Add to favorites">
            <svg width="24" height="24">
              <path
                d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            class="hidden sm:block lg:hidden xl:block"
            aria-label="Previous"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="m10 12 8-6v12l-8-6Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 6v12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button type="button" aria-label="Rewind 10 seconds">
            <svg width="24" height="24" fill="none">
              <path
                d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 5v3.111c0 .491.398.889.889.889H9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <button
          v-if="isPlay"
          type="button"
          class="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
          aria-label="Pause"
          @click.prevent="playSound()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        </button>
        <button
          v-else
          type="button"
          class="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
          aria-label="play"
          @click.prevent="stopSound()"
        >
          <svg width="30" height="32" fill="currentColor">
            <rect x="6" y="4" width="4" height="24" rx="2" />
            <rect x="20" y="4" width="4" height="24" rx="2" />
          </svg>
        </button>
        <div class="flex-auto flex items-center justify-evenly">
          <button
            type="button"
            aria-label="Skip 10 seconds"
            @click="skipForward()"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 5v3.111c0 .491-.398.889-.889.889H15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            class="hidden sm:block lg:hidden xl:block"
            aria-label="Next"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M14 12 6 6v12l8-6Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 6v12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            class="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500"
            @click="speedSong = 2"
            v-if="speedSong === 1"
          >
            1x
          </button>
          <button
            type="button"
            class="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500"
            @click="speedSong = 1"
            v-if="speedSong === 2"
          >
            2x
          </button>
        </div>
      </div>
    </div>

    <!-- play list -->
    <div class="w-full sm:w-2/3 flex flex-col py-5 max-h-1/2">
      <div class="border-b pb-1 flex justify-between items-center mb-2">
        <span class="text-base font-semibold uppercase text-gray-700">
          play list</span
        >
        <img
          class="w-4 cursor-pointer"
          src="https://p.kindpng.com/picc/s/152-1529312_filter-ios-filter-icon-png-transparent-png.png"
        />
      </div>
      <div class="overflow-y-auto">
        <div
          v-for="music in songs"
          :key="music.id"
          :class="{
            'bg-slate-400': id === music.id,
          }"
          class="snap-start"
          @click="changeSong(music.id)"
        >
          <router-link :to="'/songs/' + music.id">
            <div
              class="flex border-b py-3 cursor-pointer hover:shadow-md px-2 hover:shadow-gray-400"
            >
              <img
                class="w-10 h-10 object-cover rounded-lg"
                alt="User avatar"
                :src="$store.state.urlStorage + music.image"
              />
              <div class="flex flex-col px-2 w-full">
                <span
                  class="text-sm text-red-500 capitalize font-semibold pt-1"
                >
                  {{ music.name }}
                </span>
                <span class="text-xs text-gray-500 uppercase font-medium">
                  -{{ music.singer_name }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavbarView from "../NavbarView.vue";
</script>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: Number(this.$route.params.id),
      audio: null,
      song: {},
      songs: [],
      genres: [],
      volume: 50,
      duration: 0,
      currentTime: 0,
      seekTime: 0,
      isPlay: true,
      currenSong: 0,
      speedSong: 1,
    };
  },
  created() {
    axios
      .get(this.$store.state.UrlServe + "/songs/" + this.$route.params.id)
      .then((response) => {
        // console.log(response.data[0]);
        this.song = response.data[0];
        this.audio = new Audio(
          this.$store.state.urlStorage + response.data[0].audio
        );
        console.log(this.audio);
        this.audio.addEventListener("canplay", () => {
          this.duration = this.audio.duration;
          this.playSound();
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(this.$store.state.UrlServe + "/genres/")
      .then((response) => {
        // console.log(response);
        this.genres = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(this.$store.state.UrlServe + "/songs/")
      .then((response) => {
        // console.log(response);
        this.songs = response.data;
        this.songs.forEach((song, index) => {
          if (song.id === this.id) {
            this.currenSong = index;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    playSound() {
      this.isPlay = false;
      this.audio.play();
      this.audio.addEventListener("timeupdate", () => {
        this.audio.volume = (this.volume / 100).toFixed(2);
        this.changeSpeed();
        this.currentTime = this.audio.currentTime;
        // this.audio.currentTime = this.seekTime;
        if (this.currentTime >= this.duration) {
          this.currenSong++;
          if (this.currenSong > this.songs.length) {
            this.currenSong = 0;
          }
          this.id = this.songs[this.currenSong].id;
          this.changeSong(this.id);
        }
      });
    },
    stopSound() {
      this.isPlay = true;
      this.audio.pause();
    },
    changeSong(id) {
      axios
        .get(this.$store.state.UrlServe + "/songs/" + id)
        .then((response) => {
          // console.log(response.data[0]);
          this.audio.pause();
          this.isPlay = true;
          this.song = response.data[0];
          this.id = this.song.id;
          this.audio = new Audio(
            this.$store.state.urlStorage + response.data[0].audio
          );
          this.audio.addEventListener("canplay", () => {
            this.currentTime = this.audio.currentTime;
            this.duration = this.audio.duration;
            this.playSound();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeSpeed() {
      this.audio.playbackRate = this.speedSong;
    },
    formatTime(time) {
      const minute = Math.floor(time / 60);
      const second = Math.floor(time % 60);
      return minute + ":" + second;
    },
    skipForward() {
      this.audio.currentTime += 10;
      this.playSound();
    },
    setVolume() {
      return (this.audio.volume = this.volume);
    },
  },
  unmounted() {
    this.audio.pause();
    delete this.audio;
  },
};
</script>
