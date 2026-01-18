narevise / script / movie.js
document.addEventListener('DOMContentLoaded', initializeUserFeatures); // pag clinick sa sidebar, magloload yung html 

function initializeUserFeatures() {
    console.log('Initializing User features');

    fetchUsers();

    // SEARCH function
    const searchField = document.getElementById('searchUserField');
    searchField?.addEventListener('input', handleSearch);

    // button event listeners
    document.getElementById('userRegister')?.addEventListener('click', handleAdd);
    document.getElementById('updateUser')?.addEventListener('click', handleUpdate);
    document.getElementById('deleteUser')?.addEventListener('click', handleDelete);
}


function fetchUsers() {
    fetch('php/displayUsers.php')
        .then(response => response.json())
        .then(data => {
            // Access 'users' from the response and pass it to displayTableData
            displayTableData(data.users);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayTableData(data) {
    const tableBody = document.querySelector('#userTable tbody');
    if (!tableBody) return console.error('Table body not found!');

    if (Array.isArray(data)) {
        tableBody.innerHTML = ''; // Clear any existing rows

        data.forEach(user => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', user.userID);
            row.innerHTML = `
                <td>${user.userID}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.userName}</td>
                <td>${user.contactNum}</td>
                <td>${user.email}</td>
                <td>${user.subs}</td>
                <td>${user.payment}</td>
                <td>${user.status}</td>
            `;
            tableBody.appendChild(row);
        });

        attachRowClickListener(); // Re-attach row listeners after updating table
    } else {
        console.error('Expected an array but received:', data);
    }
}


function attachRowClickListener() {
    document.querySelectorAll('#userTable tbody tr').forEach(row => {
        row.addEventListener('click', function() {
            const cells = this.querySelectorAll('td');
            document.getElementById('userID').value = cells[0].innerText;
            document.getElementById('firstName').value = cells[1].innerText;
            document.getElementById('lastName').value = cells[2].innerText;
            document.getElementById('userName').value = cells[3].innerText;
            document.getElementById('contactNum').value = cells[4].innerText;
            document.getElementById('email').value = cells[5].innerText;
            document.getElementById('subs').value = cells[6].innerText;
            document.getElementById('payment').value = cells[7].innerText;
            document.getElementById('status').value = cells[8].innerText;
        });
    });
}

//ADD function
function handleAdd(event) {
    event.preventDefault();
    const formData = collectFormData();
    if (!formData) return;

    fetch('php/setupUser.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchUsers(); // Fetch the updated user list after successful insert
            resetForm(); // Reset the form fields
        })
        .catch(error => console.error('Error adding User:', error));
}

function resetForm() {
    document.querySelector('form').reset(); // Clear all form fields
    document.getElementById('userID').value = ''; // Clear user ID field if any
}

//UPDATE function
function handleUpdate(event) {
    event.preventDefault();
    const formData = collectFormData(true);
    if (!formData) return;

    formData.append('update', true);

    fetch('php/setupUser.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchUsers();
            resetForm();
        })
        .catch(error => console.error('Error updating User:', error));
}

//DELETE function
function handleDelete(event) {
    event.preventDefault();

    const userID = document.getElementById('userID').value.trim();
    if (!userID) {
        alert("Please provide a User ID.");
        return;
    }

    if (!confirm("Are you sure you want to delete this User?")) return;

    fetch('php/deleteUser.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: userID
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("User deleted successfully!");
                fetchUsers();
                resetForm();
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => console.error('Error deleting User:', error));
}

//SEARCH function
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const rows = document.querySelectorAll('#userTable tbody tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const userName = cells[3]?.textContent.toLowerCase();
        const contactNum = cells[4]?.textContent.toLowerCase();
        const email = cells[5]?.textContent.toLowerCase();

        row.style.display = (userName?.includes(searchTerm) || contactNum?.includes(searchTerm) || email?.includes(searchTerm)) ? '' : 'none';
    });
}

function collectFormData(includeID = false) {
    const formData = new FormData();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const userName = document.getElementById('userName').value.trim();
    const contactNum = document.getElementById('contactNum').value.trim();
    const email = document.getElementById('email').value.trim();
    const subs = document.getElementById('subs').value.trim();
    const payment = document.getElementById('payment').value.trim();
    const status = document.getElementById('status').value.trim();

    if (!firstName || !lastName || !userName || !contactNum || !email || !subs || !payment || !status) {
        alert("All fields are required.");
        return null;
    }

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('userName', userName);
    formData.append('contactNum', contactNum);
    formData.append('email', email);
    formData.append('subs', subs);
    formData.append('payment', payment);
    formData.append('status', status);

    if (includeID) {
        const userID = document.getElementById('userID').value.trim();
        if (!userID) {
            alert("User ID is required for updates.");
            return null;
        }
        formData.append('userID', userID);
    }

    return formData;
}

function resetForm() {
    document.querySelector('form').reset();
    document.getElementById('userID').value = '';
}


document.addEventListener('DOMContentLoaded', initializeUserFeatures);