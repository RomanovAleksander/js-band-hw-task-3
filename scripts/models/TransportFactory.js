import Ship from "./Ship.js";
import Truck from "./Truck.js";

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