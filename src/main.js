import "./style.css";

const form = {
  text: document.querySelector(".input"),
  searchButton: document.querySelector(".search"),
  apiKey: "8ZD7AFSAHS2FQ3LEQUKH87PDN",

  search() {
    this.searchButton.addEventListener("click", (e) => {
      e.preventDefault()
      if (this.text.checkValidity()) {
        const location = this.text.value.trim();
        sessionStorage.setItem("location", location);

        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${this.apiKey}&contentType=json`;

        fetch(url, { mode: "cors" })
          .then(response => response.json())
          .then(response => {
            if (response.currentConditions) {
              const formattedResult = Object.entries(response.currentConditions)
              .map(([key, value]) => `<div><b>${key}:</b>  <span>${value}</span></div>`).join("")
              results.container.innerHTML = formattedResult;

              sessionStorage.setItem("result", formattedResult);
            } else {
              results.container.textContent = "Weather data not available.";
            }
          })
          .then(()=> window.location.reload())
          .catch(error => {
            console.error("Error fetching weather data:", error);
            results.container.textContent = "Failed to fetch weather data.";
          });
      }
    });
  },
};

const results = {
  container: document.querySelector(".resultsContainer"),
};

form.search();

window.onload = function () {
  const savedLocation = sessionStorage.getItem("location");
  const savedResult = sessionStorage.getItem("result");

  if (savedLocation) {
    form.text.value = savedLocation;
  }

  if (savedResult) {
    results.container.innerHTML = savedResult;
  }
};