const connection = require("../config/db");
class DogController {
  //muestra el formulario de crearnueva perro
  viewCreateDogForm = (req, res) => {
    let id = req.params.id;
    res.render("createDog", { trainer_id: id });
  };

  saveDog = (req, res) => {
    let trainer_id = req.params.id;

    let dog_name = req.body.dog_name;
    let description = req.body.description_name;
    let sql = `INSERT INTO dog (trainer_id, dog_name, description) VALUES (${trainer_id}, '${dog_name}','${description}');`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO dog (trainer_id, dog_name, description, image) VALUES (${trainer_id}, '${dog_name}','${description}','${img}');`;
    }
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };
  //renderiza el formulario de crear mascotas desde el navbar
  addDogNavbar = (req, res) => {
    let sql = `SELECT * FROM trainer WHERE trainer_deleted = 0`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("addDogNavbar", { result });
    });
  };
  //guarda info de un animal nuevo desde el formulario navbar
  saveDogNavbar = (req, res) => {
    let { dog_name, description, trainer_id } = req.body;
    let sql = `INSERT INTO dog (trainer_id, dog_name, description) VALUES (${trainer_id}, '${dog_name}','${description}');`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO dog (trainer_id, dog_name, description, image) VALUES (${trainer_id}, '${dog_name}','${description}','${img}');`;
    }
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };

  // Muestra a todos los estudiantes que no estén borrados
  viewAllDogs = (req, res) => {
    let sql = `SELECT * FROM dog WHERE dog_deleted = 0`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("allDogs", { result });
    });
  };
  //Elimina una obra de manera logica

  logicDelete = (req, res) => {
    let dog_id = req.params.dog_id;
    let trainer_id = req.params.trainer_id;
    let sql = `UPDATE dog SET dog_deleted = 1 WHERE dog_id = ${dog_id} `;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };

  //Elimina un pero de manera real
  delete = (req, res) => {
    let { dog_id, trainer_id } = req.params;

    let sql = `DELETE from dog WHERE dog_id = ${dog_id} `;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };
  //renderiza la vista para editar animal
  viewEditForm = (req, res) => {
    let dog_id = req.params.dog_id;
    let sql = `SELECT * FROM dog WHERE dog_id = ${dog_id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editDog", { result });
    });
  };

  saveEditDog = (req, res) => {
    let trainer_id = req.params.trainer_id;
    let dog_id = req.params.dog_id;
    let dog_name = req.body.dog_name;

    let sql = `UPDATE dog SET dog_name = "${dog_name}" WHERE dog_id = ${dog_id}`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE dog SET dog_name = "${dog_name}", image = "${img}" WHERE dog_id = ${dog_id}`;
    }
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.redirect(`/trainer/oneTrainer/${trainer_id}`);
    });
  };
}
module.exports = new DogController();
