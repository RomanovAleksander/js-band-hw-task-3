import Ship from "./ship.js";
import Truck from "./lorry.js";

export default class TransportFactory {
  static create(type, args) {
    switch (type) {
      case 'ship':
        return new Ship(args);
      case 'truck':
        return new Truck(args);
    }
  }
}