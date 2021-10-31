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

const renderStats = async (country) => {
    try{
        const res = await fetch('https://covid-api.mmediagroup.fr/v1/cases')
        const data = await res.json();
        let countryData = data[country].All
        countryName.innerHTML = countryData.country
        confirmed.innerHTML = `<span class="symbol">⚪</span> Confirmed: <span class="confirmed">${countryData.confirmed}</span>`
        deaths.innerHTML = `<span class="symbol">🔴 </span> Deaths: <span class="deaths">${countryData.deaths}</span>`
        population.innerHTML = `<span class="symbol">👨‍👩‍👧 </span> Population: <span class="population">${countryData.population}</span>`
    }
    catch(err){
        console.error(new Error(`Country not found (The number of requests is limited) -> ${err.message}`))
    }
}

const getPosition = () => {
    return new Promise((res,rej)=>{
        navigator.geolocation.getCurrentPosition(res,rej)
    })
}

const renderDefaultStats = async () => {
    try{
        const pos = await getPosition();
        const {latitude: lat, longitude: lng} = pos.coords
        const res = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        const data = await res.json();
        if(localStorage.getItem('country') === null){
            localStorage.setItem('country',JSON.stringify(data.country))
            renderStats(JSON.parse(localStorage.getItem('country'))) 
        }
    }
    catch(error){
        console.error(error.message)
    }
};
renderDefaultStats();

inputElem.addEventListener('input',() => {
   enteredCountry = inputElem.value
})

searchBtn.addEventListener('click',() => {
   renderStats(enteredCountry)
})

