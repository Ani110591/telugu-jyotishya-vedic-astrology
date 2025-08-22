// DOM elements
const birthForm = document.getElementById('birthForm');
const generateBtn = document.getElementById('generateBtn');
const resultsDiv = document.getElementById('results');

// Vedic Astrology Constants
const NAKSHATRAS = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
    'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
    'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
    'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
    'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

const RASHIS = [
    'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)',
    'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)',
    'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
];

const NAKSHATRA_RASHI_MAPPING = {
    'Ashwini': 'Mesha (Aries)', 'Bharani': 'Mesha (Aries)', 'Krittika': 'Mesha (Aries)',
    'Rohini': 'Vrishabha (Taurus)', 'Mrigashira': 'Vrishabha (Taurus)',
    'Ardra': 'Mithuna (Gemini)', 'Punarvasu': 'Mithuna (Gemini)',
    'Pushya': 'Karka (Cancer)', 'Ashlesha': 'Karka (Cancer)',
    'Magha': 'Simha (Leo)', 'Purva Phalguni': 'Simha (Leo)', 'Uttara Phalguni': 'Simha (Leo)',
    'Hasta': 'Kanya (Virgo)', 'Chitra': 'Kanya (Virgo)',
    'Swati': 'Tula (Libra)', 'Vishakha': 'Tula (Libra)',
    'Anuradha': 'Vrishchika (Scorpio)', 'Jyeshtha': 'Vrishchika (Scorpio)',
    'Mula': 'Dhanu (Sagittarius)', 'Purva Ashadha': 'Dhanu (Sagittarius)', 'Uttara Ashadha': 'Dhanu (Sagittarius)',
    'Shravana': 'Makara (Capricorn)', 'Dhanishta': 'Makara (Capricorn)',
    'Shatabhisha': 'Kumbha (Aquarius)', 'Purva Bhadrapada': 'Kumbha (Aquarius)', 'Uttara Bhadrapada': 'Kumbha (Aquarius)',
    'Revati': 'Meena (Pisces)'
};

// Event listener for form submission
birthForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting
    
    // Get form values
    const birthdate = document.getElementById('birthdate').value;
    const birthtime = document.getElementById('birthtime').value;
    const birthlocation = document.getElementById('birthlocation').value;
    
    // Log values to console to confirm they are captured correctly
    console.log('Birth Date:', birthdate);
    console.log('Birth Time:', birthtime);
    console.log('Birth Location:', birthlocation);
    
    // Validate that all fields are filled
    if (!birthdate || !birthtime || !birthlocation) {
        alert('Please fill in all fields');
        return;
    }
    
    // Generate Vedic astrological chart
    generateVedicChart(birthdate, birthtime, birthlocation);
});

// Function to generate Vedic astrological chart
function generateVedicChart(birthdate, birthtime, birthlocation) {
    try {
        const chart = calculateVedicChart(birthdate, birthtime, birthlocation);
        displayVedicResults(chart);
    } catch (error) {
        console.error('Error generating Vedic chart:', error);
        alert('Error generating chart. Please try again.');
    }
}

// Vedic chart calculation function
function calculateVedicChart(birthdate, birthtime, birthlocation) {
    const date = new Date(birthdate + 'T' + birthtime);
    
    // Calculate Julian Day Number for Vedic calculations
    const jdn = calculateJulianDay(date);
    
    // Calculate Moon's position (simplified)
    const moonPosition = calculateMoonPosition(jdn);
    
    // Calculate Nakshatra
    const nakshatra = calculateNakshatra(moonPosition);
    
    // Calculate Rashi (Moon sign)
    const rashi = calculateRashi(moonPosition);
    
    // Calculate Nakshatra Pada
    const nakshatraPada = calculateNakshatraPada(moonPosition);
    
    // Calculate Ascendant (Lagna) - simplified
    const ascendant = calculateAscendant(date, birthlocation);
    
    return {
        rashi: rashi,
        nakshatra: nakshatra,
        nakshatraPada: nakshatraPada,
        ascendant: ascendant
    };
}

// Calculate Julian Day Number
function calculateJulianDay(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    let jd = 367 * year - Math.floor(7 * (year + Math.floor((month + 9) / 12)) / 4) + 
             Math.floor(275 * month / 9) + day + 1721013.5;
    
    // Add time component
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    
    jd += (hour - 12) / 24 + minute / 1440 + second / 86400;
    
    return jd;
}

// Simplified Moon position calculation
function calculateMoonPosition(jdn) {
    // This is a simplified calculation
    // In real Vedic astrology, you would use precise ephemeris data
    
    // Moon's mean motion is approximately 13.176 degrees per day
    const moonMeanMotion = 13.176;
    
    // Calculate days since a reference date (simplified)
    const referenceJDN = 2451545.0; // January 1, 2000
    const daysSinceReference = jdn - referenceJDN;
    
    // Calculate Moon's longitude
    let moonLongitude = (daysSinceReference * moonMeanMotion) % 360;
    if (moonLongitude < 0) moonLongitude += 360;
    
    return moonLongitude;
}

// Calculate Nakshatra based on Moon's position
function calculateNakshatra(moonLongitude) {
    // Each Nakshatra spans 13°20' (13.333 degrees)
    const nakshatraSpan = 13.333;
    const nakshatraIndex = Math.floor(moonLongitude / nakshatraSpan);
    
    return NAKSHATRAS[nakshatraIndex % 27];
}

// Calculate Rashi based on Moon's position
function calculateRashi(moonLongitude) {
    // Each Rashi spans 30 degrees
    const rashiSpan = 30;
    const rashiIndex = Math.floor(moonLongitude / rashiSpan);
    
    return RASHIS[rashiIndex % 12];
}

// Calculate Nakshatra Pada
function calculateNakshatraPada(moonLongitude) {
    // Each Nakshatra has 4 padas, each spanning 3°20' (3.333 degrees)
    const padaSpan = 3.333;
    const nakshatraSpan = 13.333;
    
    const nakshatraIndex = Math.floor(moonLongitude / nakshatraSpan);
    const positionInNakshatra = moonLongitude % nakshatraSpan;
    const padaIndex = Math.floor(positionInNakshatra / padaSpan) + 1;
    
    return padaIndex;
}

// Calculate Ascendant (Lagna)
function calculateAscendant(date, location) {
    // This is a very simplified calculation
    // Real ascendant calculation requires precise latitude, longitude, and time
    
    const hour = date.getHours();
    const zodiacSigns = [
        'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)',
        'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)',
        'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
    ];
    
    // Simplified calculation based on time
    const signIndex = Math.floor(hour / 2) % 12;
    return zodiacSigns[signIndex];
}

// Function to display Vedic results
function displayVedicResults(chart) {
    // Update the result elements
    document.getElementById('rashi').textContent = chart.rashi;
    document.getElementById('nakshatra').textContent = chart.nakshatra;
    document.getElementById('nakshatraPada').textContent = chart.nakshatraPada;
    document.getElementById('ascendant').textContent = chart.ascendant;
    
    // Show the results section
    resultsDiv.classList.remove('hidden');
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
    
    // Log detailed information
    console.log('Vedic Chart Results:', chart);
}
