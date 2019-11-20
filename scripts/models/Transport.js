export default class Transport{
  constructor(id, model, producedYear, capacity, averageSpeed) {
    this.id = Date.now();
    this.model = model;
    this.producedYear = producedYear;
    this.capacity = capacity;
    this.averageSpeed = averageSpeed;
  }

  showCapacityInPounds() {
    const KG_IN_POUND = 2.2046;
    this.capacity = this.capacity * KG_IN_POUND;
    console.log(`Capacity in pounds ${this.averageSpeed}nm.`);
  }

  showAverageSpeed() {
    console.log(`Average is ${this.averageSpeed}`);
  }
}
