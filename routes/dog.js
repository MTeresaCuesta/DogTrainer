var express = require("express");
const dogController = require("../controllers/dogController");
const uploadImage = require("../middleware/multer");
var router = express.Router();

//Ruta base del archivo: localhost:3000/dog

//muestra todas las obras de arte que no esten borradas de todos los artistas

// Perros que no estan borrados 
// localhost:3000/student
router.get("/", dogController.viewAllDogs);
//muestra el formulario de crearnueva obra de arte
//localhost:3000/dog/createDog/:id

router.get("/createDog/:id", dogController.viewCreateDogForm);

//Guarda la info dela nueva mascota de un entrenador en concreto
//localhost:3000/dog/createDog/:id
router.post("/createDog/:id", uploadImage("dogs"), dogController.saveDog);

//metodo que redenriza el formulario de crear mascota desde el navbar
//localhost:3000/dog/addDogNavbar
router.get("/addDogNavbar", dogController.addDogNavbar);

//Guarda la informacion de una nueva mascota desde el formulario de navbar
//localhost:3000/dog/addDogNavbar

router.post("/addDogNavbar", uploadImage("dogs"), dogController.saveDogNavbar);

//Elimina de manera logica un animal

//localhost3000:/dog/logicDelete/:dog_id/:trainer_id

router.get("/logicDelete/:dog_id/:trainer_id", dogController.logicDelete);

//Elimina de manera real un animal

//localhost3000:/dog/delete/:dog_id/:trainer_id

router.get("/delete/:dog_id/:trainer_id", dogController.delete);

// Rederiza la vista para editar obra de arte
// localhost:3000/dog/editDog/:dog_id

router.get("/editDog/:dog_id/", dogController.viewEditForm);

//Guarda la info editada de una obra
// localhost:3000/dog/editDog/:dog_id/:trainer_id

router.post(
  "/editDog/:dog_id/:trainer_id",
  uploadImage("dogs"),
  dogController.saveEditDog
);

module.exports = router;
