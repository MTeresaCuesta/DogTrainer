const connection = require("../config/db");
const bcrypt = require("bcrypt");
class TrainerController {
  // muestra a todos los entrenadores
  getAllTrainer = (req, res) => {
    let sql = "SELECT * FROM trainer WHERE trainer_deleted = 0";

    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("allTrainers", { result });
    });
  };

  //muestra el formulario de registro
  viewRegisterForm = (req, res) => {
    res.render("register", { message: "" });
  };

  //registra a un nuevo entrenador
  register = (req, res) => {
    let { name, last_name, email, password, phone, description } = req.body;
    let img = "";
    if (req.file != undefined) {
      img = req.file.filename;
    } else {
      img = "avatar.png";
    }
    // Encriptamos contraseña
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) throw err;

      let sql = `INSERT INTO trainer (name, last_name, email, password, avatar, phone, description) VALUES ("${name}", "${last_name}", "${email}", "${hash}", "${img}", "${phone}", "${description}")`;
      connection.query(sql, (error, result) => {
        // if (error) throw error;
        if (error) {
          if (error.code == "ER_DUP_ENTRY") {
            res.render("register", { message: "Este email ya existe" });
          } else {
            throw error;
          }
        }

        res.render("register", { message: "Entrenador creado correctamente" });
      });
    });
  };
  //muestra la vista de perfil de un entrenador con sus perros

  viewOneTrainer = (req, res) => {
    let trainer_id = req.params.id;
    let sqlTrainer = `SELECT * FROM trainer WHERE trainer_deleted = 0 AND trainer_id = ${trainer_id}`;
    let sqlDog = `SELECT * FROM dog WHERE dog_deleted = 0 AND trainer_id = ${trainer_id}`;

    connection.query(sqlTrainer, (errorTrainer, resultTrainer) => {
      if (errorTrainer) throw errorTrainer;

      connection.query(sqlDog, (errorDog, resultDog) => {
        if (errorDog) throw errorDog;
        res.render("oneTrainer", { resultTrainer, resultDog });
      });
    });
  };

 

  //formulario login

  viewLoginForm = (req, res) => {
    res.render("loginForm", { message: "" });
  };

  //comprueba creenciales de logueo

  login = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT * FROM trainer WHERE email = '${email}' AND trainer_deleted = 0`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.length == 1) {
        //el email es correcto y comprobamos la contraseña
        let hash = result[0].password;

        bcrypt.compare(password, hash, (err, resultCompare) => {
          if (resultCompare) {
            //email y contraseña correctos
            res.redirect(`/trainer/oneTrainer/${result[0].trainer_id}`);
          } else {
            //email correcto pero contraseña incorrecta
            res.render("loginForm", { message: "Contraseña incorrecto" });
          }
        });
      } else {
        res.render("loginForm", { message: "Email incorrecto" });
      }
    });
  };
   // Eliminar de manera logica a un  entrenador
   logicDelete = (req, res) => {
    let trainer_id = req.params.trainer_id;
    let sqlDog = `UPDATE dog SET dog_deleted = 1 WHERE trainer_id = ${trainer_id} `;
    let sqlTrainer = `UPDATE trainer SET trainer_deleted = 1 WHERE trainer_id = ${trainer_id} `;

    connection.query(sqlDog, (error, result) => {
      if (error) throw error;
      connection.query(sqlTrainer, (error, result) => {
        if (error) throw error;
        res.redirect("/trainer");
      });
    });
  };
}

module.exports = new TrainerController();
