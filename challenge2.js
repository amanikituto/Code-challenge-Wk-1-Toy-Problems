function calculateDemeritPoints(speed) {
    const speedLimit = 70;
    const kmPerPoint = 5;
    if (speed <= speedLimit) {
        return "Ok";
    } else {
        const points = Math.floor((speed - speedLimit) / kmPerPoint);
        if (points >= 12) {
            return "License suspended";
        } else {
            return "Points: " + points;
        }
    }
}

// Example usage:
const speed = parseInt(prompt("Enter car speed (in km/h):"));
const result = calculateDemeritPoints(speed);
console.log(result);
