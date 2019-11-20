import Ship from "./models/Ship.js";
import Truck from "./models/Truck.js";
import Cost from "./models/Cost.js";
import Data from "./data.js";
import TransportFactory from "./models/TransportFactory.js";

export default class EventListener extends Data {
  constructor() {
    super();
    this.forms = document.querySelector('.forms');
    this.init();
  }

  init() {
    this.getItemsFromLocalStorage();
    this.forms.addEventListener("submit", this.submitEvent.bind(this));
  }

  submitEvent(event) {
    event.preventDefault();
    const target = event.target;
    const inputModel = target.querySelector('.model');
    const inputProducedYear = target.querySelector('.producedYear');
    const inputCapacity = target.querySelector('.capacity');
    const inputAverageSpeed = target.querySelector('.averageSpeed');
    const item = {};
    let element;

    if (target.className !== 'form-costs') {
      this.setData(
        item,
        inputModel,
        inputProducedYear,
        inputCapacity,
        inputAverageSpeed
      );
    }
    switch (target.className) {
      case 'form-ship':
        const inputName = target.querySelector('.name');
        const inputCountOfTeam = target.querySelector('.countOfTeam');

        item.type = 'Ship';
        this.setData(item, inputName, inputCountOfTeam);
        element = TransportFactory.create('ship', item);

        this.transport.push(item);
        this.renderLogic(item);
        this.clearValues(
          inputModel,
          inputProducedYear,
          inputCapacity,
          inputAverageSpeed,
          inputName,
          inputCountOfTeam
        );
        break;
      case 'form-truck':
        const inputLicensePlate = target.querySelector('.licensePlate');
        const inputTypeOfGas = target.querySelector('.typeOfGas');

        item.type = 'Truck';
        this.setData(item, inputLicensePlate, inputTypeOfGas);
        element = TransportFactory.create('truck', item);

        this.transport.push(item);
        this.renderLogic(item);
        this.clearValues(
          inputModel,
          inputProducedYear,
          inputCapacity,
          inputAverageSpeed,
          inputLicensePlate,
          inputTypeOfGas
        );
        break;
      case 'form-costs':
        const inputTransportModel = target.querySelector('.transportModel');
        const inputCostOfCargo = target.querySelector('.costOfCargo');
        const inputCostOfDistance = target.querySelector('.costOfDistance');

        this.setData(
          item,
          inputTransportModel,
          inputCostOfCargo,
          inputCostOfDistance
        );
        element = new Cost(item);

        this.costs.push(item);
        this.renderLogic(item);
        this.clearValues(
          inputTransportModel,
          inputCostOfCargo,
          inputCostOfDistance
        );
        break;
    }
    this.storage.setItem(`transport`, this.transport);
    this.storage.setItem(`costs`, this.costs);
  }

  setData(item, ...items) {
    items.forEach((el) => {
      item[el.name] = el.value;
    });
  }

  clearValues(...items) {
    items.forEach((item) => {
      item.value = '';
    });
  }
}
