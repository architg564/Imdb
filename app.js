const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const myFavourites = JSON.parse(localStorage.getItem('myFavourites')) || [];

// Function to display search results
const displaySearchResults = (movies) => {
    searchResults.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.innerHTML = `
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="card-img" alt="${movie.Title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Year}</p>
                        <button class="btn btn-primary favouriteBtn">Add to Favourites</button>
                        <a href="movie.html?id=${movie.imdbID}" class="btn btn-link">Read More</a>
                    </div>
                </div>
            </div>
        `;
        searchResults.appendChild(card);

        // Add event listener for favourite button
        const favouriteBtn = card.querySelector('.favouriteBtn');
        favouriteBtn.addEventListener('click', () => {
            addToFavourites(movie);
        });
    });
};

// Function to add movie to favourites
const addToFavourites = (movie) => {
    if (!myFavourites.find(favourite => favourite.imdbID === movie.imdbID)) {
        myFavourites.push(movie);
        localStorage.setItem('myFavourites', JSON.stringify(myFavourites));
        alert(`${movie.Title} added to Favourites!`);
    } else {
        alert(`${movie.Title} is already in Favourites!`);
    }
};

// Function to remove movie from favourites
const removeFromFavourites = (movieId) => {
    const movieIndex = myFavourites.findIndex(favourite => favourite.imdbID === movieId);
    if (movieIndex !== -1) {
        myFavourites.splice(movieIndex, 1);
        localStorage.setItem('myFavourites', JSON.stringify(myFavourites));
        alert('Movie removed from Favourites!');
    }
};

// Function to display favourites
const displayFavourites = () => {
    searchResults.innerHTML = '';
    myFavourites.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.innerHTML = `
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="card-img" alt="${movie.Title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        // ...continued

                        <p class="card-text">${movie.Year}</p>
                        <button class="btn btn-danger removeBtn">Remove from Favourites</button>
                        <a href="movie.html?id=${movie.imdbID}" class="btn btn-link">Read More</a>
                    </div>
                </div>
            </div>
        `;
        searchResults.appendChild(card);

        // Add event listener for remove button
        const removeBtn = card.querySelector('.removeBtn');
        removeBtn.addEventListener('click', () => {
            removeFromFavourites(movie.imdbID);
            card.remove();
        });
    });
};

// Function to fetch search results from API
const fetchSearchResults = async (query) => {
    try {
        console.log(query);
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=65512e31`);
        const data = await response.json();
        if (data.Search) {
            return data.Search;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
};

// Function to handle search input
searchInput.addEventListener('input', async (e) => {
    console.log("inside search");
    const query = e.target.value;
    const movies = await fetchSearchResults(query);
    displaySearchResults(movies);
});

// Function to load favourites on page load
window.addEventListener('load', () => {
    displayFavourites();
});

