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
    const inviteCodeInput = document.getElementById('invite-code');
    const requestTrial = document.getElementById('request-trial');
    const trialForm = document.getElementById('trial-form');

    function hideAllSections() {
        [content, actions, trialForm].forEach(el => {
            el.classList.add('hidden');
        });
    }

    function showSection(section) {
        hideAllSections();
        section.classList.remove('hidden');
    }

    function showInviteCodeInput() {
        inviteCodeInput.classList.remove('hidden');
        enterCode.textContent = 'SUBMIT';
        requestTrial.classList.add('hidden');
        back.classList.remove('hidden');
    }

    function hideInviteCodeInput() {
        inviteCodeInput.classList.add('hidden');
        enterCode.textContent = 'ENTER INVITE CODE';
        requestTrial.classList.remove('hidden');
        back.classList.remove('hidden');
    }

    learnMore.addEventListener('click', function() {
        showSection(actions);
    });

    back.addEventListener('click', function() {
        if (inviteCodeInput.classList.contains('hidden')) {
            showSection(content);
        } else {
            hideInviteCodeInput();
        }
    });

    enterCode.addEventListener('click', function() {
        if (inviteCodeInput.classList.contains('hidden')) {
            showInviteCodeInput();
        } else {
            const inviteCode = inviteCodeInput.value;
            // You would replace this with your actual invite codes
            const validCodes = ['CODE123', 'CODE456', 'CODE789'];

            if (validCodes.includes(inviteCode)) {
                // Store the successful login in localStorage
                localStorage.setItem('loggedIn', 'true');
                // Redirect to about page
                window.location.href = 'about.html';
            } else {
                alert('Invalid invite code. Please try again.');
            }
        }
    });

    requestTrial.addEventListener('click', function() {
        showSection(trialForm);
    });

    // Initially show only the content section with the learn more button
    showSection(content);
});