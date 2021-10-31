const countryName = document.querySelector('.country')
const confirmed = document.querySelector('.confirmed-li')
const deaths = document.querySelector('.deaths-li')
const population = document.querySelector('.population-li')
const inputElem = document.querySelector('.input')
const searchBtn = document.querySelector('.search-btn')

let enteredCountry

document.addEventListener('DOMContentLoaded',() => {
    if(localStorage.getItem('country') !== null){
        renderStats(JSON.parse(localStorage.getItem('country')))  
    } 
})

const renderStats = (country) => {
    fetch('https://covid-api.mmediagroup.fr/v1/cases')
        .then(resp => resp.json())
        .then(stats => {
            let countryData = stats[country].All
            countryName.innerHTML = countryData.country
            confirmed.innerHTML = `<span class="symbol">⚪</span> Confirmed: <span class="confirmed">${countryData.confirmed}</span>`
            deaths.innerHTML = `<span class="symbol">🔴 </span> Deaths: <span class="deaths">${countryData.deaths}</span>`
            population.innerHTML = `<span class="symbol">👨‍👩‍👧 </span> Population: <span class="population">${countryData.population}</span>`
        })
        .catch(err => console.error(new Error(`Country not found | ${err.message}`)))
}

const renderDefaultStats = () => {
    navigator.geolocation.getCurrentPosition(pos =>{        
       const {latitude: lat, longitude: lng} = pos.coords
        fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then(res => res.json())
        .then(data => {
            if(localStorage.getItem('country') === null){
                localStorage.setItem('country',JSON.stringify(data.country))
                renderStats(JSON.parse(localStorage.getItem('country'))) 
            } 
        })
    })
};
renderDefaultStats();

inputElem.addEventListener('input',() => {
   enteredCountry = inputElem.value
})

searchBtn.addEventListener('click',() => {
   renderStats(enteredCountry)
})

