// DOM elements
const birthForm = document.getElementById('birthForm');
const compatibilityForm = document.getElementById('compatibilityForm');
const generateBtn = document.getElementById('generateBtn');
const compatibilityBtn = document.getElementById('compatibilityBtn');
const resultsDiv = document.getElementById('results');
const compatibilityResultsDiv = document.getElementById('compatibilityResults');

// Chart type selector
const chartTypeBtns = document.querySelectorAll('.chart-type-btn');
const chartForms = document.querySelectorAll('.chart-form');

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

// Chart type selector functionality
chartTypeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.dataset.type;
        
        // Update active button
        chartTypeBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Show/hide forms
        chartForms.forEach(form => {
            form.classList.remove('active');
            if (form.id === (type === 'single' ? 'birthForm' : 'compatibilityForm')) {
                form.classList.add('active');
            }
        });
        
        // Hide results
        resultsDiv.classList.add('hidden');
        compatibilityResultsDiv.classList.add('hidden');
    });
});

// Event listener for single chart form submission
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

// Event listener for compatibility form submission
compatibilityForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting
    
    // Get form values for person 1
    const person1Name = document.getElementById('person1-name').value;
    const person1Birthdate = document.getElementById('person1-birthdate').value;
    const person1Birthtime = document.getElementById('person1-birthtime').value;
    const person1Birthlocation = document.getElementById('person1-birthlocation').value;
    
    // Get form values for person 2
    const person2Name = document.getElementById('person2-name').value;
    const person2Birthdate = document.getElementById('person2-birthdate').value;
    const person2Birthtime = document.getElementById('person2-birthtime').value;
    const person2Birthlocation = document.getElementById('person2-birthlocation').value;
    
    // Validate that all fields are filled
    if (!person1Name || !person1Birthdate || !person1Birthtime || !person1Birthlocation ||
        !person2Name || !person2Birthdate || !person2Birthtime || !person2Birthlocation) {
        alert('Please fill in all fields for both persons');
        return;
    }
    
    // Generate compatibility analysis
    generateCompatibilityAnalysis(
        person1Name, person1Birthdate, person1Birthtime, person1Birthlocation,
        person2Name, person2Birthdate, person2Birthtime, person2Birthlocation
    );
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

// Function to generate compatibility analysis
function generateCompatibilityAnalysis(
    person1Name, person1Birthdate, person1Birthtime, person1Birthlocation,
    person2Name, person2Birthdate, person2Birthtime, person2Birthlocation
) {
    try {
        // Generate charts for both persons
        const person1Chart = calculateVedicChart(person1Birthdate, person1Birthtime, person1Birthlocation);
        const person2Chart = calculateVedicChart(person2Birthdate, person2Birthtime, person2Birthlocation);
        
        // Calculate compatibility scores
        const compatibility = calculateCompatibility(person1Chart, person2Chart);
        
        // Display compatibility results
        displayCompatibilityResults(compatibility, person1Name, person2Name);
        
    } catch (error) {
        console.error('Error generating compatibility analysis:', error);
        alert('Error generating compatibility analysis. Please try again.');
    }
}

// Calculate compatibility between two charts
function calculateCompatibility(chart1, chart2) {
    // Rashi compatibility (Guna Milan)
    const rashiScore = calculateRashiCompatibility(chart1.rashi, chart2.rashi);
    
    // Nakshatra compatibility
    const nakshatraScore = calculateNakshatraCompatibility(chart1.nakshatra, chart2.nakshatra);
    
    // Planetary compatibility
    const planetaryScore = calculatePlanetaryCompatibility(chart1.planetaryPositions, chart2.planetaryPositions);
    
    // Calculate overall score
    const overallScore = Math.round((rashiScore + nakshatraScore + planetaryScore) / 3);
    
    return {
        overall: overallScore,
        rashi: rashiScore,
        nakshatra: nakshatraScore,
        planetary: planetaryScore,
        chart1: chart1,
        chart2: chart2
    };
}

