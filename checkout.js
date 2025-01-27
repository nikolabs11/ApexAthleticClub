document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = '/';
        return;
    }

    // Get invite code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('code');
    
    // Verify code against valid codes
    const validCodes = [/* same list as in invite.html */];
    if (!validCodes.includes(inviteCode)) {
        alert('Invalid invite code');
        window.location.href = '/';
    }

    const stripe = Stripe('your_publishable_key_here');
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    let currentStep = 1;
    const steps = document.querySelectorAll('.checkout-step');

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

    document.getElementById('submit-payment').addEventListener('click', async (e) => {
        e.preventDefault();
        const { error