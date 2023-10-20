<template>
  <div>
    <div
      class="h-screen flex justify-center items-center bg-cover bg-center"
      style="
        background-image: linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)),
          url('https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/2fe6e3c0-5613-4625-a0c1-3d605effd10b/IN-en-20210607-popsignuptwoweeks-perspective_alpha_website_large.jpg');
      "
    >
      <div class="absolute top-0 left-0 mt-5 ml-5">
        <svg viewBox="0 0 111 30" fill="#e50914" class="w-28" focusable="false">
          <g id="netflix-logo">
            <path
              d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
              id="Fill-14"
            ></path>
          </g>
        </svg>
      </div>

      <div class="space-y-5">
        <p class="text-white font-bold text-5xl flex flex-col items-center">
          <span>Unlimited movies, TV <br /></span>
          <span> shows and more. </span>
        </p>
        <p class="text-white font-semibold text-3xl flex flex-col items-center">
          Watch anywhere. Cancel anytime.
        </p>
        <p class="text-white text-lg flex flex-col items-center">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div class="flex flex-row items-center justify-center">
          <router-link to="/home">
            <button
              class="p-4 w-96 text-l font-semibold bg-red-600 hover:bg-red-700 text-white"
            >
              Get Started >
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <hr />
    <div class="h-screen flex items-center justify-center bg-black p-5">
      <div class="space-y-5 p-5">
        <p class="text-white font-bold text-4xl">Enjoy on your TV.</p>
        <p class="text-white font-semiboldbold text-xl">
          Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
          players and more.
        </p>
      </div>
      <div>
        <img
          alt="TV"
          src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
        />
      </div>
    </div>
    <hr />
    <div class="h-screen flex items-center justify-center bg-black p-5">
      <div>
        <img
          alt=""
          class="our-story-card-img"
          src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
          data-uia="our-story-card-img"
        />
      </div>
      <div class="space-y-5">
        <p class="text-white font-bold text-4xl">
          Download your shows to watch offline.
        </p>
        <p class="text-white font-semiboldbold text-xl">
          Save your favourites easily and always have something to watch.
        </p>
      </div>
    </div>
    <hr />
    <div class="h-screen flex items-center justify-center bg-black p-5">
      <div class="space-y-5 p-5">
        <p class="text-white font-bold text-4xl">Watch everywhere.</p>
        <p class="text-white font-semiboldbold text-xl">
          Stream unlimited movies and TV shows on your phone, tablet, laptop,
          and TV.
        </p>
      </div>
      <div>
        <img
          alt=""
          class="our-story-card-img"
          src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-in.png"
          data-uia="our-story-card-img"
        />
      </div>
    </div>
    <hr />
    <div class="h-screen flex items-center justify-center bg-black p-5">
      <div class="p-5">
        <img
          alt=""
          class="our-story-card-img"
          src="https://occ-0-5556-3662.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABVxdX2WnFSp49eXb1do0euaj-F8upNImjofE77XStKhf5kUHG94DPlTiGYqPeYNtiox-82NWEK0Ls3CnLe3WWClGdiJP.png?r=5cf"
          data-uia="our-story-card-img"
        />
      </div>
      <div class="space-y-5">
        <p class="text-white font-bold text-4xl">
          Create profiles for children.
        </p>
        <p class="text-white font-semiboldbold text-xl">
          Send children on adventures with their favourite characters in a space
          made just for them—free with your membership.
        </p>
      </div>
    </div>
    <hr />
    <div class="min-h-screen bg-black space-y-10">
      <p class="p-5 text-white font-bold text-5xl flex justify-center">
        Frequently Asked Questions
      </p>
      <div class="space-y-5 flex flex-col justify-center items-center">
        <div class="p-5 bg-[#303030] w-3/4">
          <p class="text-3xl text-white">What is Netflix ?</p>
        </div>
        <div class="p-5 bg-[#303030] w-3/4">
          <p class="text-3xl text-white">How much does Netflix cost ?</p>
        </div>
        <div class="p-5 bg-[#303030] w-3/4">
          <p class="text-3xl text-white">Where can I watch ?</p>
        </div>
        <div class="p-5 bg-[#303030] w-3/4">
          <p class="text-3xl text-white">Is Netflix good for kids ?</p>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>
