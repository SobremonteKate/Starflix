// pag clinick sa sidebar, magloload yung html 
document.addEventListener('DOMContentLoaded', initializeSeriesFeatures);

function initializeSeriesFeatures() {
    console.log('Initializing Series features');

    fetchSeries();

    // earch function
    const searchField = document.getElementById('searchSeriesField');
    searchField?.addEventListener('input', handleSearch);

    // button event listeners
    document.getElementById('addSeries')?.addEventListener('click', handleAdd);
    document.getElementById('updateSeries')?.addEventListener('click', handleUpdate);
    document.getElementById('deleteSeries')?.addEventListener('click', handleDelete);
}

function fetchSeries() {
    fetch('php/displaySeries.php')
        .then(response => response.json())
        .then(data => displayTableData(data))
        .catch(error => console.error('Error fetching data:', error));
}

function displayTableData(data) {
    const tableBody = document.querySelector('#seriesTable tbody');
    if (!tableBody) return console.error('Table body not found!');

    tableBody.innerHTML = ''; // Clear any existing rows

    data.forEach(show => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', show.seriesID);
        row.innerHTML = `
            <td>${show.seriesID}</td>
            <td>${show.seriesName}</td>
            <td>${show.genre}</td>
            <td>${show.finalreleaseDate}</td>
            <td>${show.releaseDate}</td>
            <td>${show.episodeRuntime}</td>
            <td>${show.status}</td>
            <td>${show.ageRating}</td>
        `;
        tableBody.appendChild(row);
    });

    attachRowClickListener(); // Re-attach row listeners after updating table
}

function attachRowClickListener() {
    document.querySelectorAll('#seriesTable tbody tr').forEach(row => {
        row.addEventListener('click', function() {
            const cells = this.querySelectorAll('td');
            document.getElementById('seriesID').value = cells[0].innerText;
            document.getElementById('seriesName').value = cells[1].innerText;
            document.getElementById('genre').value = cells[2].innerText;
            document.getElementById('finalreleaseDate').value = cells[3].innerText;
            document.getElementById('releaseDate').value = cells[4].innerText;
            document.getElementById('episodeRuntime').value = cells[5].innerText;
            document.getElementById('status').value = cells[6].innerText;
            document.getElementById('ageRating').value = cells[7].innerText;
        });
    });
}

//ADD function
function handleAdd(event) {
    event.preventDefault();
    const formData = collectFormData();
    if (!formData) return;

    fetch('php/insertSeries.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchSeries();
            resetForm();
        })
        .catch(error => console.error('Error adding Series:', error));
}

//UPDATE function
function handleUpdate(event) {
    event.preventDefault();
    const formData = collectFormData(true);
    if (!formData) return;

    formData.append('update', true);

    fetch('php/insertSeries.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchSeries();
            resetForm();
        })
        .catch(error => console.error('Error updating Series:', error));
}

//DELETE function
function handleDelete(event) {
    event.preventDefault();

    const seriesID = document.getElementById('seriesID').value.trim();
    if (!seriesID) {
        alert("Please provide a Series ID.");
        return;
    }

    if (!confirm("Are you sure you want to delete this Series?")) return;

    fetch('php/deleteSeries.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                seriesID: seriesID
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Series deleted successfully!");
                fetchSeries();
                resetForm();
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => console.error('Error deleting Series:', error));
}

//SEARCH function
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const rows = document.querySelectorAll('#seriesTable tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const seriesName = cells[1]?.textContent.toLowerCase();
        const genre = cells[2]?.textContent.toLowerCase();
        const releaseDate = cells[3]?.textContent.toLowerCase();

        row.style.display = (seriesName?.includes(searchTerm) || genre?.includes(searchTerm) || releaseDate?.includes(searchTerm)) ? '' : 'none';
    });
}

function collectFormData(includeID = false) {
    const formData = new FormData();
    const seriesName = document.getElementById('seriesName').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const finalRelease = document.getElementById('finalreleaseDate').value.trim();
    const releaseDate = document.getElementById('releaseDate').value.trim();
    const episodeRuntime = document.getElementById('episodeRuntime').value.trim();
    const status = document.getElementById('status').value.trim();
    const ageRating = document.getElementById('ageRating').value.trim();

    if (!seriesName || !genre || !finalRelease || !releaseDate || !episodeRuntime || !status || !ageRating) {
        alert("All fields are required.");
        return null;
    }

    formData.append('seriesName', seriesName);
    formData.append('genre', genre);
    formData.append('finalreleaseDate', finalRelease);
    formData.append('releaseDate', releaseDate);
    formData.append('episodeRuntime', episodeRuntime);
    formData.append('status', status);
    formData.append('ageRating', ageRating);

    if (includeID) {
        const seriesID = document.getElementById('seriesID').value.trim();
        if (!seriesID) {
            alert("Series ID is required for updates.");
            return null;
        }
        formData.append('seriesID', seriesID);
    }

    return formData;
}

function resetForm() {
    document.querySelector('form').reset();
    document.getElementById('seriesID').value = '';
}


// Initialize features on page load
document.addEventListener('DOMContentLoaded', initializeSeriesFeatures);