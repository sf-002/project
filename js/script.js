"use strict";

let 
    numberOfFilms,
    //База данных пользователя
    personalMovieDB = {
    count: Number,
    movies: {},
    actors: {},
    genres: [],
    privat: false
    },
    oneLastFilm, //Имя просмотренного фильма
    rateOfOneLastFilm, //Оценка данного фильма
    numberOfRateFilms = 0 //Количество оцененных фильмов
    ;

function start() {
    console.log(`start() is started`);
    do {
        numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");
    } while (promptErrNumCheck(numberOfFilms));
    console.log(`finished start() with numberOfFilms = ${numberOfFilms}`);
}

const 
    promptErr = 0,
    promptErrNum = 0;

function promptErrCheck(textVar) {
    console.log(`promptErrCheck(${textVar}) is started `);
    return (textVar === null || textVar == "" || /^\s+$/.test(textVar));
}

function promptErrNumCheck(numberVar) {
    console.log(`promptErrNumCheck(${numberVar}) is started `);
    return (promptErrCheck(numberVar) || isNaN(numberVar));
}

function lengthF(str) {
    return str.length;
}

let fParam
    ;

/**
 * Запрашивает данные вплоть до выполнения задданых условий, данные записываются в глобальную переменную fParam
 *
 * @param {String} text Выводимый в вопросе текст
 * @param {Array<String>} verificationСonditions Перечень запретов в виде функций с параметром fParam
 * @param {Array<String>} alerts Перечень предупреждений
 * @return {String} Ответ пользователя
 */
function promptWhile(text, verificationСonditions, alerts) {
    //perr perrnum 
    console.log(`promptWhile(${text}, ${verificationСonditions}, ${alerts}) is started `);
    console.log(verificationСonditions);
    let temp,
        lenVC = verificationСonditions.length
    ;
    out11: while(true) { 
        console.log('while is started');
        fParam = prompt(text, "");
        for (let i = 0; i < lenVC; i++) {
            //let fName = verificationСonditions[i];
            //let VCFunc = eval(verificationСonditions[i]);
            //console.log(fParam, verificationСonditions[i], VCFunc);
            console.log(`for is started, ${i} iteration`);
            switch (true) {
                case eval(verificationСonditions[i]):
                    alert(alerts[i]);
                    console.log('case swithc, alert is true');
                    continue out11;
                default:
                    console.log('default switch');
                    break; 
            }
            console.log(`for is finished, ${i} iteration`);
        }
        break;
    } 
    console.log(`finished promptWhile() with return is ${fParam}`);
    return fParam;
}

//console.log( Object.keys({}).length);
function rememberMyFilms(DBName) {
    console.log(`rememberMyFilms(${DBName}) is started `);
//Данная функция проводит опрос пользователя на тему просмотренных фильмов вплоть до оценки всех неоценных фильмов 
//и выполнения предъявляемых требований к названию фильма и его оценке, сохраняя ответы в базе пользователя
    let numberOfRateFilms = Object.keys(DBName.movies).length;
    console.log(`numberOfRateFilms = ${numberOfRateFilms}`);
    //Количество незаполненных фильмов итераций
    out1: for (let i = 0, temp = numberOfFilms - numberOfRateFilms; i < temp; i++) {
        console.log(`for(i = 0; ${i} < ${temp}; i++)`);
        //Ввод названия фильма вплоть до выполнения требований к имени
        oneLastFilm = promptWhile('Один из последних просмотренных фильмов?', 
                        ['promptErrCheck(fParam)', 'lengthF(fParam) > 50'], 
                        ['Необходимо указать все фильмы', 'Не более 50 символов в названии']);
        console.log(`oneLastFilm = ${oneLastFilm}`);
        const str = 'Укажите оценку от 1 до 10';
        //Ввод оценки фильма вплоть до выполнения требований к имени
        rateOfOneLastFilm = promptWhile('На сколько оцените его?', 
                                ['promptErrNumCheck(fParam)', 'fParam < 1', 'fParam > 10'],
                                [str, str, str]); 
        console.log(`rateOfOneLastFilm = ${rateOfOneLastFilm}`);
        console.log(`oneLastFilm in DBName.movies is ${oneLastFilm} in ${DBName.movies} is',
                    (oneLastFilm in DBName.movies)`);
        //Проверка на повтор о оценках фильмов
        if (oneLastFilm in DBName.movies) {
            i--;
            alert(`Фильму "${oneLastFilm}" присвоена новая оценка`);
            console.log(oneLastFilm);
        }
        DBName.movies[oneLastFilm] = rateOfOneLastFilm;
        DBName.count++;
        console.log(`${i} iteration is finished`);
    }
    console.log(`finished rememberMyFilms(); DBname is ${DBName}`);
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

/*
3) При помощи условий проверить  personalMovieDB.count, и если он меньше 10 - 
вывести сообщение
"Просмотрено довольно мало фильмов", если от 10 до 30 - "Вы классический 
зритель", а если больше - 
"Вы киноман". А если не подошло ни к одному варианту - "Произошла ошибка"
*/
start();
if (prompt('rememberMyFilms', '') !== null) {
    rememberMyFilms(personalMovieDB);
}
detectPersonalLevel(personalMovieDB);



console.log(personalMovieDB);
