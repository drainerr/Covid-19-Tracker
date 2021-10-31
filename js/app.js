const countryName = document.querySelector('.country')
const confirmed = document.querySelector('.confirmed-li')
const deaths = document.querySelector('.deaths-li')
const population = document.querySelector('.population-li')

const renderStats = () => {
    navigator.geolocation.getCurrentPosition(pos =>{        
       const {latitude: lat, longitude: lng} = pos.coords
        fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
        .then(res => res.json())
        .then(data => {
            fetch('https://covid-api.mmediagroup.fr/v1/cases')
            .then(resp => resp.json())
            .then(stats => {
                let countryData = stats[data.country].All
                countryName.innerHTML = countryData.country
                confirmed.innerHTML = `<span class="symbol">⚪</span> Confirmed: <span class="confirmed">${countryData.confirmed}</span>`
                deaths.innerHTML = `<span class="symbol">🔴 </span> Deaths: <span class="deaths">${countryData.deaths}</span>`
                population.innerHTML = `<span class="symbol">👨‍👩‍👧 </span> Population: <span class="population">${countryData.population}</span>`
            })
        })
    })
};
renderStats()



