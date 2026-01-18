// pag clinick sa sidebar, magloload yung html 
document.addEventListener('DOMContentLoaded', initializeMovieFeatures);

function initializeMovieFeatures() {
    console.log('Initializing Movie features');

    fetchMovies();

    // search function
    const searchField = document.getElementById('searchMovieField');
    searchField?.addEventListener('input', handleSearch);

    // button event listener
    document.getElementById('addMovie')?.addEventListener('click', handleAdd);
    document.getElementById('updateMovie')?.addEventListener('click', handleUpdate);
    document.getElementById('deleteMovie')?.addEventListener('click', handleDelete);
}

function fetchMovies() {
    fetch('php/displayMovies.php')
        .then(response => response.json())
        .then(data => displayTableData(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayTableData(data) {
    const tableBody = document.querySelector('#movieTable tbody');
    if (!tableBody) return console.error('Table body not found!');

    tableBody.innerHTML = ''; // Clear any existing rows

    data.forEach(movie => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', movie.movieID);
        row.innerHTML = `
            <td>${movie.movieID}</td>
            <td>${movie.movieName}</td>
            <td>${movie.genre}</td>
            <td>${movie.releaseDate}</td>
            <td>${movie.duration}</td>
            <td>${movie.ageRating}</td>
        `;
        tableBody.appendChild(row);
    });

    attachRowClickListener(); // Re-attach row listeners after updating table
}

function attachRowClickListener() {
    document.querySelectorAll('#movieTable tbody tr').forEach(row => {
        row.addEventListener('click', function() {
            const cells = this.querySelectorAll('td');
            document.getElementById('movieID').value = cells[0].innerText;
            document.getElementById('movieName').value = cells[1].innerText;
            document.getElementById('genre').value = cells[2].innerText;
            document.getElementById('releaseDate').value = cells[3].innerText;
            document.getElementById('duration').value = cells[4].innerText;
            document.getElementById('ageRating').value = cells[5].innerText;
        });
    });
}

//ADD function
function handleAdd(event) {
    event.preventDefault();
    const formData = collectFormData();
    if (!formData) return;

    fetch('php/insertMovie.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchMovies();
            resetForm();
        })
        .catch(error => console.error('Error adding Movie:', error));
}

function handleUpdate(event) {
    event.preventDefault();
    const formData = collectFormData(true);
    if (!formData) return;

    formData.append('update', true);

    fetch('php/insertMovie.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchMovies();
            resetForm();
        })
        .catch(error => console.error('Error updating Movie:', error));
}

//DELETE function
function handleDelete(event) {
    event.preventDefault();

    const movieID = document.getElementById('movieID').value.trim();
    if (!movieID) {
        alert("Please provide a Movie ID.");
        return;
    }

    if (!confirm("Are you sure you want to delete this Movie?")) return;

    fetch('php/deleteMovie.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieID: movieID
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Movie deleted successfully!");
                fetchMovies();
                resetForm();
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => console.error('Error deleting Movie:', error));
}

//SEARCH function
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const rows = document.querySelectorAll('#movieTable tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const movieName = cells[1]?.textContent.toLowerCase();
        const genre = cells[2]?.textContent.toLowerCase();
        const releaseDate = cells[3]?.textContent.toLowerCase();

        row.style.display = (movieName?.includes(searchTerm) || genre?.includes(searchTerm) || releaseDate?.includes(searchTerm)) ? '' : 'none';
    });
}

function collectFormData(includeID = false) {
    const formData = new FormData();
    const movieName = document.getElementById('movieName').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const releaseDate = document.getElementById('releaseDate').value.trim();
    const duration = document.getElementById('duration').value.trim();
    const ageRating = document.getElementById('ageRating').value.trim();

    if (!movieName || !genre || !releaseDate || !duration || !ageRating) {
        alert("All fields are required.");
        return null;
    }

    formData.append('movieName', movieName);
    formData.append('genre', genre);
    formData.append('releaseDate', releaseDate);
    formData.append('duration', duration);
    formData.append('ageRating', ageRating);

    if (includeID) {
        const movieID = document.getElementById('movieID').value.trim();
        if (!movieID) {
            alert("Movie ID is required for updates.");
            return null;
        }
        formData.append('movieID', movieID);
    }

    return formData;
}

function resetForm() {
    document.querySelector('form').reset();
    document.getElementById('movieID').value = '';
}

// Initialize features again on page load
document.addEventListener('DOMContentLoaded', initializeMovieFeatures);