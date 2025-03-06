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

// Updated invite code handling and form preload for program.html

function handleInviteCode(code) {
    const validCodes = [
        'AHRIK2025',
        'RAYYAN2025',
        'ELLIOT2025',
        'COOPER2025',
        'LOGAN2025',
        'KABIR2025',
        'SERGEI2025',
        'ERIC2025',
        'JERRY2025',
        'JAXON2025',
        'SHRAVIN2025',
        'ATHARV2025',
        'ANTONIO2025',
        'AYAAN2025',
        'CAMERON2025',
        'YUHI2025',
        'IVAN2025',
        'HOLDEN2025',
        'JACK2025',
        'MASATERU2025'
    ];
    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = 'block';
    loadingDiv.textContent = 'Checking invite code...';
    setTimeout(() => {
        if (validCodes.includes(code)) {
            loadingDiv.textContent = 'Valid invite code - redirecting...';
            setTimeout(() => {
                window.location.href = `program.html?inviteCode=${code}`;
            }, 1000);
        } else {
            loadingDiv.textContent = 'Invalid invite code';
            setTimeout(() => {
                loadingDiv.style.display = 'none';
            }, 2000);
        }
    }, 1500);
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('inviteCode');
    if (inviteCode) {
        displayPlayerInfo(inviteCode);
    }
});

function displayPlayerInfo(code) {
    const playerInfo = {
        'AHRIK2025': { fullName: 'Ahrik Mathur', email: 'smathurmd@gmail.com', phone: '(718) 986-1869', birthYear: 2015 },
        'RAYYAN2025': { fullName: 'Rayyan Shanti', email: 'heba2000_b@hotmail.com', phone: '(919) 840-8094', birthYear: 2015 },
        'ELLIOT2025': { fullName: 'Elliot Haxell', email: 'susanna.haxell@gmail.com', phone: '(919) 622-5755', birthYear: 2016 },
        'COOPER2025': { fullName: 'Cooper Young', email: 'laurafranklin919@aol.com', phone: '(919) 624-1961', birthYear: 2017 },
        'LOGAN2025': { fullName: 'Logan Carey', email: 'victoriamcarey@yahoo.com', phone: '(631) 291-0819', birthYear: 2016 },
        'KABIR2025': { fullName: 'Kabir Patel', email: 'krpatel_in@yahoo.com', phone: '(201) 993-3448', birthYear: 2015 },
        'SERGEI2025': { fullName: 'Sergei Ustenko', email: 'ustenko.a88@gmail.com', phone: '(984) 242-6834', birthYear: 2015 },
        'ERIC2025': { fullName: 'Eric Heggen', email: 'lchevis@gmail.com', phone: '704-619-0765', birthYear: 2015 },
        'JERRY2025': { fullName: 'Jerry Yuen', email: 'rockyyuen33@gmail.com', phone: '919-221-1055', birthYear: 2015 },
        'JAXON2025': { fullName: 'Jaxon Jenkins', email: 'joshua.jenkins.025@gmail.com', phone: '', birthYear: 2015 },
        'SHRAVIN2025': { fullName: 'Shravin Kancharla', email: 'Vinaybabu.k@gmail.com', phone: '919-593-4765', birthYear: 2016 },
        'ATHARV2025': { fullName: 'Atharv Kishan', email: 'Swathi.j3005@gmail.com', phone: '218-316-1727', birthYear: 2015 },
        'ANTONIO2025': { fullName: 'Antonio Loffredo', email: 'Raymond.Loffredo05@gmail.com', phone: '+1-703-853-5231', birthYear: 2015 },
        'AYAAN2025': { fullName: 'Ayaan Nettem', email: 'rajprasad.nettem@gmail.com', phone: '919-637-9026', birthYear: 2018 },
        'CAMERON2025': { fullName: 'Cameron Steed', email: 'tpsteed@gmail.com', phone: '+1-336-432-7793', birthYear: 2016 },
        'YUHI2025': { fullName: 'Yuhi Kaya', email: 'tkaya1984@gmail.com', phone: '919-710-5437', birthYear: 2015 },
        'IVAN2025': { fullName: 'Ivan Lyapunov', email: 'valgma82@gmail.com', phone: '', birthYear: '' },
        'HOLDEN2025': { fullName: 'Holden Hitchcock', email: 'hitchcock.derick@gmail.com', phone: '', birthYear: '' },
        'JACK2025': { fullName: 'Jack Warwick', email: 'ms.sarah.mck@gmail.com', phone: '', birthYear: '' },
        'MASATERU2025': { fullName: 'Masateru Ishigaki', email: 'masatomo.ishigaki.izumi@gmail.com', phone: '0908742862', birthYear: 2014 }
    };

    const info = playerInfo[code];
    if (info) {
        // Split full name into first and last name parts
        const [firstName, ...lastNameParts] = info.fullName.split(' ');
        const lastName = lastNameParts.join(' ');
        
        // Immediately populate the registration form fields
        document.getElementById('first-name').value = firstName || '';
        document.getElementById('last-name').value = lastName || '';
        document.getElementById('birth-year').value = info.birthYear || '';
        document.getElementById('email').value = info.email || '';
        document.getElementById('phone').value = info.phone || '';
        
        // Debug log to verify population
        console.log(`Preloading form for ${code}:`, {
            firstName: firstName,
            lastName: lastName,
            birthYear: info.birthYear,
            email: info.email,
            phone: info.phone
        });
        
        // If there is a visible player info section (optional), update that too
        const playerInfoDiv = document.getElementById('playerInfo');
        if (playerInfoDiv) {
            playerInfoDiv.style.display = 'block';
            document.getElementById('playerName').textContent = info.fullName || '';
            document.getElementById('playerYear').textContent = info.birthYear || '';
            document.getElementById('playerPhone').textContent = info.phone || '';
            document.getElementById('playerEmail').textContent = info.email || '';
        }
    } else {
        console.error(`No player info found for code: ${code}`);
    }
} 