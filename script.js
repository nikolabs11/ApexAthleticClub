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
    const inviteCodeForm = document.getElementById('invite-code-form');
    const trialForm = document.getElementById('trial-form');
    const submitCode = document.getElementById('submit-code');
    const submitTrial = document.getElementById('submit-trial');
    const inviteCodeInput = document.getElementById('invite-code-input');
    const backInvite = document.getElementById('back-invite');
    const backTrial = document.getElementById('back-trial');

    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');

    const validCodes = ['CODE123', 'CODE456', 'CODE789']; // Example valid codes

    function hideAllSections() {
        [content, actions, inviteCodeForm, trialForm].forEach(el => {
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

    backInvite.addEventListener('click', function() {
        showSection(actions);
    });

    backTrial.addEventListener('click', function() {
        showSection(actions);
    });

    enterCode.addEventListener('click', function() {
        showSection(inviteCodeForm);
    });

    requestTrial.addEventListener('click', function() {
        showSection(trialForm);
    });

    submitCode.addEventListener('click', function() {
        const enteredCode = inviteCodeInput.value.trim().toUpperCase();
        if (validCodes.includes(enteredCode)) {
            sessionStorage.setItem('inviteCode', enteredCode);
            window.location.href = 'about.html';
        } else {
            alert('Invalid code. Please try again.');
        }
    });

    submitTrial.addEventListener('click', function() {
        let isValid = true;
        const requiredInputs = document.querySelectorAll('#trial-form input:not(#comments)');
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('invalid');
            } else {
                input.classList.remove('invalid');
            }
        });

        validateEmail();
        validatePhone();

        if (isValid && !emailInput.classList.contains('invalid') && !phoneInput.classList.contains('invalid')) {
            alert('Trial request submitted. We will contact you soon.');
            showSection(content);
        } else {
            alert('Please fill in all required fields correctly.');
        }
    });

    function validateEmail() {
        const email = emailInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Please enter a valid email address (e.g., example@example.com).';
            emailError.style.display = 'block';
        } else {
            emailInput.classList.remove('invalid');
            emailError.style.display = 'none';
        }
    }

    function validatePhone() {
        const phone = phoneInput.value;
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phone)) {
            phoneInput.classList.add('invalid');
            phoneError.textContent = 'Please enter a valid 10-digit phone number (e.g., 1234567890).';
            phoneError.style.display = 'block';
        } else {
            phoneInput.classList.remove('invalid');
            phoneError.style.display = 'none';
        }
    }

    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);

    const formInputs = document.querySelectorAll('#trial-form input, #trial-form textarea');
    formInputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (index < formInputs.length - 1) {
                    formInputs[index + 1].focus();
                } else {
                    submitTrial.click();
                }
            }
        });
    });

    inviteCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitCode.click();
        }
    });

    // Initially show only the content section with the learn more button
    showSection(content);
});