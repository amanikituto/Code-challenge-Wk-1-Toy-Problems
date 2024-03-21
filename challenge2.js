const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
rl.question("Enter car speed (in km/h): ", (speed) => {
  const result = calculateDemeritPoints(parseInt(speed));
  console.log(result);
  rl.close();
});