// Calculate Rashi compatibility (Guna Milan)
function calculateRashiCompatibility(rashi1, rashi2) {
    // Extract sign names from rashi strings
    const sign1 = rashi1.split(' ')[0];
    const sign2 = rashi2.split(' ')[0];
    
    // Rashi compatibility matrix (simplified)
    const compatibilityMatrix = {
        'Mesha': { 'Mesha': 75, 'Vrishabha': 60, 'Mithuna': 80, 'Karka': 70, 'Simha': 85, 'Kanya': 65, 'Tula': 75, 'Vrishchika': 90, 'Dhanu': 80, 'Makara': 70, 'Kumbha': 65, 'Meena': 75 },
        'Vrishabha': { 'Mesha': 60, 'Vrishabha': 80, 'Mithuna': 70, 'Karka': 85, 'Simha': 65, 'Kanya': 90, 'Tula': 80, 'Vrishchika': 70, 'Dhanu': 75, 'Makara': 85, 'Kumbha': 80, 'Meena': 70 },
        'Mithuna': { 'Mesha': 80, 'Vrishabha': 70, 'Mithuna': 75, 'Karka': 65, 'Simha': 80, 'Kanya': 70, 'Tula': 85, 'Vrishchika': 75, 'Dhanu': 90, 'Makara': 65, 'Kumbha': 85, 'Meena': 80 },
        'Karka': { 'Mesha': 70, 'Vrishabha': 85, 'Mithuna': 65, 'Karka': 80, 'Simha': 75, 'Kanya': 85, 'Tula': 70, 'Vrishchika': 80, 'Dhanu': 65, 'Makara': 90, 'Kumbha': 70, 'Meena': 85 },
        'Simha': { 'Mesha': 85, 'Vrishabha': 65, 'Mithuna': 80, 'Karka': 75, 'Simha': 75, 'Kanya': 70, 'Tula': 80, 'Vrishchika': 85, 'Dhanu': 90, 'Makara': 65, 'Kumbha': 80, 'Meena': 75 },
        'Kanya': { 'Mesha': 65, 'Vrishabha': 90, 'Mithuna': 70, 'Karka': 85, 'Simha': 70, 'Kanya': 80, 'Tula': 85, 'Vrishchika': 75, 'Dhanu': 70, 'Makara': 90, 'Kumbha': 85, 'Meena': 80 },
        'Tula': { 'Mesha': 75, 'Vrishabha': 80, 'Mithuna': 85, 'Karka': 70, 'Simha': 80, 'Kanya': 85, 'Tula': 75, 'Vrishchika': 70, 'Dhanu': 85, 'Makara': 80, 'Kumbha': 90, 'Meena': 85 },
        'Vrishchika': { 'Mesha': 90, 'Vrishabha': 70, 'Mithuna': 75, 'Karka': 80, 'Simha': 85, 'Kanya': 75, 'Tula': 70, 'Vrishchika': 75, 'Dhanu': 80, 'Makara': 85, 'Kumbha': 75, 'Meena': 90 },
        'Dhanu': { 'Mesha': 80, 'Vrishabha': 75, 'Mithuna': 90, 'Karka': 65, 'Simha': 90, 'Kanya': 70, 'Tula': 85, 'Vrishchika': 80, 'Dhanu': 75, 'Makara': 70, 'Kumbha': 85, 'Meena': 90 },
        'Makara': { 'Mesha': 70, 'Vrishabha': 85, 'Mithuna': 65, 'Karka': 90, 'Simha': 65, 'Kanya': 90, 'Tula': 80, 'Vrishchika': 85, 'Dhanu': 70, 'Makara': 80, 'Kumbha': 75, 'Meena': 85 },
        'Kumbha': { 'Mesha': 65, 'Vrishabha': 80, 'Mithuna': 85, 'Karka': 70, 'Simha': 80, 'Kanya': 85, 'Tula': 90, 'Vrishchika': 75, 'Dhanu': 85, 'Makara': 75, 'Kumbha': 75, 'Meena': 80 },
        'Meena': { 'Mesha': 75, 'Vrishabha': 70, 'Mithuna': 80, 'Karka': 85, 'Simha': 75, 'Kanya': 80, 'Tula': 85, 'Vrishchika': 90, 'Dhanu': 90, 'Makara': 85, 'Kumbha': 80, 'Meena': 80 }
    };
    
    return compatibilityMatrix[sign1]?.[sign2] || 70;
}

