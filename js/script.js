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


console.log(document.querySelector('.add').querySelector('button'));

const 
    addForm = document.querySelector('.add'),
    addBtn = addForm.querySelector('button'),
    addFavoriteCheck = addForm.querySelector('input[type="checkbox"]'), //checked
    addNameOfFilm = addForm.querySelector('.adding__input')
    //deleteBtns = document.querySelectorAll('.delete')
;

function displayFilms() {
    movieDB.movies.sort();
    document.querySelectorAll('.promo__interactive-item').forEach ((item, i) => {
        item.firstChild.data = `${i+1}. ${movieDB.movies[i]} `;
    });
}

function rememberMyFilms(e) {
    e.preventDefault();
    let nameOfFilm = addNameOfFilm.value;
    if (nameOfFilm.length > 21) {
        movieDB.movies.push(nameOfFilm.slice(0, 22-3) + '...');
        
    } else {
        movieDB.movies.push(nameOfFilm);
    }
    movieDB.movies.sort();
    if (addFavoriteCheck.checked) {
        console.log('Добавляем любимый фильм');
    }
    displayFilms();
}

function deleteFilm(e) {
    //e.target.parentElement.textContent.slice(0, 1)
    console.log('click');
    console.log(e.target.parentElement.textContent.slice(0, 1) - 1);
    console.log(movieDB.movies);
    movieDB.movies.splice(e.target.parentElement.textContent.slice(0, 1) - 1, 1);
    
    //console.log(movieDB.movies.slice(e.target.parentElement.textContent.slice(0, 1) - 1, 1));
    displayFilms();
}

displayFilms();
addBtn.addEventListener('click', rememberMyFilms);
document.querySelectorAll('.delete').forEach((item, i) => {
    item.addEventListener('click', deleteFilm);
});

