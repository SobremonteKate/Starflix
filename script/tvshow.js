function initializeTvShowFeatures() {
    console.log('Initializing TV show features');

    // remove any existing event listeners first, nagduduplicate kasi 
    removeExistingListeners();

    fetchTvShows(); // Fetch TV shows and populate table

    // search function
    const searchField = document.getElementById('searchField');
    if (searchField) searchField.addEventListener('input', handleSearch);

    // Arow click listener to pre-fill form, pag clinick mo yung row sa table automatic magfi-fill up sa form
    attachRowClickListener();

    // form submission for Update
    const updateButton = document.getElementById('update');
    const addButton = document.getElementById('add');
    const deleteButton = document.getElementById('delete');

    if (updateButton) {
        updateButton.addEventListener('click', handleUpdate);
    }

    if (addButton) {
        addButton.addEventListener('click', handleAdd);
    }

    if (deleteButton) {
        deleteButton.addEventListener('click', handleDelete);
    }
}

function removeExistingListeners() {
    const searchField = document.getElementById('searchField');
    const updateButton = document.getElementById('update');
    const addButton = document.getElementById('add');
    const deleteButton = document.getElementById('delete');

    if (searchField) {
        const newSearchField = searchField.cloneNode(true);
        searchField.parentNode.replaceChild(newSearchField, searchField);
    }
    if (updateButton) {
        const newUpdateButton = updateButton.cloneNode(true);
        updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    }
    if (addButton) {
        const newAddButton = addButton.cloneNode(true);
        addButton.parentNode.replaceChild(newAddButton, addButton);
    }
    if (deleteButton) {
        const newDeleteButton = deleteButton.cloneNode(true);
        deleteButton.parentNode.replaceChild(newDeleteButton, deleteButton);
    }
}



// Fetch TV shows from the server
function fetchTvShows() {
    fetch('php/displaytvshow.php')
        .then(response => response.json())
        .then(data => {
            displayTableData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Populate TV show table
function displayTableData(data) {
    const tableBody = document.querySelector('#tvShowTable tbody');
    if (!tableBody) {
        console.error('Table body not found! Data cannot be displayed.');
        return;
    }

    tableBody.innerHTML = ''; // Clear any existing rows
    data.forEach(show => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', show.tvID); // Store tvID in row attribute for easy access
        row.innerHTML = `
            <td>${show.tvID}</td>
            <td>${show.showName}</td>
            <td>${show.genre}</td>
            <td>${show.finalreleaseDate}</td>
            <td>${show.releaseDate}</td>
            <td>${show.episodeRuntime}</td>
            <td>${show.status}</td>
            <td>${show.ageRating}</td>
        `;
        tableBody.appendChild(row);
    });

    // Re-attach row click listeners since table is re-rendered
    attachRowClickListener();
}

// Pre-fill form fields when a table row is clicked
function attachRowClickListener() {
    const tableRows = document.querySelectorAll('#tvShowTable tbody tr');

    tableRows.forEach(row => {
        row.addEventListener('click', function () {
            const cells = this.querySelectorAll('td');
            document.getElementById('tvID').value = cells[0].innerText; // tvID
            document.getElementById('showName').value = cells[1].innerText; // Show Name
            document.getElementById('genre').value = cells[2].innerText; // Genre
            document.getElementById('finalreleaseDate').value = cells[3].innerText; // Final Release Date
            document.getElementById('releaseDate').value = cells[4].innerText; // Release Date
            document.getElementById('episodeRuntime').value = cells[5].innerText; // Episode Runtime
            document.getElementById('status').value = cells[6].innerText; // Status
            document.getElementById('ageRating').value = cells[7].innerText; // Age Rating
        });
    });
}

// Update TV show record
function handleUpdate(event) {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(document.querySelector('form'));
    formData.append('update', true); // Mark as update action

    fetch('php/insertTvshow.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Show response message
        fetchTvShows(); // Refresh table data
        resetForm(); // Clear the form after updating
    })
    .catch(error => console.error('Error updating TV show:', error));
}

// Reset the form fields
function resetForm() {
    document.querySelector('form').reset();
    document.getElementById('tvID').value = ''; // Ensure tvID is cleared
}

// SEARCH feature
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const rows = document.querySelectorAll('#tvShowTable tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const showName = cells[1]?.textContent.toLowerCase();
        const genre = cells[2]?.textContent.toLowerCase();
        const releaseDate = cells[3]?.textContent.toLowerCase();

        if (
            showName?.includes(searchTerm) ||
            genre?.includes(searchTerm) ||
            releaseDate?.includes(searchTerm)
        ) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}


function handleDelete(event) {
    event.preventDefault();

    const tvID = document.getElementById('tvID').value.trim();
    if (!tvID) {
        alert("Please provide a TV Show ID.");
        return;
    }

    if (!confirm("Are you sure you want to delete this TV Show?")) {
        return;
    }

    fetch('php/deleteTvshow.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Sending JSON
        },
        body: JSON.stringify({ tvID: tvID }) // Convert data to JSON string, para gumana ganern
    })
    .then(response => response.json()) // Expect JSON response
    .then(data => {
        if (data.success) {
            alert("TV Show deleted successfully!");
            fetchTvShows(); // pang refresh ng table
        } else {
            alert("Error: " + data.message);
        }
        document.getElementById('tvID').value = ''; // Clear input field
    })
    .catch(error => console.error('Error deleting TV show:', error));
}


// ADD function
function handleAdd(event) {
    event.preventDefault(); // Prevent default form submission

    // Gather form data
    const formData = new FormData();
    formData.append('showName', document.getElementById('showName').value.trim());
    formData.append('genre', document.getElementById('genre').value.trim());
    formData.append('finalreleaseDate', document.getElementById('finalreleaseDate').value.trim());
    formData.append('releaseDate', document.getElementById('releaseDate').value.trim());
    formData.append('status', document.getElementById('status').value.trim());
    formData.append('episodeRuntime', document.getElementById('episodeRuntime').value.trim());
    formData.append('ageRating', document.getElementById('ageRating').value.trim());

    // Validate required fields
    for (let value of formData.values()) {
        if (!value) {
            alert("All fields are required to add a TV Show.");
            return;
        }
    }

    fetch('php/insertTvshow.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // Expect plain text response
    .then(data => {
        alert(data); // Show server response
        fetchTvShows(); // Refresh table data
        resetForm(); // Clear the form after adding
    })
    .catch(error => console.error('Error adding TV show:', error));
}


// Initialize features on page load
document.addEventListener('DOMContentLoaded', initializeTvShowFeatures);
