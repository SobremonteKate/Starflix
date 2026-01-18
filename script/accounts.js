// pag clinick sa sidebar, magloload yung html 
document.addEventListener('DOMContentLoaded', initializeAccountFeatures);

function initializeAccountFeatures() {
    console.log('Initializing Account features');

    // event listener for buttons
    document.getElementById('regisNewAcc')?.addEventListener('click', handleAddAccount);
    document.getElementById('savebtn')?.addEventListener('click', handleUpdateAccount);
}

// ADD function
function handleAddAccount(event) {
    event.preventDefault();
    const formData = collectAccountFormData();
    if (!formData) return;

    formData.append('regisNewAcc', true);

    fetch('php/accounts.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(`Account created successfully! Account ID: ${data.accountID}`);
                resetForm();
            } else {
                alert(`Error: ${data.message}`);
            }
        })
        .catch(error => console.error('Error adding account:', error));
}

// UPDATE function
function handleUpdateAccount(event) {
    event.preventDefault();
    const formData = collectAccountFormData(true); // true indicates updating account
    if (!formData) return;

    formData.append('update', true);

    fetch('php/accounts.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            resetForm();
        })
        .catch(error => console.error('Error updating account:', error));
}

// pang collect ng form data
function collectAccountFormData(includeID = false) {
    const formData = new FormData();
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!fname || !lname || !email) {
        alert('First name, last name, and email are required.');
        return null;
    }

    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('email', email);

    // Append password if provided
    if (password) {
        formData.append('password', password);
    }

    // Include account ID for updating purposes
    if (includeID) {
        const accountID = document.getElementById('accountID').value.trim();
        if (!accountID) {
            alert('Account ID is required for updates.');
            return null;
        }
        formData.append('accountID', accountID);
    }

    return formData;
}

// reset lang ng form
function resetForm() {
    document.querySelector('form').reset();
    if (document.getElementById('accountID')) {
        document.getElementById('accountID').value = '';
    }
}