/* Skriv din kod här */

class Country {
    constructor(name, timeZone, flagUrl) {
      this.name = name;
      this.timeZone = timeZone;
      this.flagUrl = flagUrl;
    }
  }
  
  Country.prototype.getTime = function() {
    const tz = this.timeZone.slice(3).replace(':', '');
    const dateStringWithTz = new Date().toISOString().replace('Z', tz);
    const dateWithTz = new Date(dateStringWithTz);
  
    return `${dateWithTz.getUTCHours()}:${dateWithTz.getUTCMinutes()}`
  }
  
  const renderCountries = (countries) => {
    const countryListHtml = countries.map(country => {
      return `
        <section>
          <img src="${country.flagUrl}"
          <h1>${country.name}</h1>
          <h3>${country.getTime()}</h3>
        </section>
      `;
    }).join("\n");
    document.querySelector("main").innerHTML = countryListHtml;
  }
  
  function getCountries() {
    return new Promise((resolve, reject) => {
      fetch("https://restcountries.eu/rest/v2/all?fields=name;flag;timezones")
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(error => reject(error.message));  
    }); 
  }
  
  const getThreeRandomCountries = (countries) => {
      const randomCountries = [];
    
    [0, 1, 2].forEach(() => {
        const country = countries[Math.floor(Math.random() * countries.length)];
        randomCountries.push(new Country(country.name, country.timezones[0], country.flag));
    });
    
    return randomCountries;
  };
  
  getCountries().then(countries => {
    const randomCountries = getThreeRandomCountries(countries);
    renderCountries(randomCountries);
  });
    

