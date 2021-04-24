type Key = string | number;

class CareTaker {
  mementos: Record<Key, string> = {};

  add(key: Key, memento: string) {
    this.mementos[key] = memento;
  }

  get(key: Key) {
    return this.mementos[key];
  }
}

interface ICheckpoint {
  money: number;
  health: number;
  posX: number;
  posY: number;
}

class Game implements ICheckpoint {
  money: number;
  health: number;
  posX: number;
  posY: number;

  constructor({ money, health, posX, posY }: ICheckpoint) {
    this.money = money;
    this.health = health;
    this.posX = posX;
    this.posY = posY;
  }

  hydrate() {
    return JSON.stringify(this);
  }

  dehydrate(memento: string) {
    const state = <ICheckpoint>JSON.parse(memento);
    Object.assign(this, state);
  }

  static loadFromCheckpoint(memento: string) {
    const state = <ICheckpoint>JSON.parse(memento);
    return new Game(state);
  }
}

// Vazhojam

const careTaker = new CareTaker();

const game1 = new Game({
  money: 122121,
  health: 100,
  posX: 55.11,
  posY: -12.34,
});

careTaker.add("2021/04/24 11:25", game1.hydrate());

const game2 = new Game({
  money: 123,
  health: 88,
  posX: 11.11,
  posY: -45.12,
});

careTaker.add("2021/04/26 08:00", game2.hydrate());

const game3 = Game.loadFromCheckpoint(careTaker.get("2021/04/24 11:25"));

console.log(game3);

game3.dehydrate(careTaker.get("2021/04/26 08:00"));

console.log(game3);
