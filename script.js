document.addEventListener("DOMContentLoaded", function() {
    let vantaEffect = VANTA.CELLS({
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
        speed: 0.00,
    });

    const learnMore = document.getElementById('learn-more');
    const content = document.querySelector('.content');
    const actions = document.getElementById('actions');
    const back = document.getElementById('back');
    const enterCode = document.getElementById('enter-code');
    const requestTrial = document.getElementById('request-trial');
    const trialForm = document.getElementById('trial-form');
    const backTrial = document.getElementById('back-trial');

    function hideAllSections() {
        [content, actions, trialForm].forEach(el => {
            el.classList.add('hidden');
        });
    }

    function showSection(section) {
        hideAllSections();
        section.classList.remove('hidden');
    }

    learnMore.addEventListener('click', function() {
        showSection(actions);
    });

    back.addEventListener('click', function() {
        showSection(content);
    });

    backTrial.addEventListener('click', function() {
        showSection(actions);
    });

    enterCode.addEventListener('click', function() {
        window.location.href = '/about';
    });

    requestTrial.addEventListener('click', function() {
        showSection(trialForm);
    });

    // Initially show only the content section with the learn more button
    showSection(content);
});