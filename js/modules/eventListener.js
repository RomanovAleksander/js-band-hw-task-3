import Ship from "./transport/ship.js";
import Truck from "./transport/lorry.js";
import Cost from "./transport/cost.js";
import Data from "./data.js";
import TransportFactory from "./transport/transportFactory.js";

export default class EventListener extends Data{
  constructor() {
    super();
    this.forms = document.querySelector('.forms');
    this.forms.addEventListener("submit", this.submitEvent.bind(this));
    this.getItemsFromLocalStorage();
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
    const clear = () => {
      inputModel.value = '';
      inputProducedYear.value = '';
      inputCapacity.value = '';
      inputAverageSpeed.value = '';
    };

    if (target.className !== 'form-costs') {
      item.model = inputModel.value.trim();
      item.producedYear = inputProducedYear.value.trim();
      item.capacity = inputCapacity.value.trim();
      item.averageSpeed = inputAverageSpeed.value.trim();
    }
    switch (target.className) {
      case 'form-ship':
        const inputName = target.querySelector('.name');
        const inputCountOfTeam = target.querySelector('.countOfTeam');

        item.type = 'Ship';
        item.name = inputName.value.trim();
        item.countOfTeam = inputCountOfTeam.value.trim();
        element = TransportFactory.create('ship', item);

        clear();
        inputName.value = '';
        inputCountOfTeam.value = '';
        this.transport.push(item);
        this.renderItem(item);
        break;
      case 'form-truck':
        const inputLicensePlate = target.querySelector('.licensePlate');
        const inputTypeOfGas = target.querySelector('.typeOfGas');

        item.type = 'Truck';
        item.licensePlate = inputLicensePlate.value.trim();
        item.typeOfGas = inputTypeOfGas.value.trim();
        element = TransportFactory.create('truck', item);

        clear();
        inputLicensePlate.value = '';
        inputTypeOfGas.value = '';
        this.transport.push(item);
        this.renderItem(item);
        break;
      case 'form-costs':
        const inputTransportModel = target.querySelector('.transportModel');
        const inputCostOfCargo = target.querySelector('.costOfCargo');
        const inputCostOfDistance = target.querySelector('.costOfDistance');

        item.model = inputTransportModel.value;
        item.costOfCargo = inputCostOfCargo.value;
        item.costOfDistance = inputCostOfDistance.value;
        element = new Cost(item);

        inputTransportModel.value = '';
        inputCostOfCargo.value = '';
        inputCostOfDistance.value = '';
        this.costs.push(item);
        this.renderItem(item);
        break;
    }

    this.storage.setItem(`transport`, this.transport);
    this.storage.setItem(`costs`, this.costs);
  }
}
