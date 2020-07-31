"use strict";


let personalMovieDB = {
        count: 0,
        movies: {},
        actors: {},
        genres: [],
        privat: false,

        start: function() {
            let numberOfFilms;
            do {
                numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");
            } while (personalMovieDB.promptErrNumCheck(numberOfFilms));
            this.count += numberOfFilms;
        },

        rememberMyFilms: function() {
            console.log('rememberMyFilms', this);

            let numberOfRateFilms = Object.keys(this.movies).length,
                oneLastFilm, 
                rateOfOneLastFilm
            ;
            //Количество незаполненных фильмов итераций
            out1: for (let i = 0, temp = this.count - numberOfRateFilms; i < temp; i++) {
                oneLastFilm = personalMovieDB.promptWhile( 'Один из последних просмотренных фильмов?', 
                                [[personalMovieDB.promptErrCheck], [personalMovieDB.compare, '>', 50]], 
                                ['Необходимо указать все фильмы', 'Не более 50 символов в названии'] );
                const str = 'Укажите оценку от 1 до 10';
                rateOfOneLastFilm = personalMovieDB.promptWhile( 'На сколько оцените его?', 
                                        [[personalMovieDB.promptErrNumCheck], 
                                        [personalMovieDB.compare, '<', 1], [personalMovieDB.compare, '>', 10]],
                                        [str, str, str] ); 
                if (oneLastFilm in this.movies) {
                    i--;
                    alert(`Фильму "${oneLastFilm}" присвоена новая оценка`);
                }
                this.movies[oneLastFilm] = rateOfOneLastFilm;
                //this.count++;
            }
        },
        
        detectPersonalLevel: function() {
            switch (true) {
                default:
                case isNaN(this.count):
                    alert("Произошла ошибка");
                    break;
                case this.count < 10:
                    alert("Просмотрено довольно мало фильмов");
                    break;
                case this.count <= 30:
                    alert("Вы классический зритель");
                    break;
                case this.count > 30:
                    alert("Вы киноман");
            }
        },
        
        showMyDB: function() {
            if (!this.private) {
                console.log(this);
            }
        },
        
        writeYourGenres: function() {
            for (let i = 0; i < 3; i++) {
                this.genres[i] = prompt(`Ваш любимый жанр под номером ${i+1}`, '');
            }
        },

        toggleVisibleMyDB: function() {
            this.privat = !this.privat;
        },

        //accessory

        promptErrCheck: function (textVar) {
            return (textVar === null || textVar == "" || /^\s+$/.test(textVar));
        },
        
        promptErrNumCheck: function (numberVar) {
            console.log('promptErrNumCheck', this);
            return (personalMovieDB.promptErrCheck(numberVar) || isNaN(numberVar));
        },
        
        compare: function (compared, operation, reference) {
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
        },

        /**
         * Запрашивает данные вплоть до выполнения задданых условий, данные записываются в глобальную переменную fParam
         *
         * @param {String} text Выводимый в вопросе текст
         * @param {Array<Array<Function, String>>} verificationСonditions Перечень запретов в виде массива с массивами, 
         * содержащих функцию и значения ее параметров, начиная со второго, первым аргументом передается ответ пользователя.
         * @param {Array<String>} alerts Перечень выводимых предупреждений
         * @return {String} Ответ пользователя
         */
        promptWhile: function (text, verificationСonditions, alerts) {
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
        },
        
    }
;

personalMovieDB.start();
personalMovieDB.rememberMyFilms();
personalMovieDB.detectPersonalLevel();

console.log(personalMovieDB);
