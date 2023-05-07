const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

// Function to display search results
const displaySearchResults = (movies) => {
    searchResults.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card">
                <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">${movie.Year}</p>
                    <button class="btn btn-primary favouriteBtn">Add to Favourites</button>
                    <a href="movie.html?id=${movie.imdbID}" class="btn btn-link">Read More</a>
                </div>
            </div>
        `;
        searchResults.appendChild(card);

        // Add event listener for favourite button
        const favouriteBtn = card.querySelector('.favouriteBtn');
        favouriteBtn.addEventListener('click', () => {
            addToFavourites(movie);
            favouriteBtn.disabled = true;
            favouriteBtn.textContent = 'Added to Favourites';
        });
    });
};

// Function to fetch search results from API
const fetchSearchResults = async (query) => {
    try {
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

// Function to add
// ...continued

// Function to add movie to favourites
const addToFavourites = (movie) => {
    if (!isMovieInFavourites(movie)) {
        favourites.push(movie);
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }
};

// Function to check if movie is already in favourites
const isMovieInFavourites = (movie) => {
    return favourites.some(favMovie => favMovie.imdbID === movie.imdbID);
};

// Function to display favourites
const displayFavourites = () => {
    const favouritesList = document.getElementById('favouritesList');
    favouritesList.innerHTML = '';
    if (favourites.length > 0) {
        favourites.forEach(movie => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Year}</p>
                        <button class="btn btn-danger removeBtn">Remove from Favourites</button>
                        <a href="movie.html?id=${movie.imdbID}" class="btn btn-link">Read More</a>
                    </div>
                </div>
            `;
            favouritesList.appendChild(listItem);

            // Add event listener for remove button
            const removeBtn = listItem.querySelector('.removeBtn');
            removeBtn.addEventListener('click', () => {
                removeFromFavourites(movie);
                displayFavourites();
            });
        });
    } else {
        favouritesList.innerHTML = '<p>No movies added to favourites.</p>';
    }
};

// Function to remove movie from favourites
const removeFromFavourites = (movie) => {
    favourites.splice(favourites.findIndex(favMovie => favMovie.imdbID === movie.imdbID), 1);
    localStorage.setItem('favourites', JSON.stringify(favourites));
};

// Function to load favourites on page load
window.addEventListener('load', () => {
    displayFavourites();
});

