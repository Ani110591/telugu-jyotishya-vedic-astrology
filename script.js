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

// Planetary symbols and names
const PLANETS = {
    'Sun': { symbol: '☉', name: 'Sun' },
    'Moon': { symbol: '☽', name: 'Moon' },
    'Mars': { symbol: '♂', name: 'Mars' },
    'Mercury': { symbol: '☿', name: 'Mercury' },
    'Jupiter': { symbol: '♃', name: 'Jupiter' },
    'Venus': { symbol: '♀', name: 'Venus' },
    'Saturn': { symbol: '♄', name: 'Saturn' }
};

// House names in Vedic astrology
const HOUSE_NAMES = {
    1: 'Lagna (Ascendant)',
    2: 'Dhana (Wealth)',
    3: 'Sahaja (Siblings)',
    4: 'Sukha (Happiness)',
    5: 'Putra (Children)',
    6: 'Ari (Enemies)',
    7: 'Kalatra (Spouse)',
    8: 'Ayush (Longevity)',
    9: 'Dharma (Religion)',
    10: 'Karma (Career)',
    11: 'Labha (Gains)',
    12: 'Vyaya (Losses)'
};

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
    
    // Calculate planetary positions for birth chart
    const planetaryPositions = calculatePlanetaryPositions(jdn);
    
    // Calculate house positions
    const housePositions = calculateHousePositions(ascendant, planetaryPositions);
    
    return {
        rashi: rashi,
        nakshatra: nakshatra,
        nakshatraPada: nakshatraPada,
        ascendant: ascendant,
        planetaryPositions: planetaryPositions,
        housePositions: housePositions
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

// Calculate planetary positions
function calculatePlanetaryPositions(jdn) {
    // Simplified planetary calculations
    // In real Vedic astrology, you would use precise ephemeris data
    
    const positions = {};
    const referenceJDN = 2451545.0;
    const daysSinceReference = jdn - referenceJDN;
    
    // Simplified mean motion calculations
    const meanMotions = {
        'Sun': 0.9856,      // degrees per day
        'Moon': 13.176,     // degrees per day
        'Mars': 0.524,      // degrees per day
        'Mercury': 1.383,   // degrees per day
        'Jupiter': 0.083,   // degrees per day
        'Venus': 1.2,       // degrees per day
        'Saturn': 0.034     // degrees per day
    };
    
    for (let planet in meanMotions) {
        let longitude = (daysSinceReference * meanMotions[planet]) % 360;
        if (longitude < 0) longitude += 360;
        positions[planet] = longitude;
    }
    
    return positions;
}

// Calculate house positions
function calculateHousePositions(ascendant, planetaryPositions) {
    // Get ascendant sign index
    const zodiacSigns = [
        'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)',
        'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)',
        'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
    ];
    
    const ascendantIndex = zodiacSigns.indexOf(ascendant);
    
    // Calculate house positions (simplified)
    const houses = {};
    for (let i = 1; i <= 12; i++) {
        const houseSignIndex = (ascendantIndex + i - 1) % 12;
        houses[i] = zodiacSigns[houseSignIndex];
    }
    
    // Determine which planets are in which houses
    const housePlanets = {};
    for (let i = 1; i <= 12; i++) {
        housePlanets[i] = [];
    }
    
    for (let planet in planetaryPositions) {
        const planetLongitude = planetaryPositions[planet];
        const planetSignIndex = Math.floor(planetLongitude / 30);
        const houseNumber = ((planetSignIndex - ascendantIndex + 12) % 12) + 1;
        housePlanets[houseNumber].push(planet);
    }
    
    return {
        signs: houses,
        planets: housePlanets
    };
}

// Populate birth chart visualization
function populateBirthChart(housePositions) {
    // Populate house signs
    for (let i = 1; i <= 12; i++) {
        const signElement = document.getElementById(`house${i}-sign`);
        const planetsElement = document.getElementById(`house${i}-planets`);
        
        if (signElement) {
            signElement.textContent = housePositions.signs[i];
        }
        
        if (planetsElement) {
            planetsElement.innerHTML = '';
            housePositions.planets[i].forEach(planet => {
                const planetSymbol = document.createElement('span');
                planetSymbol.className = 'planet-symbol';
                planetSymbol.textContent = PLANETS[planet].symbol;
                planetSymbol.title = `${PLANETS[planet].name} in ${housePositions.signs[i]}`;
                planetsElement.appendChild(planetSymbol);
            });
        }
    }
}

// Function to display Vedic results
function displayVedicResults(chart) {
    // Update the result elements
    document.getElementById('rashi').textContent = chart.rashi;
    document.getElementById('nakshatra').textContent = chart.nakshatra;
    document.getElementById('nakshatraPada').textContent = chart.nakshatraPada;
    document.getElementById('ascendant').textContent = chart.ascendant;
    
    // Populate the birth chart visualization
    if (chart.housePositions) {
        populateBirthChart(chart.housePositions);
    }
    
    // Show the results section
    resultsDiv.classList.remove('hidden');
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
    
    // Log detailed information
    console.log('Vedic Chart Results:', chart);
    console.log('House Positions:', chart.housePositions);
    console.log('Planetary Positions:', chart.planetaryPositions);
}
