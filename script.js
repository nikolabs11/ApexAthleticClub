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
    const backFromCode = document.getElementById('back-from-code');

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
            submitCodeButton.classList.remove('hidden');
            back.classList.remove('hidden'); // Show the main back button
            enterCode.classList.add('hidden');
            requestTrial.classList.add('hidden');
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
            if (inviteCodeInput.classList.contains('hidden')) {
                // If invite code input is hidden, we're in the main actions view
                content.classList.remove('hidden');
                actions.classList.add('hidden');
            } else {
                // If invite code input is visible, we're in the enter code view
                inviteCodeInput.classList.add('hidden');
                submitCodeButton.classList.add('hidden');
                enterCode.classList.remove('hidden');
                requestTrial.classList.remove('hidden');
            }
            inviteCodeInput.classList.add('hidden');
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
        submitCodeButton.addEventListener('click', function(event) {
            event.preventDefault();
            submitInviteCode();
        });
        console.log('Submit code button listener added');
    } else {
        console.error('Submit Code button not found');
    }

    if (inviteCodeInput) {
        inviteCodeInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitInviteCode();
            }
        });
        console.log('Invite code input listener added');
    } else {
        console.error('Invite code input not found');
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

    trialFormInputs.forEach((input, index) => {
        input.addEventListener('blur', function() {
            this.reportValidity();
        });

        input.addEventListener('input', function() {
            if (input.type === 'tel') {
                formatPhoneNumber(input);
            }
        });

        // Add this new event listener for keydown
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextInput = trialFormInputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                } else {
                    // If it's the last input, submit the form
                    trialForm.dispatchEvent(new Event('submit'));
                }
            }
        });
    });

    const submitTrialButton = document.getElementById('submit-trial');

    if (trialForm && submitTrialButton) {
        trialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (this.checkValidity()) {
                // Form is valid, submit it
                fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(new FormData(trialForm)).toString()
                })
                .then(() => {
                    console.log("Form successfully submitted");
                    alert("Thank you for your submission!");
                    trialForm.reset();
                    // Hide trial form and show actions
                    trialForm.classList.add('hidden');
                    document.getElementById('actions').classList.remove('hidden');
                })
                .catch((error) => {
                    console.error("Form submission error:", error);
                    alert("An error occurred. Please try again.");
                });
            } else {
                this.classList.add('submitted');
            }
        });
    }

    function onSubmit() {
        const form = document.getElementById("trial-form");
        const formData = new FormData(form);
        
        // For demonstration purposes, we'll just log the form data
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }
        
        // Clear the form and show a success message
        form.reset();
        alert("Thank you for your submission!");
    }

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

    const contentContainer = document.getElementById('content-container');

    // Show content container immediately
    contentContainer.classList.remove('hidden');

    // Check for invite code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('inviteCode');
    if (inviteCode) {
        inviteCodeInput.value = inviteCode;
        submitInviteCode();
    }

    // ... existing code ...
});

function submitInviteCode() {
    console.log('submitInviteCode function called');
    const inviteCodeInput = document.getElementById('invite-code');
    if (!inviteCodeInput) {
        console.error('Invite code input not found');
        return;
    }
    const code = inviteCodeInput.value.trim().toUpperCase();
    console.log('Submitting invite code:', code);
    
    if (code === '') {
        alert('Please enter an invite code.');
        return;
    }

    // Valid invite codes
    const validCodes = [
        'AHRIK2024', 'HOLDEN2024', 'JERRY2024', 'VERDI2024', 'SERGEI2024',
        'SEAN2024', 'RAYYAN2024', 'ERIC2024', 'CAMBRIDGE2024', 'BLAISE2024',
        'MASON2024', 'JACKSON2024', 'OWEN2024', 'ZAYD2024', 'CONNOR2024',
        'GABRIEL2024', 'CHANCE2024', 'BRAELON2024', 'ALEXANDER2024', 'ELIAS2024',
        'ADAM2024', 'IKER2024', 'BRANDON2024', 'KAITO2024', 'GIBSON2024',
        'LUKE2024', 'AYO2024', 'KIERAN2024', 'CAMERON2024', 'ZINEDDINE2024',
        'TIANTIAN2024', 'BLAKE2024', 'BRYAN2024', 'DAWSON2024', 'TY2024',
        'JAKE2024', 'KOSHI2024', 'ANTUAN2024', 'ELI2024', 'EDDI2024', 
        'LOCKAN2024', 'MASSON2024', 'JOSE2024', 'GIOVANNI2024', 'JHONNATAN2024',
        'LIAM2024', 'EDDI2024', 'LUCAS2024', 'IVAN2024', 'BEN2024',
        'JACK2024', 'OLIVER2024', 'NEERAV2024', 'LOGAN2024', 'JAXON2024',
        'BENNETT2024', 'COOPER2024', 'JAMESON2024', 'ATHARV2024', 'KABIR2024',
        'SHRAVIN2024' // Added Shravin
    ];

    if (validCodes.includes(code)) {
        localStorage.setItem('loggedIn', 'true');
        console.log('Redirecting to about.html');
        window.location.href = '/about';
    } else {
        alert('Invalid invite code. Please try again.');
    }
}
