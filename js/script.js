"use strict";

let numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");

let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

let oneLastFilm;
let rateOfOneLastFilm;
let numberOfRateFilms = 0;

for (let i = 0, numberOfRateFilmsTemp = numberOfRateFilms; 
    i < numberOfFilms - numberOfRateFilmsTemp; i++) {
    
    oneLastFilm = prompt("Один из последних просмотренных фильмов?", "");
    rateOfOneLastFilm = prompt("На сколько оцените его?", 
    "\"000\" для выхода", "");
    if ((oneLastFilm || rateOfOneLastFilm) === "000") {
        break;
    }
    personalMovieDB.movies[oneLastFilm] = rateOfOneLastFilm;
    numberOfRateFilms++;
}

console.log(personalMovieDB);
