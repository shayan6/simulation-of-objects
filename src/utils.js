export const getRandomSpeed = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
export const getRandomAngle = () => Math.random() * 360;

// new functions ###############################################################################
export const speedToDistanceInKm = (speedKmH, timeMs) => {
    const speedKmMs = speedKmH / 3600000;
    return speedKmMs * timeMs;
};

export function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

export function toDegrees(radians) {
    return (radians * 180) / Math.PI;
}

export function moveAlongGreatCircle(
    startLat,
    startLng,
    endLat,
    endLng,
    distanceTraveled
) {
    // Convert latitude and longitude from degrees to radians
    var φ1 = toRadians(startLat),
        φ2 = toRadians(endLat);
    var λ1 = toRadians(startLng),
        λ2 = toRadians(endLng);

    // Calculate the total distance between the two points
    var R = 6371; // Earth's radius in kilometers
    var Δφ = φ2 - φ1;
    var Δλ = λ2 - λ1;

    var a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c; // Total distance

    // Calculate fraction of the journey completed
    var fraction = distanceTraveled / d;

    // Calculate the new position
    var A = Math.sin((1 - fraction) * c) / Math.sin(c);
    var B = Math.sin(fraction * c) / Math.sin(c);

    var x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
    var y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
    var z = A * Math.sin(φ1) + B * Math.sin(φ2);

    var φ3 = Math.atan2(z, Math.sqrt(x * x + y * y));
    var λ3 = Math.atan2(y, x);

    return {
        lat: toDegrees(φ3),
        lng: toDegrees(λ3),
    };
}

export const distanceBetween2Points = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * (Math.PI / 180); // φ, λ in radians
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d / 1000; // in km
};


export function calculateBearing(startLat, startLng, destLat, destLng) {
    var φ1 = toRadians(startLat), φ2 = toRadians(destLat);
    var Δλ = toRadians(destLng - startLng);

    // Calculate bearing
    var y = Math.sin(Δλ) * Math.cos(φ2);
    var x = Math.cos(φ1) * Math.sin(φ2) -
        Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    var θ = Math.atan2(y, x);

    return toDegrees(θ); // Bearing in degrees
}


export function moveAlongCircularPath(startLat, startLng, centerLat, centerLng, distanceTraveled) {

    const radius = distanceBetween2Points(startLat, startLng, centerLat, centerLng);
    // Convert latitude and longitude from degrees to radians
    var φ1 = toRadians(startLat), λ1 = toRadians(startLng);
    var φC = toRadians(centerLat), λC = toRadians(centerLng);

    // Calculate the angular distance from the center to the start point
    var R = 6371; // Earth's radius in kilometers
    var angularDistance = radius / R;

    // Calculate bearing from the center to the start point
    var y = Math.sin(λ1 - λC) * Math.cos(φ1);
    var x = Math.cos(φC) * Math.sin(φ1) - Math.sin(φC) * Math.cos(φ1) * Math.cos(λ1 - λC);
    var initialBearing = Math.atan2(y, x);

    // Calculate the bearing change due to distance traveled
    var bearingChange = distanceTraveled / radius;

    // Calculate the new bearing from the center
    var finalBearing = initialBearing + bearingChange;

    // Calculate the new position
    var φ2 = Math.asin(Math.sin(φC) * Math.cos(angularDistance) + Math.cos(φC) * Math.sin(angularDistance) * Math.cos(finalBearing));
    var λ2 = λC + Math.atan2(Math.sin(finalBearing) * Math.sin(angularDistance) * Math.cos(φC), Math.cos(angularDistance) - Math.sin(φC) * Math.sin(φ2));

    return {
        lat: toDegrees(φ2),
        lng: toDegrees(λ2)
    };
}


// the popup content in string
export const getPopupContent = (speed, elapsedTime, position, distanceTraveled, bearing, tail) => {
    return `
        <div>
            <h3 style="color: #3498db; font-size: 20px; margin-bottom: 15px;">Marker Information</h3>
            <hr style="border: 1px solid #ccc; margin: 10px 0;" />
            <p style="margin: 10px 0;"><strong>Speed:</strong> ${speed} km/h</p>
            <p style="margin: 10px 0;"><strong>Current Location:</strong> ${position.lat}, ${position.lng}</p>
            <p style="margin: 10px 0;"><strong>Time to Expire:</strong> ${elapsedTime} ms</p>
            <p style="margin: 10px 0;"><strong>Current Trajectory:</strong> ${bearing} degrees</p>
            <p style="margin: 10px 0;"><strong>Distance Traveled:</strong> ${distanceTraveled.toFixed(2)} km</p>
            <p style="margin: 10px 0;"><strong>Tail of Traveled Trajectory (last 60 seconds):</strong> ${tail.join(', ')}</p>
        </div>
    `;
};

