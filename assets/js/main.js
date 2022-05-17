const loadText = document.querySelector('.loading__text');
const bg = document.querySelector('.bg');
const personContainer = document.querySelector('.card__wrapper');
const companyContainers = document.querySelector('.company__wrapper');
const booksContainers= document.querySelector('.books__list');
const apiUrl = "https://fakerapi.it/api/v1";
let persons= [];
var load =0;
// loading
var init = setInterval(blurring,30);

function blurring(){
    load++;
    if(load>99){
        clearInterval(init);
    }
    loadText.innerText = `${load}%`;
    loadText.style.opacity = scale(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`

}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
// End loading

// !fETCH Person data

function renderPersons(persons){
    personContainer.innerHTML='';
    
    persons.forEach(person => {
        personContainer.innerHTML += `
        <div class="card">
        <img src="../assets/images/card-bg.jpg" alt="card background" class="card__img">
        <img src="${person.image}" alt="person photo" class="card__profile">
        <h1 class="person__name"><span>${person.firstname}</span> ${person.lastname}<span></span></h1>
        <ul class="social__media">
            <li>
                <a href="#">
                    <i class="fa-solid fa-at"></i>
                    <span class="icon__details">${person.email}</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa-solid fa-phone"></i>
                    <span class="icon__details">${person.phone}</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa-solid fa-calendar-day"></i>
                    <span class="icon__details">${person.birthday}</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa-solid fa-user"></i>
                    <span class="icon__details">${person.gender}</span>
                </a>
            </li>
        </ul>
        <a href="#" class="card__btn">connect</a>
    
    </div>
        `;
    })
}

function getPersons(){
    fetch(`${apiUrl}/persons?_quantity=10`)
    .then(res => res.json())
    .then(data => {
        persons = data.data
        renderPersons(persons);
        console.log(data);
    })
    .catch(error =>{
        console.log(error);
    })
}


// !fETCH Person data

//?Fetch company data 
function renderCompanies(companies){
    companies.forEach(company => {
        companyContainers.innerHTML += `
                <div class="card__company">
                    <div class="card__inner">
                        <div class="front__face">
                            <img src="${company.image}" alt="Company Photo" class="company__photo">
                        </div>
                        <div class="back__face">
                            <h2 class="company__name">${company.name}</h2>
                            <ul class="social__media">
                                <li>
                                    <a href="#">
                                        <i class="fa-solid fa-at"></i>
                                        <span class="icon__details">${company.email}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa-solid fa-phone"></i>
                                        <span class="icon__details">${company.phone}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                    <i class="fa-solid fa-money-bill-1-wave"></i>
                                        <span class="icon__details">${company.vat}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa-solid fa-earth-americas"></i>
                                        <span class="icon__details">${company.country}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div> 
                </div>
        `;
    })
}

function getCompanies(){
    fetch(`${apiUrl}/companies?_quantity=10`)
    .then(res => res.json())
    .then(data => {
       renderCompanies(data.data);
        console.log(data);
    })
    .catch(error =>{
        console.log(error);
    })
}


// Fetch Books

function renderBooks(books){
    books.forEach(book => {
        booksContainers.innerHTML += `
        <div class="image__poster">
        <img src="${book.image}" alt="Books photo">
    </div>
    <div class="book__body">
        <div class="book__content">
            <h5>${book.title}</h5>
            <ul class="book__info">
                <li><span  class="book__info__des">Author:</span> <span class="book__info__des">${book.author}</span></li>
                <li><span class="book__info__des">Genre: </span> <span class="book__info__des">${book.genre}</span></li>
                <li><span class="book__info__des">Description:</span>  <span class="des__book">${book.description}</span></li>
                <li><span class="book__info__des">Isbin:</span>  <span class="book__info__des">${book.isbn}</span></li>
                <li><span class="book__info__des">published:</span>  <span class="book__info__des">${book.published}</span></li>
                <li><span class="book__info__des">publisher:</span>  <span class="book__info__des">${book.publisher}</span></li>
            </ul>
        </div>
    </div>
        `;
    })
}

function getBooks(){
    fetch(`${apiUrl}/books?_quantity=10`)
    .then(res => res.json())
    .then(data => {
    renderBooks(data.data);
        console.log(data);
    })
    .catch(error =>{
        console.log(error);
    })
}


async function getData(){
    await getPersons();
    await getCompanies();
    await getBooks();
}


// Search

function preventDefault(event){
    event.preventDefault();
}

function searchPersons(event){
    const searchInput =event.target;
    const matchedPerson =persons.filter(person =>person.firstname.toLowerCase().includes(searchInput.value));
    renderPersons(matchedPerson);
}

getData();