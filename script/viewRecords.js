// pag clinick sa sidebar, magloload yung html 
document.addEventListener('DOMContentLoaded', initializeViewUserFeature);

function initializeViewUserFeatures() {
    const limitSelect = document.getElementById('limitrecs');
    const searchField = document.getElementById('searchUserField');

    let currentPage = 1;
    let limit = limitSelect ? parseInt(limitSelect.value) : 10;

    // Fetch data on page load
    fetchUsers(currentPage, limit);

    // Add event listener for changing the limit, para to sa entries, 10,50,100
    if (limitSelect) {
        limitSelect.addEventListener('change', function() {
            limit = parseInt(this.value);
            fetchUsers(currentPage, limit);
        });
    }

    //SEARCH function
    if (searchField) {
        searchField.addEventListener('input', handleSearch);
    }
}

function fetchUsers(page, limit) {
    fetch(`php/viewRecords.php?page=${page}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            displayTableData(data.users);
            updatePagination(data.totalPages, page, limit);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayTableData(users) {
    const tableBody = document.querySelector('#userTable tbody');
    const tableWrapper = document.querySelector('#userTableWrapper');
    if (!tableBody) return console.error('Table body not found!');

    tableBody.innerHTML = ''; // Clear existing rows

    users.forEach(user => {
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

    // Add or remove the scrollable class based on the number of entries
    if (users.length >= 50) {
        tableWrapper.classList.add('with-scroll'); // Show scroll bar if more than 50 entries
    } else {
        tableWrapper.classList.remove('with-scroll'); // Remove scroll bar if less than 50 entries
    }

    attachRowClickListener(); // Attach click listener for row data population
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

function updatePagination(totalPages, currentPage, limit) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''; // Clear existing pagination buttons

    // Create previous button
    const prevButton = document.createElement('li');
    prevButton.classList.add('page-item');
    prevButton.innerHTML = `<a class="page-link prev prnxt" href="#" onclick="changePage(${currentPage - 1}, ${limit})">Prev</a>`;
    pagination.appendChild(prevButton);

    // Create page number buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('li');
        pageButton.classList.add('page-item');
        const pageLink = document.createElement('a');
        pageLink.classList.add('page-link', 'page');
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.onclick = function() {
            changePage(i, limit);
        };
        pageButton.appendChild(pageLink);
        pagination.appendChild(pageButton);
    }

    // Create next button
    const nextButton = document.createElement('li');
    nextButton.classList.add('page-item');
    nextButton.innerHTML = `<a class="page-link next prnxt" href="#" onclick="changePage(${currentPage + 1}, ${limit})">Next</a>`;
    pagination.appendChild(nextButton);
}

function changePage(page, limit) {
    if (page < 1) return;
    fetchUsers(page, limit); // Fetch data for the selected page
}

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