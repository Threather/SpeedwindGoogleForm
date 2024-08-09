document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');

    const links = {
        updateProfile: 'https://docs.google.com/forms/d/e/1FAIpQLScPzSWH0y2k4K1uLexol1CBc-8AiGSfx7hFFERGRi1af4eECw/viewform?usp=sf_link',
        dropOrder: 'https://docs.google.com/forms/d/e/1FAIpQLSch5H3r93YRy1lwRIfJay5FIL833uN9LMk5qvzamI7WC_LzAg/viewform',
        cancelOrder: 'https://docs.google.com/forms/d/e/1FAIpQLScTYjf3rkQmTrbwPiJ8no6lDFd3d0ntMY7E2Ji7Qd07ASUGKA/viewform'
    };

    function redirectTo(linkKey) {
        console.log(`Redirecting to: ${linkKey}`);
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

    // Handle linkDropdown change
    document.getElementById('linkDropdown').addEventListener('change', (event) => {
        const value = event.target.value;
        if (value && value !== 'default') {
            redirectTo(value); // Open in new tab
            updateLinkBox(value); // Update link box
        } else {
            document.getElementById('linkBox').style.display = 'none';
        }
    });

    // Show/hide links based on reviewDropdown selection
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
});
