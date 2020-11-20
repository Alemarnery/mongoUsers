const assert = require("assert");
const User = require("../src/user");
describe("Creating records", () => {
  it("Saves a user", (done) => {
    const irosshi = new User({ name: "Joe" });
    // isNew
    // Method to check if the record has been
    // successfully saved into the Database.
    // ----------------------------------------
    // if isNew === true, is because it hasn't
    // been saved to the database yet.
    assert(irosshi.isNew);
    irosshi.save().then(() => {
      assert(!irosshi.isNew);
      done();
    });
  });
});
