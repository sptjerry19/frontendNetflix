<template>
  <div class="bg-zinc-900 min-h-full">
    <NavbarView />
    <div class="pt-40">
      <div class="min-h-screen flex items-center justify-center">
        <div class="flex flex-col bg-white rounded p-4 w-full max-w-xs">
          <div class="font-bold text-xl">{{ city }}</div>
          <div class="text-sm text-gray-500">{{ date }}</div>
          <div
            class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24"
          >
            <svg
              class="w-32 h-32"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              ></path>
            </svg>
          </div>
          <div class="flex flex-row items-center justify-center mt-6">
            <div class="font-medium text-6xl">{{ currenttemp - 273 }} °</div>
            <div class="flex flex-col items-center ml-6">
              <div>Cloudy</div>
              <div class="mt-1">
                <span class="text-sm"
                  ><i class="far fa-long-arrow-up"></i
                ></span>
                <span class="text-sm font-light text-gray-500"
                  >{{ maxtemp - 273 }}°C</span
                >
              </div>
              <div>
                <span class="text-sm"
                  ><i class="far fa-long-arrow-down"></i
                ></span>
                <span class="text-sm font-light text-gray-500"
                  >{{ mintemp - 273 }} °C</span
                >
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-between mt-6">
            <div class="flex flex-col items-center">
              <div class="font-medium text-sm">Wind</div>
              <div class="text-sm text-gray-500">{{ wind }} k/h</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="font-medium text-sm">Humidity</div>
              <div class="text-sm text-gray-500">{{ humidity }} %</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="font-medium text-sm">Visibility</div>
              <div class="text-sm text-gray-500">10km</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavbarView from "./NavbarView.vue";
</script>

<script>
import axios from "axios";
export default {
  data() {
    return {
      city: "VietNam",
      date: "",
      weather: "",
      currenttemp: "",
      maxtemp: "",
      mintemp: "",
      wind: "",
      humidity: "",
      visibility: "",
    };
  },
  created() {
    setInterval(
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?lat=9.6970387&lon=-75.61609832592933&appid=1b3d57ebe410a34ccb74c116bbf2832a"
        )
        .then((response) => {
          const weatherData = response.data;
          console.log(response.data);
          this.city = weatherData.name;
          this.weather = weatherData.weather.main;
          this.currenttemp = Math.floor(weatherData.main.temp);
          this.maxtemp = Math.floor(weatherData.main.temp_max);
          this.mintemp = Math.floor(weatherData.main.temp_min);
          this.wind = weatherData.wind.speed;
          this.humidity = weatherData.main.humidity;
          this.visibility = weatherData.visibility;
        })
        .catch((error) => {
          console.log(error);
        }),
      60000
    );
  },
};
</script>
