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
    // document.querySelectorAll('.promo__interactive-item').forEach ((item, i) => {
    //     if (movieDB.movies[i]) {
    //         item.firstChild.data = `${i+1}. ${movieDB.movies[i]} `;
    //     } else {
    //         item.firstChild.data = i+1;
    //     }
    // });
    let listLength = (movieDB.movies.length > 5) ? 5 : movieDB.movies.length,
        filmList = document.querySelector('.promo__interactive-list');
    console.log(filmList);
    filmList.textContent = "";
    for (let i = 0; i < listLength; i++) {
        filmList.innerHTML += `
        <li class="promo__interactive-item">${i+1}. ${movieDB.movies[i]}
            <div class="delete"></div>
        </li>        
        `;
    }
    deleteBtnsEvent();
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

function deleteBtnsEvent() {
    document.querySelectorAll('.delete').forEach((item, i) => {
        item.addEventListener('click', deleteFilm);
    });
}

function deleteFilm(e) {
    movieDB.movies.splice(e.target.parentElement.textContent.slice(0, 1) - 1, 1);
    displayFilms();
}

displayFilms();
addBtn.addEventListener('click', rememberMyFilms);
deleteBtnsEvent();

