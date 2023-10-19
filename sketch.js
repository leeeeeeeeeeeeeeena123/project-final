let petriDishRadius = 300;
let bacteria = []; 
let numLegs = 9;
let legLengths = [];
let legAngles = [];
let legWiggleOffsets = [];
let Webs = [];

const TWO_PI = Math.PI * 2;

function setup() {
    createCanvas(800, 600);

    // Initialize bacteria positions inside the petri dish
    for (let i = 0; i < 30; i++) {
        let x = random(width / 2 - petriDishRadius, width / 2 + petriDishRadius);
        let y = random(height / 2 - petriDishRadius, height / 2 + petriDishRadius);
        bacteria.push(createVector(x, y));
    }

    // Initialize the leg lengths, angles, and then  wiggle offsets
    for (let i = 0; i < numLegs; i++) {
        legLengths[i] = random(40, 80);
        legAngles[i] = PI / 4 + i * TWO_PI / numLegs;
        legWiggleOffsets[i] = random(-PI / 4, PI / 4);
    }
}

function draw() {
    background(255); // Set background color to white
    
    // Draw petri dish
    drawPetriDish(width / 2, height / 2, petriDishRadius);
    
    // Draw bacteria inside the petri dish
    fill(255, 255, 0); // Set fill color to yellow for bacteria
    noStroke();
    for (let i = 0; i < bacteria.length; i++) {
        ellipse(bacteria[i].x, bacteria[i].y, 5, 5); // Draw bacteria as medium ellipses
    }

    // Draw webs in the back
    stroke(0, 128, 0); // Set stroke color to green for the  webs
    for (let i = 0; i < Webs.length; i++) {
        Webs[i].x += random(-2, 2); // Movethe  webs randomly
        Webs[i].y += random(-2, 2); // Move webs randomly
        
        strokeWeight(3);
        for (let j = 0; j < 10; j++) {
            let angle = map(j, 0, 10, 0, TWO_PI);
            let xOffset = cos(angle) * 40;
            let yOffset = sin(angle) * 40;
            line(Webs[i].x, Webs[i].y, Webs[i].x + xOffset, Webs[i].y + yOffset);
        }
    }

    // Draw legs that have a wiggling effect
    stroke(0); // Set stroke color to black for legs
    for (let i = 0; i < numLegs; i++) {
        let wiggle = sin(millis() * 0.02) * 15; // Adjust wiggling intensity 
        let legX = width / 2 + cos(legAngles[i] + legWiggleOffsets[i]) * 20;
        let legY = height / 2 + sin(legAngles[i] + legWiggleOffsets[i]) * 30;

        for (let j = 0; j < 3; j++) {
            let legEndX = legX + cos(legAngles[i] + legWiggleOffsets[i]) * (legLengths[i] + wiggle);
            let legEndY = legY + sin(legAngles[i] + legWiggleOffsets[i]) * (legLengths[i] + wiggle);
            strokeWeight(5);
            line(legX, legY, legEndX, legEndY);
            legX = legEndX;
            legY = legEndY;
        }
    }
}

function drawPetriDish(x, y, radius) {
    noFill(100);
    stroke(0);
    strokeWeight(5);
    ellipse(x, y, radius * 2, radius * 2);
}

function mousePressed() {
    // Add web in a circular pattern around the mouse position when  the mouse is pressed
    let numWebs = 20; // Number of webs in the circular pattern
    let radius = 30; // Radius of the circular pattern

    for (let i = 0; i < numWebs; i++) {
        let angle = TWO_PI / numWebs * i;
        let xOffset = cos(angle) * radius;
        let yOffset = sin(angle) * radius;
        let web = createVector(mouseX + xOffset, mouseY + yOffset);
        Webs.push(web);
    }
}