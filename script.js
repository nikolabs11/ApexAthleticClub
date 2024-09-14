document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

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
    const backTrial = document.getElementById('back-trial');
    const submitCodeButton = document.getElementById('submit-code');

    console.log("Learn More button:", learnMore);
    console.log("Actions section:", actions);
    console.log("Enter Code button:", enterCode);
    console.log("Request Trial button:", requestTrial);
    console.log("Back button:", back);

    if (learnMore) {
        learnMore.addEventListener('click', function() {
            console.log('Learn More clicked');
            actions.classList.remove('hidden');
            content.classList.add('hidden');
            inviteCodeInput.classList.add('hidden'); // Hide invite code input
        });
    } else {
        console.error('Learn More button not found');
    }

    if (enterCode) {
        enterCode.addEventListener('click', function() {
            console.log('Enter Code clicked');
            inviteCodeInput.classList.remove('hidden');
        });
    } else {
        console.error('Enter Code button not found');
    }

    if (requestTrial) {
        requestTrial.addEventListener('click', function() {
            console.log('Request Trial clicked');
            trialForm.classList.remove('hidden');
            actions.classList.add('hidden');
            inviteCodeInput.classList.add('hidden'); // Hide invite code input
        });
    } else {
        console.error('Request Trial button not found');
    }

    if (back) {
        back.addEventListener('click', function() {
            console.log('Back clicked');
            content.classList.remove('hidden');
            actions.classList.add('hidden');
            inviteCodeInput.classList.add('hidden'); // Hide invite code input
        });
    } else {
        console.error('Back button not found');
    }

    if (backTrial) {
        backTrial.addEventListener('click', function() {
            console.log('Back Trial clicked');
            actions.classList.remove('hidden');
            trialForm.classList.add('hidden');
            inviteCodeInput.classList.add('hidden'); // Hide invite code input
        });
    } else {
        console.error('Back Trial button not found');
    }

    if (submitCodeButton) {
        submitCodeButton.addEventListener('click', function() {
            console.log('Submit Code clicked');
            submitInviteCode();
        });
    } else {
        console.error('Submit Code button not found');
    }

    function formatPhoneNumber(input) {
        let numbers = input.value.replace(/\D/g, '');
        let char = {0:'(',3:') ',6:'-'};
        input.value = '';
        for (let i = 0; i < numbers.length && i < 10; i++) {
            input.value += (char[i] || '') + numbers[i];
        }
    }

    const trialFormInputs = trialForm.querySelectorAll('input, select, textarea');

    trialFormInputs.forEach((input) => {
        input.addEventListener('blur', function() {
            this.reportValidity();
        });

        input.addEventListener('input', function() {
            if (input.type === 'tel') {
                formatPhoneNumber(input);
            }
        });
    });

    trialForm.addEventListener('submit', function(e) {
        if (!this.checkValidity()) {
            e.preventDefault();
            this.classList.add('submitted');
        }
    });

    function populateDayDropdown() {
        const daySelect = document.querySelector('select[name="birthDay"]');
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i.toString().padStart(2, '0');
            option.textContent = i;
            daySelect.appendChild(option);
        }
    }

    function populateYearDropdown() {
        const yearSelect = document.querySelector('select[name="birthYear"]');
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 100; i--) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    }

    populateDayDropdown();
    populateYearDropdown();
});
