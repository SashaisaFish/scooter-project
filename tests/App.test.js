const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/App");

describe("Test scooter initialises", () => {
  const app1 = new ScooterApp();

  test("initialises stations", () => {
    expect(app1.stations).toEqual({
      "Manhattan": [],
      "Brooklyn": [],
      "Queens": [],
      "Bronx": [],
    });
  });

  test("initialises registeredUsers", () => {
    expect(app1.registeredUsers).toEqual({});
  });
});

describe("Test register(user)", () => {
  const app1 = new ScooterApp();
  const user1 = new User("username1", "password1", 16);
  const user2 = new User("username2", "password2", 20);
  const user3 = new User("username3", "password3", 24);

  test("Test already registered", () => {
    const registerError = () => {
      app1.register(user2);
      app1.register(user2);
    };
    expect(registerError).toThrow(`${user2.username} is already registered`);
  });

  test("Test too young", () => {
    const ageError = () => {
      app1.register(user1);
    };
    expect(ageError).toThrow(`${user1.username} is too young to register`);
  });

  test("Test add to registered users", () => {
    app1.registeredUsers = {};
    app1.register(user3);
    expect(app1.registeredUsers).toEqual({
      username3: {
        password: user3._password,
        age: user3.age,
        loggedIn: false,
        accountChange: 0,
      },
    });
  });
});

describe("Test logIn(username, password)", () => {
  const appx = new ScooterApp();
  const user1 = new User("username1", "password1", 20);
  appx.register(user1);

  test("user does not exist", () => {
    const existError = () => {
      appx.logIn("username2", "password2");
    };
    expect(existError).toThrow("Username is incorrect");
  });

  test("incorrect password", () => {
    const passwordError = () => {
      appx.logIn("username1", "wrong");
    };
    expect(passwordError).toThrow("Password is incorrect");
  });

  test("successful login: change loggedIn to true", () => {
    appx.logIn("username1", "password1");
    expect(appx.registeredUsers.username1.loggedIn).toBeTruthy();
  });
});

describe("Test addScooter(location, scooter)", () => {
  const appx = new ScooterApp();
  const user1 = new User("username1", "password1", 20);
  const scooter = new Scooter("Brooklyn", user1);
  appx.addScooter("Manhattan", scooter);

  test("set scooter station to location arg", () => {
    expect(scooter.station).toEqual("Manhattan");
  });

  test("add scooter to corresponding station", () => {
    expect(appx.stations["Manhattan"]).toEqual([scooter]);
  });

  test("throw error if station does not exist", () => {
    const stationError = () => {
      appx.addScooter("Madison", scooter);
    };
    expect(stationError).toThrow("Madison is not a station.");
  });

  test("throw error if no args passed", () => {
    const argError = () => {
      appx.addScooter();
    };
    expect(argError).toThrow("Please enter a location and scooter");
  });
});

describe("Test removeScooter(scooterToRemove)", () => {
  const appx = new ScooterApp();
  const user1 = new User("username1", "password1", 20);
  const scooter = new Scooter("Brooklyn", user1);
  const scooter2 = new Scooter("Manhattan", user1)
  const scooter3 = new Scooter("Brooklyn", user1)
  appx.addScooter("Manhattan", scooter);

  test("removeScooter removes from list", () => {
    appx.removeScooter(scooter);
    expect(appx.stations).toEqual({
      "Manhattan": [],
      "Brooklyn": [],
      "Queens": [],
      "Bronx": [],
    });
  });

  test("throws error if no scooters in location", () => {
    const notFoundError = () => {
      appx.removeScooter(scooter2);
    };
    expect(notFoundError).toThrow("Scooter not found.");
  });

  test("throws error if scooter not found in location", () => {
    const notFoundError2 = () => {
      appx.addScooter("Brooklyn", scooter)
      appx.addScooter("Brooklyn", scooter2)
      appx.removeScooter(scooter3);
    };
    expect(notFoundError2).toThrow("Scooter not found.");
  });

});
