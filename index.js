const apiKey = "1601530";
const form = document.getElementById("search-container");
const search = document.getElementById("search-input");
const moviesRender = document.getElementById("search-result");

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("search-input").value.trim();

  if (title) {
    console.log(`Searching for: ${title}`);
    searchTitle(title);
  }
});

function searchTitle(title) {
  moviesRender.innerHTML = "";
  fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "True") {
        const movies = data.Search;

        const promises = movies.map((movie) =>
          fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
            .then((res) => res.json())
            .then((details) => renderMovie(details))
        );

        Promise.all(promises).catch((error) =>
          console.error("Error fetching movie details:", error)
        );
      } else {
        moviesRender.innerHTML = `<p>No movies found. Please try a different search term.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      moviesRender.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    });
}

function renderMovie(details) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  movieCard.innerHTML = `

    <img
            src="${details.Poster}"
            alt="${details.Title}"
          />
          <div id="movie-description">
            <h2>${details.Title}</h2>
            <img id="star" src="./images/star.png" />
            <span>${details.imdbRating}</span>
            <div id="movie-details">
              <span>${details.Runtime}</span>
              <span>${details.Genre}</span>
              <button class="add-btn" id="add-btn-${details.imdbID}">
                <img src="./images/add.png" alt="Add to Watchlist" />
                <span>Watchlist</span>
              </button>
            </div>
            <p>
   ${details.Plot}
            </p>

  `;

  moviesRender.appendChild(movieCard);

  const addButton = movieCard.querySelector(`#add-btn-${details.imdbID}`);
  addButton.addEventListener("click", () => {
    saveToWatchlist(details.Title);
    console.log(`Added to Watchlist: ${details.Title}`);
  });
}

function saveToWatchlist(title) {
  console.log(`Saving to Watchlist: ${title}`);
}
