const Scooter = require('../src/Scooter')
const User = require('../src/User')

const scoot = new Scooter("Manhattan", "user1");

describe("Test scooter initialises", () => {
  test("correctly assigns station", () => {
    expect(scoot.station).toEqual("Manhattan");
  });
  test("correctly assigns user", () => {
    expect(scoot.user).toEqual("user1");
  });
  test("correctly assigns serial", () => {
    expect(typeof scoot.serial).toBe("number");
  });
  test("correctly assigns charge", () => {
    expect(typeof scoot.charge).toBe("number");
  });
  test("correctly assigns isBroken", () => {
    expect(scoot.isBroken).toBeFalsy();
  });
  test("correctly assigns docked", () => {
    expect(scoot.docked).toBeTruthy();
  });
});

describe("Test rent()", () => {
  test("Test rent() changes docked to false", () => {
    const rentScooter = new Scooter("Manhattan", "user2");
    rentScooter.charge = 90;
    rentScooter.rent();
    expect(rentScooter.docked).toBeFalsy();
  });
  test("Test rent() logs Enjoy the ride!", () => {
    expect(scoot.rent()).toEqual("Enjoy the ride!");
  });
  const brokenError = () => {
    scoot.charge = 30;
    scoot.isBroken = true;
    scoot.rent();
  };
  test("Test rent() errors if broken", () => {
    expect(brokenError).toThrow(
      "Scooter is broken, please send a repair request."
    );
  });
  const chargeError = () => {
    scoot.charge = 10;
    scoot.isBroken = false;
    scoot.rent();
  };
  test("Test rent() errors if low charge", () => {
    expect(chargeError).toThrow("Scooter low on battery, please charge.");
  });
});

describe("Test dock()", () => {
  const argError = () => {
    scoot.dock();
  };

  test("Test dock() errors if no argument", () => {
    expect(argError).toThrow("Docking station required!");
  });
  test("dock() changes station", () => {
    scoot.dock("Brooklyn");
    expect(scoot.station).toEqual("Brooklyn");
  });
  test("dock() changes docked", () => {
    scoot.dock("Brooklyn");
    expect(scoot.docked).toBeTruthy();
  });
  test("dock() changes user", () => {
    scoot.dock("Brooklyn");
    expect(scoot.user).toEqual("");
  });
});

describe("Test recharge()", () => {
  test("recharge() charges to 100 after time", async () => {
    const scooter = new Scooter("Manhattan", "user3");
    await scooter.recharge(); // we need to wait for the charge!
    expect(scooter.charge).toEqual(100);
  });
});

describe("Test requestRepair()", () => {
  test("requestRepair() fixes isBroken", async () => {
    const scooter = new Scooter(("Manhattan", "user4"));
    scooter.isBroken = true;
    await scooter.requestRepair(); // we need to wait for the charge!
    expect(scooter.isBroken).toBeFalsy();
  });
});

