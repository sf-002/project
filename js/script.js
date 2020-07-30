"use strict";

let 
    numberOfFilms,
    personalMovieDB = {
    count: Number,
    movies: {},
    actors: {},
    genres: [],
    privat: false
    },
    oneLastFilm, 
    rateOfOneLastFilm, 
    numberOfRateFilms = 0 
    ;

function start() {
    do {
        numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");
    } while (promptErrNumCheck(numberOfFilms));
}

const 
    promptErr = 0,
    promptErrNum = 0;

function promptErrCheck(textVar) {
    return (textVar === null || textVar == "" || /^\s+$/.test(textVar));
}

function promptErrNumCheck(numberVar) {
    return (promptErrCheck(numberVar) || isNaN(numberVar));
}

//Не используется (была вырезана)
function lengthF(str) {
    return str.length;
}

function compare(compared, operation, reference){
    if (isNaN(compared)) {
        compared = compared.length;
    }
    switch (operation) {
        case '<':
            return (compared < reference);
        case '<=':
            return (compared <= reference);
        case '==':
            return (compared == reference);
        case '===':
            return (compared === reference);
        case '>=':
            return (compared >= reference);
        case '>':
            return (compared > reference);
        default:
            console.log('function "compare" accepted an unknow operator');
            return false;
    }
}

/**
 * Запрашивает данные вплоть до выполнения задданых условий, данные записываются в глобальную переменную fParam
 *
 * @param {String} text Выводимый в вопросе текст
 * @param {Array<Array<Function, String>>} verificationСonditions Перечень запретов в виде массива с массивами, 
 * содержащих функцию и значения ее параметров, начиная со второго, первым аргументом передается ответ пользователя.
 * @param {Array<String>} alerts Перечень выводимых предупреждений
 * @return {String} Ответ пользователя
 */
function promptWhile(text, verificationСonditions, alerts) {
    let 
        lengthVC = verificationСonditions.length,
        answer
    ;

    out1: while(true) { 
        answer = prompt(text, "");
        
        for (let i = 0; i < lengthVC; i++) {
            switch (true) {
                //verificationСonditions - массив из массивов. Каждый i-й элемент содержит массив-условие, 
                //нулевым элементом которого является проверяющая фунция, остальными - условия проверки ответа
                case verificationСonditions[i][0](answer, ...verificationСonditions[i].slice(1)):
                    alert(alerts[i]);
                    continue out1;
                default:
                    break; 
            }
        }

        break;
    } 
    return answer;
}


function rememberMyFilms(DBName) {
    let numberOfRateFilms = Object.keys(DBName.movies).length;
    //Количество незаполненных фильмов итераций
    out1: for (let i = 0, temp = numberOfFilms - numberOfRateFilms; i < temp; i++) {
        oneLastFilm = promptWhile( 'Один из последних просмотренных фильмов?', 
                        [ [promptErrCheck], [compare, '>', 50] ], 
                        ['Необходимо указать все фильмы', 'Не более 50 символов в названии'] );
        const str = 'Укажите оценку от 1 до 10';
        rateOfOneLastFilm = promptWhile( 'На сколько оцените его?', 
                                [ [promptErrNumCheck], [compare, '<', 1], [compare, '>', 10] ],
                                [str, str, str] ); 
        if (oneLastFilm in DBName.movies) {
            i--;
            alert(`Фильму "${oneLastFilm}" присвоена новая оценка`);
        }
        DBName.movies[oneLastFilm] = rateOfOneLastFilm;
        DBName.count++;
    }
}

function detectPersonalLevel(DBname) {
    switch (true) {
        default:
        case isNaN(DBname.count):
            alert("Произошла ошибка");
            break;
        case DBname.count < 10:
            alert("Просмотрено довольно мало фильмов");
            break;
        case DBname.count <= 30:
            alert("Вы классический зритель");
            break;
        case DBname.count > 30:
            alert("Вы киноман");
    }
}

function showMyDB(DBname) {
    if (!DBname.private) {
        console.log(DBname);
    }
}

function writeYourGenres(DBname) {
    for (let i = 0; i < 3; i++) {
        DBname.genres[i] = prompt(`Ваш любимый жанр под номером ${i+1}`, '');
    }
}

start();
if (prompt('rememberMyFilms', '') !== null) {
    rememberMyFilms(personalMovieDB);
}
detectPersonalLevel(personalMovieDB);



console.log(personalMovieDB);
