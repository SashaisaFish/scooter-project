class Scooter {
  constructor(station, user) {
    this.station = station;
    this.user = user;
    this.serial = Math.round(Math.random() * 1000)
    this.charge = Math.round(Math.random() * 100)
    this.isBroken = false;
    this.docked = true;
  }

  // QQ getters

  // QQ setters

  rent() {
    if (this.isBroken === false && this.charge > 20) {
      this.docked = false;
      console.log("Enjoy the ride!");
      return "Enjoy the ride!";
    } else if (this.charge <= 20) {
      throw "Scooter low on battery, please charge.";
    } else {
      throw "Scooter is broken, please send a repair request.";
    }
  }

  dock(station) {
    if (station === undefined) {
      throw "Docking station required!";
    }
    this.station = station;
    this.docked = true;
    this.user = "";
  }

  async recharge() {
    // use setInterval timer to set charge after certain time
    console.log("Starting charge");

    await new Promise((resolve) => setTimeout(resolve, 100)); // wait 2 seconds
    this.charge = 100;

    console.log("Charge complete");
  }

  async requestRepair() {
    // use setInterval timer to log after certain time
    console.log("Starting repair.");

    await new Promise((resolve) => setTimeout(resolve, 100)); // wait 2 seconds
    this.isBroken = false;
    console.log("Repair complete");
  }
}

module.exports = Scooter;
