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

    const learnMoreButton = document.getElementById('learn-more');
    const welcomeMessage = document.getElementById('welcome-message');
    const programDetails = document.getElementById('program-details');

    learnMoreButton.addEventListener('click', () => {
        welcomeMessage.style.opacity = '0';
        welcomeMessage.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            welcomeMessage.classList.add('hidden');
            programDetails.classList.add('active');
        }, 500);
    });
}); 