"use strict";

let numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", ""),

    //База данных пользователя
    personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
    },

    oneLastFilm, //Имя просмотренного фильма
    rateOfOneLastFilm, //Оценка данного фильма
    numberOfRateFilms = 0; //Количество оцененных фильмов

//Опрос пользователя по просмотренным фильмам с сохранением в базу пользователя
//Количество итераций равно разнице между количествами 
//просмотренных и оценных фильмов
out1: for (let i = 0, numberOfRateFilmsTemp = numberOfRateFilms; 
i < numberOfFilms - numberOfRateFilmsTemp; i++) {
    
    //Наглядное зацикливание итерации до получения удовлетворительного ответа
    out2: while (true) { 

        oneLastFilm = prompt("Один из последних просмотренных фильмов?", "");
        rateOfOneLastFilm = prompt("На сколько оцените его?", "")
        
        //Прерывание опроса для собственных нужд
        if ( (oneLastFilm || rateOfOneLastFilm) === "000" ) {
            break out1;
        }
        
        //Отладка выполнения условий
        //console.log(oneLastFilm === null);
        //console.log( oneLastFilm === null || oneLastFilm == "" );

        switch (true) {
            //Проверка названия на отмену ввода, пустую строку и строку 
            //из пробелов
            case ( oneLastFilm === null || rateOfOneLastFilm === null || 
                oneLastFilm == "" || /^\s+$/.test(oneLastFilm) ):
                alert("Необходимо указать все фильмы");
                //Повторные названия в счетчике не учтены
                break;

            //Проверка на длину названия
            case oneLastFilm.length > 50:
                alert("Не более 50 символов.");
                break;
                
            default:
                //Проверка пройдена, удовлетворительный ответ получен
                //добавление фильма в базу с названием в ключе объекта 
                //и оценкой в значении
                //Увеличение счетка оцененных фильмов
                //Завершение зацикленной итерации
                personalMovieDB.movies[oneLastFilm] = rateOfOneLastFilm;
                numberOfRateFilms++;
                break out2;                
        }
        
    }
    
}

/*
3) При помощи условий проверить  personalMovieDB.count, и если он меньше 10 - 
вывести сообщение
"Просмотрено довольно мало фильмов", если от 10 до 30 - "Вы классический 
зритель", а если больше - 
"Вы киноман". А если не подошло ни к одному варианту - "Произошла ошибка"
*/

switch (true) {
    default:
    case isNaN(personalMovieDB.count):
        alert("Произошла ошибка");
        break;
    case personalMovieDB.count < 10:
        alert("Просмотрено довольно мало фильмов");
        break;
    case personalMovieDB.count <= 30:
        alert("Вы классический зритель");
        break;
    case personalMovieDB.count > 30:
        alert("Вы киноман");
}


console.log(personalMovieDB);
