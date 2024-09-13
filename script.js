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
        enterCode.classList.add('hidden');
        requestTrial.classList.add('hidden');

        // Create and append the SUBMIT button
        const submitButton = document.createElement('button');
        submitButton.id = 'submit-code';
        submitButton.innerHTML = '<span>SUBMIT</span>';
        actions.appendChild(submitButton);

        // Create and append the RETURN button
        const returnButton = document.createElement('button');
        returnButton.id = 'return';
        returnButton.innerHTML = '<span>RETURN</span>';
        actions.appendChild(returnButton);

        // Add event listener for the SUBMIT button
        submitButton.addEventListener('click', function() {
            const inviteCode = inviteCodeInput.value;
            const validCodes = ['CODE123', 'CODE456', 'CODE789'];

            if (validCodes.includes(inviteCode)) {
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'about.html';
            } else {
                alert('Invalid invite code. Please try again.');
            }
        });

        // Add event listener for the RETURN button
        returnButton.addEventListener('click', function() {
            hideInviteCodeInput();
        });
    }

    function hideInviteCodeInput() {
        inviteCodeInput.classList.add('hidden');
        enterCode.classList.remove('hidden');
        requestTrial.classList.remove('hidden');

        // Remove the dynamically created SUBMIT and RETURN buttons
        const submitButton = document.getElementById('submit-code');
        const returnButton = document.getElementById('return');
        if (submitButton) submitButton.remove();
        if (returnButton) returnButton.remove();
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
        }
    });

    requestTrial.addEventListener('click', function() {
        showSection(trialForm);
    });

    // Initially show only the content section with the learn more button
    showSection(content);
});