// Calculate Nakshatra compatibility
function calculateNakshatraCompatibility(nakshatra1, nakshatra2) {
    // Simplified Nakshatra compatibility based on groups
    const nakshatraGroups = {
        'Ashwini': 1, 'Bharani': 1, 'Krittika': 1,
        'Rohini': 2, 'Mrigashira': 2, 'Ardra': 2,
        'Punarvasu': 3, 'Pushya': 3, 'Ashlesha': 3,
        'Magha': 4, 'Purva Phalguni': 4, 'Uttara Phalguni': 4,
        'Hasta': 5, 'Chitra': 5, 'Swati': 5,
        'Vishakha': 6, 'Anuradha': 6, 'Jyeshtha': 6,
        'Mula': 7, 'Purva Ashadha': 7, 'Uttara Ashadha': 7,
        'Shravana': 8, 'Dhanishta': 8, 'Shatabhisha': 8,
        'Purva Bhadrapada': 9, 'Uttara Bhadrapada': 9, 'Revati': 9
    };
    
    const group1 = nakshatraGroups[nakshatra1] || 1;
    const group2 = nakshatraGroups[nakshatra2] || 1;
    
    // Same group = high compatibility, adjacent groups = medium, opposite = low
    if (group1 === group2) return 85;
    if (Math.abs(group1 - group2) === 1 || Math.abs(group1 - group2) === 8) return 75;
    if (Math.abs(group1 - group2) === 4) return 60;
    return 70;
}

// Calculate planetary compatibility
function calculatePlanetaryCompatibility(planets1, planets2) {
    let totalScore = 0;
    let planetCount = 0;
    
    for (let planet in planets1) {
        if (planets2[planet]) {
            const diff = Math.abs(planets1[planet] - planets2[planet]);
            // Planets in same sign (0-30 degrees apart) = high compatibility
            // Planets in adjacent signs (30-60 degrees apart) = medium compatibility
            // Planets in opposite signs (150-180 degrees apart) = low compatibility
            if (diff <= 30) totalScore += 85;
            else if (diff <= 60) totalScore += 75;
            else if (diff >= 150 && diff <= 180) totalScore += 60;
            else totalScore += 70;
            planetCount++;
        }
    }
    
    return planetCount > 0 ? Math.round(totalScore / planetCount) : 70;
}

// Display compatibility results
function displayCompatibilityResults(compatibility, person1Name, person2Name) {
    // Update overall score
    document.getElementById('overallScore').textContent = compatibility.overall;
    
    // Update score description
    const scoreDescription = getScoreDescription(compatibility.overall);
    document.getElementById('scoreDescription').textContent = scoreDescription;
    
    // Update individual scores
    document.getElementById('rashiScore').textContent = compatibility.rashi + '%';
    document.getElementById('rashiLevel').textContent = getScoreLevel(compatibility.rashi);
    
    document.getElementById('nakshatraScore').textContent = compatibility.nakshatra + '%';
    document.getElementById('nakshatraLevel').textContent = getScoreLevel(compatibility.nakshatra);
    
    document.getElementById('planetaryScore').textContent = compatibility.planetary + '%';
    document.getElementById('planetaryLevel').textContent = getScoreLevel(compatibility.planetary);
    
    // Generate detailed analysis
    const analysis = generateCompatibilityAnalysis(compatibility, person1Name, person2Name);
    document.getElementById('compatibilityAnalysis').textContent = analysis;
    
    // Generate recommendations
    const recommendations = generateRecommendations(compatibility.overall);
    document.getElementById('recommendations').textContent = recommendations;
    
    // Show compatibility results
    compatibilityResultsDiv.classList.remove('hidden');
    compatibilityResultsDiv.scrollIntoView({ behavior: 'smooth' });
    
    console.log('Compatibility Analysis:', compatibility);
}

