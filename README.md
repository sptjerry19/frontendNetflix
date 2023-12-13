# Frontend Netflix Clone
A simple [Netflix](https://netflix.com) clone based on Vue powered by [Laravel](https://laravel.com/).
Link Backend: https://github.com/sptjerry19/backendNetflix

## Live Demo
Link: https://master--demonetflixjerry.netlify.app/
![Screenshot 2023-12-13 224343](https://github.com/sptjerry19/frontendNetflix/assets/95573836/6d15d33c-ce2a-49ad-9da6-67a7df2ed88d)
![Screenshot 2023-12-13 224857](https://github.com/sptjerry19/frontendNetflix/assets/95573836/76ca165a-c9e4-49df-9d9b-272672d3d655)
![Screenshot 2023-12-13 223219](https://github.com/sptjerry19/frontendNetflix/assets/95573836/b23e3029-64cb-4fec-aa00-c39a2992341c)
![Screenshot 2023-12-13 223928](https://github.com/sptjerry19/frontendNetflix/assets/95573836/4ce21276-1974-47bb-9490-79f14d9d45ba)
![Screenshot 2023-12-13 224036](https://github.com/sptjerry19/frontendNetflix/assets/95573836/e604255b-9561-47ab-bc53-3490d4bb23ac)


## Tech stack
* [Vue](https://github.com/vuejs/vue)
* [Vuex](https://github.com/vuejs/vuex)
* [Vue Router](https://github.com/vuejs/vue-router)
* [Laravel](https://github.com/sptjerry19/backendNetflix)
* [Axios](https://axios-http.com/)

## Features
- [x] Authentication
  - [x] Sign up
  - [x] Sign in
  - [x] Logout
  - [x] Admin Page
  - [x] CRUD (films, songs, categories, genres) + Relation ship
- [x] Movies
  - [x] Search movies
  - [x] watch movies
  - [x] List of movies by category
  - [x] List of movies with pagination
  - [x] List of IMDB with views
  - [x] Detailed information about the movie
  - [x] Fully responsive movie slider
  - [x] Add movie to "Favorites"
- [x] Songs
  - [x] Search Songs
  - [x] Play Songs
  - [x] List of songs by genre
  - [x] List of songs with pagination
  - [x] Detailed information about the song
  - [x] Fully responsive movie slider
  - [x] Add song to "Favorites"
- [x] Responsive

## Configuration
To use this project with Laravel authentication, some configuration steps are required.
Clone project Laravel after migrate Database at [laravel](https://github.com/sptjerry19/backendNetflix).

### installation
install composer:
```shell
composer install
```
then run migrate databse:
```shell
php artisan migrate
```
run serve:
```shell
php artisan serve
```

## Installation
Clone project:
```shell
https://github.com/sptjerry19/frontendNetflix.git
```

Then change into that folder:
```shell
cd frontendNetflix
```

Install project dependencies:
```shell
npm install
```
Build for developer:
```shell
npm run dev
```

Build for production and preview:
```shell
npm run build && npm run preview
```

Start up a local server:
```shell
npm run serve
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## License  <a href="https://github.com/approxipix/vue-netflix-clone/blob/master/LICENSE"><img src="https://img.shields.io/github/license/elangosundar/awesome-README-templates?color=2b9348" alt="License Badge"/></a>
This project is licensed under the MIT License. See the [LICENSE](https://github.com/approxipix/vue-netflix-clone/blob/master/LICENSE) file for more information.
