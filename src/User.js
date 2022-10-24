class User {
  username;
  _password;
  age;

  constructor(username, password, age) {
    this.username = username;
    this._password = password;
    this.age = age;
  }

}

module.exports = User;
