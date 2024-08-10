document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');

    const links = {
        updateProfile: 'https://docs.google.com/forms/d/e/1FAIpQLScPzSWH0y2k4K1uLexol1CBc-8AiGSfx7hFFERGRi1af4eECw/viewform?usp=sf_link',
        dropOrder: 'https://docs.google.com/forms/d/e/1FAIpQLSch5H3r93YRy1lwRIfJay5FIL833uN9LMk5qvzamI7WC_LzAg/viewform',
        cancelOrder: 'https://docs.google.com/forms/d/e/1FAIpQLScTYjf3rkQmTrbwPiJ8no6lDFd3d0ntMY7E2Ji7Qd07ASUGKA/viewform'
    };

    const operationLinks = {
        optManager: {
            name: 'Socheata',
            link: 'https://docs.google.com/spreadsheets/d/1QCrm9mwkqa_URETFSjHxxCf34S__kpTY-KfbwOltbdI/edit?usp=sharing'
        },
        optSupervisor: {
            name: 'Sreymom',
            link: 'https://docs.google.com/spreadsheets/d/1s5QU4NXITz3anNJequzEqa_FY8ep8dv15feknLv5Wnk/edit?usp=sharing'
        }
    };

    function redirectTo(linkKey) {
        const url = links[linkKey];
        if (url) {
            window.open(url, '_blank');
        } else {
            console.error('Link not found for key:', linkKey);
            alert('Link not found');
        }
    }

    function updateLinkBox(linkKey) {
        const url = links[linkKey];
        const linkBox = document.getElementById('linkBox');
        const dynamicLink = document.getElementById('dynamicLink');
        
        if (url) {
            dynamicLink.href = url;
            dynamicLink.textContent = `Click here to open the link for ${linkKey.replace(/([A-Z])/g, ' $1').toUpperCase()}`;
            linkBox.style.display = 'block';
        } else {
            linkBox.style.display = 'none';
        }
    }

    function showPasswordModal(role) {
        const modal = document.getElementById('passwordModal');
        const passwordInput = document.getElementById('passwordInput');
        const submitPassword = document.getElementById('submitPassword');
        const closeModal = document.querySelector('#passwordModal .close');
        const passwordError = document.getElementById('passwordError');

        if (!modal || !passwordInput || !submitPassword || !closeModal || !passwordError) {
            console.error('Required modal elements are missing.');
            return;
        }

        // Clear error message and password input on modal show
        passwordError.style.display = 'none';
        passwordInput.value = '';

        submitPassword.onclick = () => {
            const enteredPassword = passwordInput.value;
            const correctPassword = role === 'optManager' ? '1' : '2';
            if (enteredPassword === correctPassword) {
                window.open(operationLinks[role].link, '_blank');
                modal.style.display = 'none';
            } else {
                passwordError.style.display = 'block';
                passwordInput.value = ''; // Clear the password input
                console.log('Incorrect password');
            }
        };

        closeModal.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };

        modal.style.display = 'block'; // Show the modal
    }

    document.getElementById('linkDropdown').addEventListener('change', (event) => {
        const value = event.target.value;
        if (value && value !== 'default') {
            redirectTo(value);
            updateLinkBox(value);
        } else {
            document.getElementById('linkBox').style.display = 'none';
        }
    });

    document.getElementById('reviewDropdown').addEventListener('change', (event) => {
        const value = event.target.value;
        const rmLinks = document.getElementById('rmLinks');
        const asLinks = document.getElementById('asLinks');
        
        if (value === 'RM') {
            rmLinks.style.display = 'block';
            asLinks.style.display = 'none';
        } else if (value === 'AS') {
            asLinks.style.display = 'block';
            rmLinks.style.display = 'none';
        } else {
            rmLinks.style.display = 'none';
            asLinks.style.display = 'none';
        }
    });

    document.getElementById('operationDropdown').addEventListener('change', (event) => {
        const value = event.target.value;
        const operationLinksDiv = document.getElementById('operationLinks');
        const operationTableBody = document.getElementById('operationTableBody');
        
        if (value && value !== '') {
            operationTableBody.innerHTML = '';
            if (operationLinks[value]) {
                const { name, link } = operationLinks[value];
                const row = `<tr>
                                <td>${name}</td>
                                <td><a href="#" onclick="showPasswordModal('${value}'); return false;">Open Link</a></td>
                             </tr>`;
                operationTableBody.innerHTML += row;
                operationLinksDiv.style.display = 'block';
            }
        } else {
            operationLinksDiv.style.display = 'none';
        }
    });

    // Expose showPasswordModal to global scope
    window.showPasswordModal = showPasswordModal;
});
