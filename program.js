document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = '/';
        return;
    }

    VANTA.CELLS({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        color1: 0x045034,
        color2: 0x109963,
        size: 0.20,
        speed: 0.00
    });

    document.getElementById('learn-more').addEventListener('click', () => {
        document.querySelector('.program-content').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Initialize Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'NEXT';
    nextButton.id = 'next-step';
    nextButton.className = 'hidden';
    document.querySelector('.program-content').appendChild(nextButton);

    const programContent = document.querySelector('.program-content');

    nextButton.addEventListener('click', () => {
        // Logic to move to the next step
        // For now, just simulate moving to the next step
        if (!document.getElementById('back-step')) {
            const backButton = document.createElement('button');
            backButton.id = 'back-step';
            backButton.textContent = 'BACK';
            backButton.style.margin = '10px auto';
            backButton.style.display = 'block';
            backButton.style.background = '#045034';
            backButton.style.color = 'white';
            backButton.style.border = 'none';
            backButton.style.width = '200px';
            backButton.style.padding = '10px';
            backButton.style.cursor = 'pointer';
            backButton.style.transition = 'background 0.3s ease';
            backButton.addEventListener('click', () => {
                // Logic to go back to the previous step
                // For now, just simulate going back
                programContent.scrollIntoView({ behavior: 'smooth' });
            });
            programContent.appendChild(backButton);
        }
    });

    // Example: Ensure scrollToTop is only called when transitioning sections
    function scrollToTop() {
        const whiteBackgroundElement = document.querySelector('.program-content:not([style*="display: none"])');
        if (whiteBackgroundElement) {
            whiteBackgroundElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Check event listeners for repeated triggers
    document.getElementById('build-program').addEventListener('click', function() {
        document.querySelector('.program-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}); 