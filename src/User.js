class User {
  username;
  _password;
  age;

  constructor(username, password, age) {
    this.username = username;
    this._password = password;
    this.age = age;
  }

  // QQ getters
  get username() {
    return this.username;
  }
  get password() {
    return this._password;
  }
  get age() {
    return this.age;
  }

  // QQ setters
  set password(newPassword) {
    this._password = newPassword;
  }

}

module.exports = User;
