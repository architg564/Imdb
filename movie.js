const movieDetails = document.getElementById('movieDetails');

// Function to display movie details
const displayMovieDetails = (movie) => {
    movieDetails.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster}" class="img-fluid" alt="${movie.Title}">
            </div>
            <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Released:</strong> ${movie.Released}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
                <p><strong>Language:</strong> ${movie.Language}</p>
                <p><strong>Country:</strong> ${movie.Country}</p>
                <a href="index.html" class="btn btn-link">Back to Search</a>
            </div>
        </div>
    `;
};

// Function to fetch movie details from API
const fetchMovieDetails = async (movieId) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=65512e31`);
        const data = await response.json();
        return data;
        // ...continued

    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
};

// Function to load movie details on page load
window.addEventListener('load', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const movieId = queryParams.get('id');
    if (movieId) {
        fetchMovieDetails(movieId)
            .then(movie => {
                if (movie) {
                    displayMovieDetails(movie);
                } else {
                    movieDetails.innerHTML = '<p>Movie details not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                movieDetails.innerHTML = '<p>Failed to fetch movie details.</p>';
            });
    } else {
        movieDetails.innerHTML = '<p>Movie ID not found.</p>';
    }
});

