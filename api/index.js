// docs: https://github.com/motdotla/dotenv#%EF%B8%8F-usage
require("dotenv").config();

const app = require("./app.js");
const { connectToDatabase } = require("./db/db.js");

const listenForRequests = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Now listening on port", port);
  });
};

// if (process.env.NODE_ENV === 'production') {
//   //*Set static folder up in production
//   app.use(express.static('client/build'));

//   app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
// }

connectToDatabase().then(() => {
  listenForRequests();
});
