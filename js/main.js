// DOM
const apiKey = "e9d6509fde4e5c95d9b93e30d3ec0bf2";

let $ = document.querySelector.bind(document);
const inputCity = $("#search");
const searchBtn = $("#lupa");
const form = $("form");

const cityElement = $("#cidade");
const tempElement = $("#Graus");
const descElement = $("#condicao");
const humidityElement = $("#humidity span");
const windElement = $("#wind span");

// Functions
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = `${parseInt(data.main.temp)}°`;
    descElement.innerText = data.weather[0].description;
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;


    const sectionImages = $("#imageRendering");

    sectionImages.innerHTML = changeImages(descElement);

    function changeImages(descElement) {

        let chuvoso = "fa-solid fa-cloud-showers-water fa2xl images";
        let nublado = "fa-solid fa-cloud-sun fa2xl images";
        let ensolarado = "fa-solid fa-sun fa2xl images";

        if (descElement.innerHTML === "nublado" || descElement.innerHTML === "nuvens dispersas" || descElement.innerHTML === "algumas nuvens") {
            sectionImages.outerHTML = `<i class="${nublado}"></i>`;
        } 
        else if (descElement.innerHTML === "ensolarado" || descElement.innerHTML === "céu limpo") {
            sectionImages.outerHTML = `<i class="${ensolarado}"></i>`;
        } 
        else if (descElement.innerHTML === "chuva leve" || descElement.innerHTML === "chuva forte") {
            sectionImages.outerHTML = `<i class="${chuvoso}"></i>`;
        }
    };
}

// ------------------- Events -------------------------------

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const city = inputCity.value;

    showWeatherData(city);
    form.reset();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = inputCity.value;
    showWeatherData(city);
    form.reset();
})







