const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: "eduwork-cruds-v2",
  host: "localhost",
  username: "root",
  password: "root",
  dialect: "mysql",
});


// IIEF 'Immediately Invoked Function Expression'
(async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.log("Unable to connect to the database:", error);
    }
})();

module.exports = sequelize