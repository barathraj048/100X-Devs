class Position {
    constructor(public readonly x: number, public readonly y: number) {}
}

class Plateau {
    constructor(public readonly maxX: number, public readonly maxY: number) {}

    isWithinBounds(position: Position): boolean {
        return position.x >= 0 && position.x <= this.maxX &&
               position.y >= 0 && position.y <= this.maxY;
    }
}

interface IDirection {
    turnLeft(): IDirection;
    turnRight(): IDirection;
    calculateNextPosition(currentPosition: Position): Position;
    toString(): string;
}

class North implements IDirection {
    turnLeft(): IDirection { return new West(); }
    turnRight(): IDirection { return new East(); }
    calculateNextPosition(pos: Position): Position { return new Position(pos.x, pos.y + 1); }
    toString(): string { return "N"; }
}

class South implements IDirection {
    turnLeft(): IDirection { return new East(); }
    turnRight(): IDirection { return new West(); }
    calculateNextPosition(pos: Position): Position { return new Position(pos.x, pos.y - 1); }
    toString(): string { return "S"; }
}

class East implements IDirection {
    turnLeft(): IDirection { return new North(); }
    turnRight(): IDirection { return new South(); }
    calculateNextPosition(pos: Position): Position { return new Position(pos.x + 1, pos.y); }
    toString(): string { return "E"; }
}

class West implements IDirection {
    turnLeft(): IDirection { return new South(); }
    turnRight(): IDirection { return new North(); }
    calculateNextPosition(pos: Position): Position { return new Position(pos.x - 1, pos.y); }
    toString(): string { return "W"; }
}


class Rover {
    private position: Position;
    private direction: IDirection;
    private plateau: Plateau;

    constructor(initialPosition: Position, initialDirection: IDirection, plateau: Plateau) {
        this.position = initialPosition;
        this.direction = initialDirection;
        this.plateau = plateau;
    }

    turnLeft(): void {
        this.direction = this.direction.turnLeft();
    }

    turnRight(): void {
        this.direction = this.direction.turnRight();
    }

    move(): void {
        const nextPosition = this.direction.calculateNextPosition(this.position);
        
        if (this.plateau.isWithinBounds(nextPosition)) {
            this.position = nextPosition;
        } else {
            console.warn(`[Blocked] Move to (${nextPosition.x}, ${nextPosition.y}) rejected by Plateau boundary.`);
        }
    }
    
    executeCommands(commands: string): void {
        for (const command of commands) {
            if (command === 'L') this.turnLeft();
            else if (command === 'R') this.turnRight();
            else if (command === 'M') this.move();
            else throw new Error(`Invalid command: ${command}`);
        }
    }

    getStatus(): string {
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
            } else if (!test.expectedException) {
                console.error(`❌ [FAIL] ${test.name} - Expected: ${test.expected}, Got: ${result}`);
            } else {
                console.error(`❌ [FAIL] ${test.name} - Expected an exception to be thrown.`);
            }
        } catch (error) {
            if (test.expectedException) {
                console.log(`✅ [PASS] ${test.name} (Successfully threw exception)`);
                passed++;
            } else {
                console.error(`❌ [FAIL] ${test.name} crashed unexpectedly: ${error}`);
            }
        }
    });

    console.log(`\n🏁 Test Run Complete: ${passed}/${tests.length} Passed`);
}

executeIntegrationTests();