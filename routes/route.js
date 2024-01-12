const express = require('express');
const route = express.Router();
const middlewares = require("../middlewares/authMiddleware");
const controllers = require('../controllers/controllers');


// testing
route.get("/check",controllers.check)
// =========== AUTHENTICATION =========
route.post("/api/signup", controllers.signup)
route.post("/api/login", controllers.login)

// private API
route.get("/api/addToCart",middlewares.AUTH_MIDDLEWARE)

module.exports = route