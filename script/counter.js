function updateTvShowCount() {
    fetch('php/displaytvshow.php')
        .then(response => response.json())
        .then(data => {
            const totalTvElement = document.getElementById('totalTv');
            if (totalTvElement) {
                totalTvElement.textContent = data.length; // Update the total TV show count
            }
        })
        .catch(error => console.error('Error fetching TV show count:', error));
}

function updateMovieCount() {
    fetch('php/displayMovies.php')
        .then(response => response.json())
        .then(data => {
            const totalMoviesElement = document.getElementById('totalMovies');
            if (totalMoviesElement) {
                totalMoviesElement.textContent = data.length;
            }
        })
        .catch(error => console.error('Error fetching movie count:', error));
}

function updateSeriesCount() {
    fetch('php/displaySeries.php')
        .then(response => response.json())
        .then(data => {
            const totalSeriesElement = document.getElementById('totalSeries');
            if (totalSeriesElement) {
                totalSeriesElement.textContent = data.length;
            }
        })
        .catch(error => console.error('Error fetching series count:', error));
}

function updateUserCounts() {
    fetch('php/displayUsers.php')
        .then(response => response.json())
        .then(data => {
            const totalActiveElement = document.getElementById('totalActive');
            if (totalActiveElement) {
                totalActiveElement.textContent = data.activeUserCount; //update the active user count
            }


            console.log(data.users); //log the users data to console
        })
        .catch(error => console.error('Error fetching user counts:', error));
}


//call lahat ng function para gumana
document.addEventListener('DOMContentLoaded', function() {
    updateTvShowCount();
    updateMovieCount();
    updateSeriesCount();
    updateUserCounts();
});