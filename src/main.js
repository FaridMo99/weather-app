import "./style.css";

const form = {
  text: document.querySelector(".input"),
  searchButton: document.querySelector(".search"),

  search() {
    this.searchButton.addEventListener("click", () => {
      if (this.text.checkValidity()) {
        localStorage.setItem("location", this.text.value);
        //search algorithm
      }
    });
  },
};

const results = {
  container: document.querySelector(".resultsContainer"),
};

form.search();

window.onload = function () {
  form.text.value = localStorage.getItem("location");
};
