const apiKey = '2792913d-ef62-4c84-8568-a4930878ee14';
const apiUrlTop = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1';
const apiUrlSearch = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const comedi = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=13&order=NUM_VOTE&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1'
const horror = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=17&order=NUM_VOTE&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1'
const fantasy = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=12&order=NUM_VOTE&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1'
const triller = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=1&order=RATING&type=FILM&ratingFrom=5&ratingTo=10&yearFrom=1900&yearTo=3000&page=1'
const detective = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=5&order=RATING&type=FILM&ratingFrom=5&ratingTo=10&yearFrom=1900&yearTo=3000&page=1'
const cartoon = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=18&order=RATING&type=FILM&ratingFrom=5&ratingTo=10&yearFrom=1900&yearTo=3000&page=1'
const action = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=1&genres=11&order=NUM_VOTE&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=1'

// подключение апи
 getMovies(horror);

async function getMovies(url) {
    const res = await fetch (url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey
        }
    });
    const resData = await res.json();
    showMovies(resData);
}

// смена цвета от рейтинга
const getClassRating = (vote) => {
    if (vote >=7) {
        return "green"
    } else if (vote >5) {
        return "orange"
    } else {
        return "red"
    }
}

// отобразить карточки фильмов
const showMovies = (data) => {
    const moviesElements = document.querySelector('.movies-cards');
    document.querySelector('.movies-cards').innerHTML = "";

    data.items.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="movie-cover-block">
            <img class="movie-cover" src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
            <div class="movie-darkness"></div>
        </div>
        <div class="movie-info">
            <div class="movie-title"> ${movie.nameRu}</div>
            <div class="movie-category"> ${movie.genres.map(
                (genre) => ` ${genre.genre}`
                )}</div>
            <div class="movie-rating movie-rating--${getClassRating(movie.ratingImdb)}">${movie.ratingImdb}</div>
        </div>
        `;
        
        moviesElements.appendChild(movieEl);
    });
}

// смена жанра 
const buttonsGenge = document.querySelector('.nav-movies')
const changeGenge = (event) => {
    if(event.target.classList.contains('horror')) {
         getMovies(horror)
    } else if(event.target.classList.contains('triller')) {
        getMovies(triller)
   } else if(event.target.classList.contains('fantasy')) {
    getMovies(fantasy)
    } else if(event.target.classList.contains('action')) {
        getMovies(action) 
   }  else if(event.target.classList.contains('detective')) {
    getMovies(detective)
} else if (event.target.classList.contains('cartoon')) {
    getMovies(cartoon)
} else {
    getMovies(comedi)
}
} 
buttonsGenge.addEventListener('click', changeGenge);

// смена кнопки жанра
const activeBtn = document.querySelectorAll('.item');

const hideElement = (element) => {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    }
  }
  const showElement = (element) => {
    if (!element.classList.contains('active')) {
        element.classList.add('active');
    }
  }
const changeClassActive = (event) => {
  let element = event.target;

  activeBtn.forEach(item => hideElement(item));
  showElement(element);
}
activeBtn.forEach(item => {
  item.addEventListener('click', (event) => {
    changeClassActive(event)
    })
  })

// поиск

async function getSearch(url) {
    const res = await fetch (url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey
        }
    });
    const resData = await res.json();
    showSearch(resData);
}
const showSearch = (data) => {
    const moviesElements = document.querySelector('.movies-cards');
    document.querySelector('.movies-cards').innerHTML = "";

    data.films.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="movie-cover-block">
            <img class="movie-cover" src="${movie.posterUrlPreview}" alt="${movie.nameRu}">
            <div class="movie-darkness"></div>
        </div>
        <div class="movie-info">
            <div class="movie-title"> ${movie.nameRu}</div>
            <div class="movie-category"> ${movie.genres.map(
                (genre) => ` ${genre.genre}`
                )}</div>
            <div class="movie-rating movie-rating--${getClassRating(movie.rating)}">${movie.rating}</div>
        </div>
        `;
        
        moviesElements.appendChild(movieEl);
    });
}

const form = document.querySelector('form');
const search = document.querySelector('.header-search');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const apiSearchUrl = `${apiUrlSearch}${search.value}`
    if (search.value) {
        getSearch(apiSearchUrl)
    }
})
