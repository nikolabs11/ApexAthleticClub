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
        document.getElementById('program-details').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Initialize Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'NEXT';
    nextButton.id = 'next-step';
    nextButton.className = 'hidden';
    document.querySelector('.program-content').appendChild(nextButton);
}); 