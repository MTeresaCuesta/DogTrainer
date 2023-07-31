const connection = require("../config/db");
class IndexController {
  // Muestra la vista home
  viewHome = (req, res) => {
    let sql = `SELECT * FROM trainer WHERE trainer_deleted = 0`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("index", { result });
    });
  };
}
module.exports = new IndexController();

