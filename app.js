const App = {
    data() {
        return {
            apiKey: '8c8e1a50-6322-4135-8875-5d40a5420d86',
            apiTop: 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1',
            apiSearch: 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=',
            movies: null,
            inputValue: ''
        }
    },
    mounted() {  
        this.getMovies(this.apiTop);
    },
    methods: {
        async getMovies(url) {
            const resp = await fetch(url, {
              headers: {
                "Content-Type": "application/json",
                "X-API-KEY": this.apiKey,
              },
            });
            const {films} = await resp.json();

            this.movies = films;
          },
        submitHandler() {
            const apiSearchUrl = `${this.apiSearch}${this.inputValue}`;

            if (this.inputValue) {
                this.getMovies(apiSearchUrl);
            
                this.inputValue = "";
              }
        }
    },
    components: {
        'app-movie': {
            props: ['nameru', 'posterpreview', 'genres', 'rating'],
            emits: [],
            template: `
                <div class="movie">
                    <div class="movie__cover-inner">
                        <img
                        :src="posterpreview"
                        class="movie__cover"
                        alt=""
                        />
                        <div class="movie__cover--darkened"></div>
                    </div>
                    <div class="movie__info">
                        <div class="movie__title">{{nameru}}</div>
                        <div class="movie__category">
                            {{getGenres(genres)}}
                        </div>
                        <div class="movie__average" :class="getClassByRate(getRating(rating))">{{getRating(rating)}}</div>
                    </div> 
                </div>
            `,
            methods: {
                getGenres(el) {
                    return el.map((genre) => genre.genre).join(', ');
                },
                getRating(vote) {
                    if (vote[vote.length - 1] === '%') {
                        vote = vote.slice(0, -1);
                    }

                    if (vote >= 10) {
                        return vote = (vote * 0.1).toFixed(1);
                    } else if (vote === 'null') {
                        return 'б/р';
                    } else return vote;  

                },
                getClassByRate(vote) {
                    if (vote >= 7) {
                      return "movie__average--green";
                    } else if (vote > 5) {
                      return "movie__average--orange";
                    } else {
                      return "movie__average--red";
                    }
                  }
            }
        }
    }
};




Vue.createApp(App).mount('#app');



