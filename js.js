//Select submit button
const submit = document.querySelector('.submit');
//Select Info_containers
const info_container = document.querySelector('.info_container');
//Select header
const header = document.querySelector('.header');


//Get info from input box
function getVal(){
    return document.querySelector('input').value;
}

//Shows info when submit button is clicked
submit.addEventListener('click', () => {
    info_container.classList.remove('invisible');
    getWeather();
});

//convert kelvin to Fahrenheit
function ktoF(temp){
    return 1.8*(temp-273) + 32;
}
//convert kelvin to Celsius
function ktoC(temp){
    return temp - 273.15;
}

function removeClass(temp){
    if (header.classList.contains(temp))
    {
        header.classList.remove(temp);
        info_container.classList.remove(temp);
    }
}

async function getWeather(){
    //Fetch data from API
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${getVal()}&APPID=082397876617515969b21ccf5ac0a3bc`, {mode: 'cors'});
    const weatherData = await response.json();

    //Select the containers for the each piece of information
    const name = document.querySelector('.name');
    const description = document.querySelector('.description');
    const temp = document.querySelector('.temp');
    const min = document.querySelector('.min');
    const max = document.querySelector('.max');


    //Display respective information
    name.textContent = weatherData.name;
    description.textContent = weatherData.weather[0].description;

    let locationTempF = parseFloat(ktoF(weatherData.main.temp)).toFixed(1);
    let locationMinF = parseFloat(ktoF(weatherData.main.temp_min)).toFixed(1);
    let locationMaxF = parseFloat(ktoF(weatherData.main.temp_max)).toFixed(1);
    let locationTempC = parseFloat(ktoC(weatherData.main.temp)).toFixed(1);
    let locationMinC = parseFloat(ktoC(weatherData.main.temp_min)).toFixed(1);
    let locationMaxC = parseFloat(ktoC(weatherData.main.temp_max)).toFixed(1);

    temp.textContent = locationTempF + " F / " + locationTempC + " C";
    min.textContent = locationMinF + " F / " + locationMinC + " C";
    max.textContent = locationMaxF + " F / " + locationMaxC + " C";

    //Remove previous classes
    removeClass('cold');
    removeClass('cool');
    removeClass('hot');

    //Change background according to temperature status
    if(locationTempF <= 46)
    {
        header.classList.add('cold');
        info_container.classList.add('cold');
    }
    else if (locationTempF > 46 && locationTempF < 85)
    {
        header.classList.add('cool');
        info_container.classList.add('cool');
    }
    else{
        header.classList.add('hot');
        info_container.classList.add('hot');
    }
}