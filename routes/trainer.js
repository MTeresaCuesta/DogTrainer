var express = require("express");
const trainerController = require("../controllers/trainerController");
const uploadImage = require("../middleware/multer");
var router = express.Router();

//Ruta base del archico --> localhost:3000/trainer

/* GET users listing. */
// muestra los entrenadores
//localhost:3000/trainer
router.get("/", trainerController.getAllTrainer);

//muestra el formulario de registro
//localhost:3000/trainer/register
router.get("/register", trainerController.viewRegisterForm);


//Guarda los datos de un nuevo artista

//localhost:3000/artist/register

router.post("/register", uploadImage('trainers'), trainerController.register);

//muestra la vista de perfil de un entrenador con sus perros
//localhost:3000/trainer/oneTrainer/:id

router.get("/oneTrainer/:id", trainerController.viewOneTrainer);



//Muestra el formulario de login
//localhost:3000/trainer/login
router.get("/login", trainerController.viewLoginForm);

//comprueba creenciales de logueo
////localhost:3000/trainer/login
router.post("/login", trainerController.login);

// Eliminar de manera logica a un entrenador
// localhost:3000/trainer/logicDelete/:trainer_id
router.get("/logicDelete/:trainer_id", trainerController.logicDelete);

module.exports = router;