// Login/Signup Form Toggle
document.addEventListener('DOMContentLoaded', function() {
    const showSignupBtn = document.getElementById('showSignup');
    const showLoginBtn = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (showSignupBtn && showLoginBtn) {
        showSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
        });
        
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
        });
    }
    
    // Password Toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Login Form Submission
    const loginFormElement = document.getElementById('loginForm');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simulate login process
            console.log('Login attempt:', { email, password });
            alert('Login functionality will be implemented with backend integration.');
        });
    }
    
    // Signup Form Submission
    const signupFormElement = document.getElementById('signupForm');
    if (signupFormElement) {
        signupFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Simulate signup process
            console.log('Signup attempt:', { name, email, password });
            alert('Signup functionality will be implemented with backend integration.');
        });
    }
});

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            // Simulate form submission
            console.log('Contact form submitted:', Object.fromEntries(formData));
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

// Get score description
function getScoreDescription(score) {
    if (score >= 80) return 'Excellent Compatibility';
    if (score >= 70) return 'Good Compatibility';
    if (score >= 60) return 'Moderate Compatibility';
    return 'Challenging Compatibility';
}

// Get score level
function getScoreLevel(score) {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Moderate';
    return 'Challenging';
}

// Generate detailed compatibility analysis
function generateCompatibilityAnalysis(compatibility, person1Name, person2Name) {
    let analysis = `${person1Name} and ${person2Name} have a ${getScoreDescription(compatibility.overall).toLowerCase()} with an overall score of ${compatibility.overall}%. `;
    
    analysis += `Their Rashi compatibility is ${compatibility.rashi}%, indicating ${getScoreLevel(compatibility.rashi).toLowerCase()} harmony in their basic nature and personality traits. `;
    
    analysis += `The Nakshatra compatibility score of ${compatibility.nakshatra}% suggests ${getScoreLevel(compatibility.nakshatra).toLowerCase()} compatibility in their deeper spiritual and emotional connection. `;
    
    analysis += `With a planetary compatibility of ${compatibility.planetary}%, their planetary influences show ${getScoreLevel(compatibility.planetary).toLowerCase()} alignment. `;
    
    if (compatibility.overall >= 80) {
        analysis += `This is a highly compatible combination that suggests strong potential for a harmonious relationship.`;
    } else if (compatibility.overall >= 70) {
        analysis += `This combination shows good potential with some areas that may require understanding and compromise.`;
    } else if (compatibility.overall >= 60) {
        analysis += `This combination has moderate compatibility and may require more effort and understanding to build a strong relationship.`;
    } else {
        analysis += `This combination may face challenges, but with mutual understanding and effort, a relationship can still be successful.`;
    }
    
    return analysis;
}

// Generate recommendations
function generateRecommendations(score) {
    if (score >= 80) {
        return "This is an excellent match! Focus on maintaining the strong foundation you have. Consider activities that strengthen your spiritual and emotional bond. Regular meditation or spiritual practices together can enhance your already strong compatibility.";
    } else if (score >= 70) {
        return "This is a good match with room for growth. Focus on communication and understanding each other's needs. Consider wearing compatible gemstones and performing mutual remedies to strengthen your bond. Regular date nights and shared activities will help build stronger connections.";
    } else if (score >= 60) {
        return "This combination requires more effort and understanding. Focus on open communication and compromise. Consider consulting a Vedic astrologer for specific remedies. Practice patience and understanding in your relationship. Regular spiritual practices together can help improve compatibility.";
    } else {
        return "This combination may face challenges, but don't lose hope. Focus on understanding and accepting each other's differences. Consider professional astrological consultation for specific remedies. Practice patience, communication, and mutual respect. Remember that love and understanding can overcome many astrological challenges.";
    }
}
