const countryName = document.querySelector('.country')
const confirmed = document.querySelector('.confirmed-li')
const deaths = document.querySelector('.deaths-li')
const population = document.querySelector('.population-li')
const inputElem = document.querySelector('.input')
const searchBtn = document.querySelector('.search-btn')
const container = document.querySelector('.stats-container')

let givenCountry = '';

const liveAlert = (message,type) => {
    let wrapper = document.createElement('div')
    wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert"> ${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`
    document.querySelector('.liveAlertPlaceholder').append(wrapper)
}

const renderStats = async (country) => {
    try{
        const fetched = await fetch('https://covid-api.mmediagroup.fr/v1/cases');
        const res = await fetched.json();
        const stats = await res;
        let countryData = stats[country].All
        countryName.innerHTML = countryData.country
        confirmed.innerHTML = `<span class="symbol">⚪</span> Confirmed: <span class="confirmed">${countryData.confirmed}</span>`
        deaths.innerHTML = `<span class="symbol">🔴 </span> Deaths: <span class="deaths">${countryData.deaths}</span>`
        population.innerHTML = `<span class="symbol">👨‍👩‍👧 </span> Population: <span class="population">${countryData.population}</span>`
    }   
    catch(err){
        liveAlert(`Country Not Found! <br><hr> This is probably because you misspelled the name, or the country statistics are not provided by the API we use`, 'secondary')
        console.error(err.message)
    }
}

const renderDefaultStats = async () => {
    try{
        const fetched = await fetch('https://api.db-ip.com/v2/free/self')
        const res = await fetched.json();
        const data = res;
        renderStats(data.countryName)
    }
    catch(err){
        liveAlert('We could not locate the country you are in, please try to search for its statistics manually','secondary')
        console.error(err.message)
    }
};

renderDefaultStats();

inputElem.addEventListener('input',() => {
   givenCountry = inputElem.value
})

searchBtn.addEventListener('click',() => {
   renderStats(givenCountry)
})
