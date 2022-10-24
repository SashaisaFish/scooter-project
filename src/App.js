const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    this.stations = {
      "Manhattan": [],
      "Brooklyn": [],
      "Queens": [],
      "Bronx": [],
    };

    this.registeredUsers = {
      // username: {
      // password: user.password,
      // age: user.age,
      // loggedIn: false,
      // accountChange: 0,
      //}
    };
  }

  register(user) {
    // receives object from User Class

    // create object with required data pulled from user
    const userObj = {
      password: user.password,
      age: user.age,
      loggedIn: false,
      accountChange: 0,
    };

    // declare array for easier searching
    const usernameArray = Object.keys(this.registeredUsers);

    // if array from registeredUsers already contains username of user, log and throw error
    if (usernameArray.includes(user.username)) {
      console.log(`${user.username} is already registered`);
      throw `${user.username} is already registered`;
    }
    // if age is 17 or less, log and throw error
    else if (user.age <= 17) {
      console.log(`${user.username} is too young to register`);
      throw `${user.username} is too young to register`;
    }
    // if both checks pass, update registered users with userObj as value and username as key
    else {
      this.registeredUsers[user.username] = userObj;
      console.log(`${user.username} has been registered`);
    }
  }

  logIn(username, password) {
    // declare array for easier searching
    const usernameArray = Object.keys(this.registeredUsers);

    // if array includes inputted username, continue
    if (usernameArray.includes(username)) {
      // declare user from registeredUsers as its own object for easier searching
      const user = this.registeredUsers[username];

      // if password matches with inputted password, allow login
      if (user.password === password) {
        user.loggedIn = true;
        console.log("Login successful.");
      }

      // if password does not match, throw password error
      else {
        throw "Password is incorrect";
      }
    }

    // if array does not include inputted username, throw username error
    else {
      throw "Username is incorrect";
    }
  }

  addScooter(location, scooter) {
    const stationsArray = Object.keys(this.stations);
    if (stationsArray.includes(location)) {
      scooter.station = location;
      this.stations[location].push(scooter);
      console.log("Scooter has been added.");
    } else {
      throw `${location} is not a station.`;
    }
  }

  removeScooter(scooterToRemove) {
    // for key value pairs of this.stations,

    // find station of scooter
    const location = scooterToRemove.station;

    // look in the value of that station
    // currentStation is an array of Objects of Scooter class
    const currentStation = this.stations[location];
    console.log("current station:", currentStation);
const allSerials = [];
    // iterate through objects in array and check if i[serial] === serial
    for (let i = 0; i < currentStation.length; i++) {
      
      console.log("current index serial: ", currentStation[i].serial);
      console.log("scooter serial: ", scooterToRemove.serial);
      // check serial of current index of array
      // if it matches, remove from currentStation and log message
      if (currentStation[i].serial === scooterToRemove.serial) {
        currentStation.splice(i, 1);
        console.log("Scooter has been removed.");
        return true;
      } 
      // if it does not match, push to allSerials array
      else {
        allSerials.push(currentStation[i].serial);
        console.log(allSerials)
      }
    }
    if(!allSerials.includes(scooterToRemove.serial)){
      throw "Scooter not found.";
    }
    
  }
}

const appx = new ScooterApp();
const userx = new User("usernamex", "passwordx", 20);
const scooterx = new Scooter("Manhattan", userx);
const scootery = new Scooter("Brooklyn", userx);
const scooterz = new Scooter("Queens", userx);
// console.log(0, appx.stations)
appx.addScooter("Brooklyn", scooterx);
//console.log(1, appx.stations);
appx.addScooter("Bronx", scootery);
//console.log(2, appx.stations);
appx.addScooter("Manhattan", scooterz);
// console.log(3, appx.stations)
console.log(appx.removeScooter(scooterx));
// console.log(2, appx.stations)

// console.log(appx.stations)
// const usery = new User("usernamey", "passwordy", 28);
// appx.register(userx);
// appx.register(usery);

// console.log(appx.logIn("usernamex", "passwordx"));
// // console.log(appx.register(userx))
module.exports = ScooterApp;
