/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

console.log(document.querySelector('.promo__bg').style.background);
document.querySelector('.promo__adv').remove();
document.querySelector('.promo__content').style.width = "100%";
document.querySelector('.promo__genre').textContent = "ДРАМА";
document.querySelector('.promo__bg').style.cssText = 
    "background: url('../img/bg.jpg') center center/cover no-repeat";  
movieDB.movies.sort();
document.querySelectorAll('.promo__interactive-item').forEach ((item, i) => {
    item.textContent = `${i+1}. ${movieDB.movies[i]}`;
});

