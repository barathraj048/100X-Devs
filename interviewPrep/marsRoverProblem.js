"use strict";
class Position {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Plateau {
    maxX;
    maxY;
    constructor(maxX, maxY) {
        this.maxX = maxX;
        this.maxY = maxY;
    }
    isWithinBounds(position) {
        return position.x >= 0 && position.x <= this.maxX &&
            position.y >= 0 && position.y <= this.maxY;
    }
}
class North {
    turnLeft() { return new West(); }
    turnRight() { return new East(); }
    calculateNextPosition(pos) { return new Position(pos.x, pos.y + 1); }
    toString() { return "N"; }
}
class South {
    turnLeft() { return new East(); }
    turnRight() { return new West(); }
    calculateNextPosition(pos) { return new Position(pos.x, pos.y - 1); }
    toString() { return "S"; }
}
class East {
    turnLeft() { return new North(); }
    turnRight() { return new South(); }
    calculateNextPosition(pos) { return new Position(pos.x + 1, pos.y); }
    toString() { return "E"; }
}
class West {
    turnLeft() { return new South(); }
    turnRight() { return new North(); }
    calculateNextPosition(pos) { return new Position(pos.x - 1, pos.y); }
    toString() { return "W"; }
}
class Rover {
    position;
    direction;
    plateau;
    constructor(initialPosition, initialDirection, plateau) {
        this.position = initialPosition;
        this.direction = initialDirection;
        this.plateau = plateau;
    }
    turnLeft() {
        this.direction = this.direction.turnLeft();
    }
    turnRight() {
        this.direction = this.direction.turnRight();
    }
    move() {
        const nextPosition = this.direction.calculateNextPosition(this.position);
        if (this.plateau.isWithinBounds(nextPosition)) {
            this.position = nextPosition;
        }
        else {
            console.warn(`[Blocked] Move to (${nextPosition.x}, ${nextPosition.y}) rejected by Plateau boundary.`);
        }
    }
    executeCommands(commands) {
        for (const command of commands) {
            if (command === 'L')
                this.turnLeft();
            else if (command === 'R')
                this.turnRight();
            else if (command === 'M')
                this.move();
            else
                throw new Error(`Invalid command: ${command}`);
        }
    }
    getStatus() {
        return `${this.position.x} ${this.position.y} ${this.direction.toString()}`;
    }
}
// test function
function executeIntegrationTests() {
    console.log("🚀 Initializing Thoughtworks Simulation...\n");
    const standardPlateau = new Plateau(5, 5);
    let passed = 0;
    const tests = [
        {
            name: "Classic Test 1 (1 2 N -> LMLMLMLMM)",
            setup: () => new Rover(new Position(1, 2), new North(), standardPlateau),
            commands: "LMLMLMLMM",
            expected: "1 3 N"
        },
        {
            name: "Classic Test 2 (3 3 E -> MMRMMRMRRM)",
            setup: () => new Rover(new Position(3, 3), new East(), standardPlateau),
            commands: "MMRMMRMRRM",
            expected: "5 1 E"
        },
        {
            name: "Boundary Test (Prevent falling off North edge)",
            setup: () => new Rover(new Position(5, 5), new North(), standardPlateau),
            commands: "MM", // Trying to exceed y=5
            expected: "5 5 N"
        },
        {
            name: "Invalid Command Rejection",
            setup: () => new Rover(new Position(0, 0), new East(), standardPlateau),
            commands: "MX", // X is invalid
            expectedException: true
        }
    ];
    tests.forEach(test => {
        try {
            const rover = test.setup();
            rover.executeCommands(test.commands);
            const result = rover.getStatus();
            if (!test.expectedException && result === test.expected) {
                console.log(`✅ [PASS] ${test.name}`);
                passed++;
            }
            else if (!test.expectedException) {
                console.error(`❌ [FAIL] ${test.name} - Expected: ${test.expected}, Got: ${result}`);
            }
            else {
                console.error(`❌ [FAIL] ${test.name} - Expected an exception to be thrown.`);
            }
        }
        catch (error) {
            if (test.expectedException) {
                console.log(`✅ [PASS] ${test.name} (Successfully threw exception)`);
                passed++;
            }
            else {
                console.error(`❌ [FAIL] ${test.name} crashed unexpectedly: ${error}`);
            }
        }
    });
    console.log(`\n🏁 Test Run Complete: ${passed}/${tests.length} Passed`);
}
executeIntegrationTests();
