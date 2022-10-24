const User = require('../src/User')

const user1 = new User("username1", "password1", 20);

describe("Test constructor", () => {
  test("correctly assigns username", () => {
    expect(user1.username).toEqual("username1");
  });
  test("correctly assigns password", () => {
    expect(user1._password).toEqual("password1");
  });
  test("correctly assigns age", () => {
    expect(user1.age).toEqual(20);
  });
});
