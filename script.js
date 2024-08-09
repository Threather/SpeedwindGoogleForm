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

    document.getElementById('linkDropdown').addEventListener('change', (event) => {
        const value = event.target.value;
        if (value) {
            if (value !== 'default') {
                redirectTo(value);
            } else {
                console.warn('No valid option selected');
            }
        }
    });
});
