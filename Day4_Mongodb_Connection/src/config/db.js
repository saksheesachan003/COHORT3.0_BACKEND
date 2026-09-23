const mongoose = require("mongoose");

// created a function
const connectDb = async () => {
  // here i have to create connection from mongodb
  // Go to mongodb compass -> click three dot -> copy connection string
  try {
    await mongoose.connect(
      "mongodb+srv://saksheesachan003_db_user:saksh_cohort_3.0@cohort-cluster.bbnpm35.mongodb.net/",
    );

    console.log("mongoDB connected");
  } catch (err) {
    console.log("Error while connecting DB", err);
  }
};

module.exports = connectDb;