const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const MONGO_URI =
  "mongodb://alem:alem_123456@cluster0-shard-00-00.cjcds.mongodb.net:27017,cluster0-shard-00-01.cjcds.mongodb.net:27017,cluster0-shard-00-02.cjcds.mongodb.net:27017/cluster0?ssl=true&replicaSet=atlas-hkys6y-shard-0&authSource=admin&retryWrites=true&w=majority";
// before
// This hook only gets triggered one time,
// unlike beforeEach. Since the connection to
// the database is async in nature, we have to
// call 'done()' once the connection is made.
before(function (done) {
  this.enableTimeouts(false);
  mongoose.connect(MONGO_URI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (error) => console.warn("Warning", error));
});
// HOOK
// This is to dump all the data inside
// the Users collection in the database
beforeEach((done) => {
  const { users, comments, blogpost } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogpost.drop(() => {
        done();
      });
    });
  });
});
