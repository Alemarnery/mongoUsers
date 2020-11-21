const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe, maria, alex, zach;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    maria = new User({ name: "maria" });
    alex = new User({ name: "alex" });
    zach = new User({ name: "zach" });

    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()]).then(() =>
      done()
    );
  });

  it("finds all users with a name of joe", (done) => {
    User.find({ name: "Joe" }).then((users) => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("find a user with a particular id", (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === "Joe");
      done();
    });
  });

  it("can skip and limit the result set", (done) => {
    //Con find sin condicionales me traere todo
    //El skip significa que te vas a saltar n elementos
    //Limit, voy a tomar n elementos a partir del que me salte
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === "alex");
        assert(users[1].name === "Joe");
      });
  });
});
