interface IMovementStrategy {
  move: () => void;
}

class Hero {
  movement: IMovementStrategy;

  constructor(movement: IMovementStrategy) {
    this.movement = movement;
  }

  move() {
    this.movement.move();
  }

  setMovementStrategy(movement: IMovementStrategy) {
    this.movement = movement;
  }
}

class WalkingStrategy implements IMovementStrategy {
  move() {
    console.log(`I'm walking`);
  }
}

class RunningStrategy implements IMovementStrategy {
  move() {
    console.log(`I'm running`);
  }
}

const walkingStrategy = new WalkingStrategy();
const runningStrategy = new RunningStrategy();

const hero = new Hero(walkingStrategy);

hero.move();

hero.setMovementStrategy(runningStrategy);

hero.move();
