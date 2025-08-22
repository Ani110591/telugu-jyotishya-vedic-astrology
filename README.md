# 🌟 Telugu Jyotishya - Vedic Astrology Chart Generator

A single-page web application that generates Vedic astrological charts based on birth date, time, and location using Telugu Jyotishya methods.

## Features

- **Birth Information Form**: Input fields for birth date, time, and location
- **Vedic Astrological Calculations**: Calculates Rashi (Moon sign), Nakshatra, Nakshatra Pada, and Ascendant (Lagna)
- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Real-time Results**: Displays calculated Vedic astrological placements instantly

## How to Use

1. Open `index.html` in your web browser
2. Fill in your birth date, time, and location
3. Click "Generate Chart" to see your Vedic astrological placements
4. View your Rashi, Nakshatra, Nakshatra Pada, and Ascendant

## Vedic Astrology Components

### Rashi (Moon Sign)
- The zodiac sign where the Moon was positioned at birth
- Each Rashi spans 30 degrees of the zodiac
- 12 Rashis: Mesha, Vrishabha, Mithuna, Karka, Simha, Kanya, Tula, Vrishchika, Dhanu, Makara, Kumbha, Meena

### Nakshatra
- The lunar mansion where the Moon was positioned at birth
- Each Nakshatra spans 13°20' (13.333 degrees)
- 27 Nakshatras: Ashwini, Bharani, Krittika, Rohini, Mrigashira, Ardra, Punarvasu, Pushya, Ashlesha, Magha, Purva Phalguni, Uttara Phalguni, Hasta, Chitra, Swati, Vishakha, Anuradha, Jyeshtha, Mula, Purva Ashadha, Uttara Ashadha, Shravana, Dhanishta, Shatabhisha, Purva Bhadrapada, Uttara Bhadrapada, Revati

### Nakshatra Pada
- Each Nakshatra is divided into 4 padas (quarters)
- Each pada spans 3°20' (3.333 degrees)
- Important for detailed Vedic astrology analysis

### Ascendant (Lagna)
- The zodiac sign rising on the eastern horizon at birth
- Determines the first house of the birth chart
- Requires precise birth time and location

## Technical Details

### Files Structure
- `index.html` - Main HTML structure with form and Vedic results display
- `style.css` - Modern styling with gradients and responsive design
- `script.js` - JavaScript logic for form handling and Vedic astrological calculations

### Astrological Libraries
The app uses multiple libraries for astronomical calculations:
- Swiss Ephemeris: `https://cdn.jsdelivr.net/npm/swisseph@0.5.17/lib/swisseph.min.js`
- Astrology.js: `https://unpkg.com/astrology.js@latest/dist/astrology.min.js`

### Vedic Calculations
- **Rashi**: Calculated based on Moon's position using 30-degree zodiac divisions
- **Nakshatra**: Calculated based on Moon's position using 13°20' divisions
- **Nakshatra Pada**: Calculated based on position within the Nakshatra
- **Ascendant**: Simplified calculation based on birth time

## Browser Compatibility
- Modern browsers with ES6 support
- Responsive design works on desktop and mobile devices

## Future Enhancements
- More accurate astronomical calculations using precise ephemeris data
- Additional planetary positions (Grahas)
- House system calculations (Bhava)
- Complete birth chart visualization (Kundali)
- Location geocoding for precise coordinates
- Dasha calculations
- Planetary aspects and relationships

## Note
This is a demonstration application with simplified Vedic astrological calculations. For professional Vedic astrological readings, consult with certified Jyotishis and use specialized software with precise ephemeris data. The calculations follow traditional Telugu Jyotishya methods but are simplified for educational purposes.
