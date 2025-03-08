/**
 * Centralized player data for Apex Athletic Club
 * This file contains all player information and helper functions
 * to access and validate player data across the application.
 */

// Player information database
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
    'IVAN2025': { fullName: 'Ivan Lyapunov', email: 'valgma82@gmail.com', phone: '', birthYear: 2015 },
    'HOLDEN2025': { fullName: 'Holden Hitchcock', email: 'hitchcock.derick@gmail.com', phone: '', birthYear: 2016 },
    'JACK2025': { fullName: 'Jack Warwick', email: 'ms.sarah.mck@gmail.com', phone: '', birthYear: 2015 },
    'MASATERU2025': { fullName: 'Masateru Ishigaki', email: 'masatomo.ishigaki.izumi@gmail.com', phone: '0908742862', birthYear: 2014 }
};

/**
 * Get player information by invite code
 * @param {string} code - The player's invite code
 * @returns {Object|null} Player information or null if not found
 */
function getPlayerByCode(code) {
    return playerInfo[code] || null;
}

/**
 * Validate if an invite code exists
 * @param {string} code - The invite code to validate
 * @returns {boolean} True if code is valid, false otherwise
 */
function isValidInviteCode(code) {
    return code in playerInfo;
}

/**
 * Get all valid invite codes
 * @returns {Array} Array of all valid invite codes
 */
function getAllInviteCodes() {
    return Object.keys(playerInfo);
}

/**
 * Parse player name into first and last name
 * @param {string} fullName - The player's full name
 * @returns {Object} Object with firstName and lastName properties
 */
function parsePlayerName(fullName) {
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    return { firstName, lastName };
}

/**
 * Format phone number for display
 * @param {string} phone - The phone number to format
 * @returns {string} Formatted phone number
 */
function formatPhoneNumber(phone) {
    if (!phone) return '';
    
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX if 10 digits
    if (digits.length === 10) {
        return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
    }
    
    // Return original if not 10 digits
    return phone;
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getPlayerByCode,
        isValidInviteCode,
        getAllInviteCodes,
        parsePlayerName,
        formatPhoneNumber
    };
} 