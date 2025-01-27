document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = '/';
        return;
    }

    // Get invite code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('code');
    
    // Verify code against valid codes (use same list as invite.html)
    const validCodes = [
        'TESTCODE2024', 'AHRIK2024', 'HOLDEN2024', 'JERRY2024', 'VERDI2024', 'SERGEI2024',
        'SEAN2024', 'RAYYAN2024', 'ERIC2024', 'CAMBRIDGE2024', 'BLAISE2024', 'MASON2024',
        'JACKSON2024', 'OWEN2024', 'ZAYD2024', 'CONNOR2024', 'GABRIEL2024', 'CHANCE2024',
        'BRAELON2024', 'ALEXANDER2024', 'ELIAS2024', 'ADAM2024', 'IKER2024', 'BRANDON2024',
        'KAITO2024', 'GIBSON2024', 'LUKE2024', 'AYO2024', 'KIERAN2024', 'CAMERON2024',
        'ZINEDDINE2024', 'TIANTIAN2024', 'BLAKE2024', 'BRYAN2024', 'DAWSON2024', 'TY2024',
        'JAKE2024', 'KOSHI2024', 'ANTUAN2024', 'ELI2024', 'EDDI2024', 'LOCKAN2024',
        'MASSON2024', 'JOSE2024', 'GIOVANNI2024', 'JHONNATAN2024', 'LIAM2024', 'LUCAS2024',
        'IVAN2024', 'BEN2024', 'JACK2024', 'OLIVER2024', 'NEERAV2024', 'LOGAN2024',
        'JAXON2024', 'BENNETT2024', 'COOPER2024', 'JAMESON2024', 'ATHARV2024', 'KABIR2024',
        'SHRAVIN2024', 'AYAAN2024'
    ];
    
    if (!validCodes.includes(inviteCode)) {
        alert('Invalid invite code');
        window.location.href = '/';
        return;
    }

    const stripe = Stripe('your_publishable_key_here');
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    let currentStep = 1;
    const steps = document.querySelectorAll('.checkout-step');
    const progressSteps = document.querySelectorAll('.step');

    // Initialize checkout flow
    document.getElementById('checkout-flow').classList.remove('hidden');

    // Step validation function
    function validateStep(step) {
        const currentStepEl = document.querySelector(`[data-step="${step}"]`);
        const inputs = currentStepEl.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                input.reportValidity();
            }
        });

        return isValid;
    }

    // Progress update function
    function updateProgress() {
        progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index < currentStep);
        });
    }

    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (!validateStep(currentStep)) return;
            
            steps[currentStep - 1].classList.remove('active');
            currentStep++;
            steps[currentStep - 1].classList.add('active');
            updateProgress();
        });
    });

    // Handle payment submission
    document.getElementById('submit-payment').addEventListener('click', async (e) => {
        e.preventDefault();
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            document.getElementById('card-errors').textContent = error.message;
        } else {
            // Handle successful payment here
            console.log('PaymentMethod:', paymentMethod);
            alert('Payment successful! Enrollment complete.');
            window.location.href = '/confirmation.html';
        }
    });
});