document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = '/invite.html';
        return;
    }

    document.getElementById('learn-more').addEventListener('click', () => {
        document.querySelector('.program-content').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Initialize Next button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'NEXT';
    nextButton.id = 'next-step';
    nextButton.className = 'hidden';
    document.querySelector('.program-content').appendChild(nextButton);

    const programContent = document.querySelector('.program-content');

    nextButton.addEventListener('click', () => {
        // Logic to move to the next step
        // For now, just simulate moving to the next step
        if (!document.getElementById('back-step')) {
            const backButton = document.createElement('button');
            backButton.id = 'back-step';
            backButton.textContent = 'BACK';
            backButton.style.margin = '10px auto';
            backButton.style.display = 'block';
            backButton.style.background = '#045034';
            backButton.style.color = 'white';
            backButton.style.border = 'none';
            backButton.style.width = '200px';
            backButton.style.padding = '10px';
            backButton.style.cursor = 'pointer';
            backButton.style.transition = 'background 0.3s ease';
            backButton.addEventListener('click', () => {
                // Logic to go back to the previous step
                // For now, just simulate going back
                programContent.scrollIntoView({ behavior: 'smooth' });
            });
            programContent.appendChild(backButton);
        }
    });

    // Fix build-program button
    const buildProgramButton = document.getElementById('build-program');
    if (buildProgramButton) {
        buildProgramButton.addEventListener('click', function(e) {
            e.preventDefault();
            const programContent = document.querySelector('.program-content');
            if (programContent) {
                programContent.style.display = 'block';
                setTimeout(() => {
                    programContent.scrollIntoView({ behavior: 'auto', block: 'start' });
                }, 50);
            }
        });
    }

    // Add this to hide form elements
    document.querySelectorAll('#inviteForm, #playerInfo').forEach(el => {
        el.style.display = 'none';
    });
}); 