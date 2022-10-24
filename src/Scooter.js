class Scooter {
  constructor(station, user) {
    this.station = station;
    this.user = user;
    this.serial = Math.round(Math.random() * 1000)
    this.charge = Math.round(Math.random() * 100)
    this.isBroken = false;
    this.docked = true;
  }


  rent() {
    // if scooter works and has charge, allow rent
    if (this.isBroken === false && this.charge > 20) {
      this.docked = false;
      console.log("Enjoy the ride!");
      return "Enjoy the ride!";
    }
    // if scooter is low on charge, throw error
    else if (this.charge <= 20) {
      throw "Scooter low on battery, please charge.";
    }
    // if scooter is broken, throw error
    else {
      throw "Scooter is broken, please send a repair request.";
    }
  }

  dock(station) {
    // if no arg passed, throw error
    if (station === undefined) {
      throw "Docking station required!";
    } else {
    // update properties
    this.station = station;
    this.docked = true;
    this.user = "";
    }
  }

  async recharge() {
    // use setInterval timer to set charge after certain time
    console.log("Starting charge");

    // after time has resolved, set charge to 100 and log
    await new Promise((resolve) => setTimeout(resolve, 100)); // wait 2 seconds
    this.charge = 100;

    console.log("Charge complete");
  }

  async requestRepair() {
    // use setInterval timer to log after certain time
    console.log("Starting repair.");

    // after time has resolved, set isBroken to false and log
    await new Promise((resolve) => setTimeout(resolve, 100)); // wait 2 seconds
    this.isBroken = false;
    console.log("Repair complete");
  }
}

module.exports = Scooter;
