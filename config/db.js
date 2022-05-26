const mongoose = require('mongoose');

const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) =>
      console.log(`Server connected to database ${data.connection.host}`)
    )
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
};

module.exports = connectToDatabase;
