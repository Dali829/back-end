const express = require('express');
const route = express.Router();
const controller = require('../controller/controller')
var jwt = require('jsonwebtoken');


/****************login routes***********************/
//agent login route
route.post('/agent/login/', (req, res) => {
   controller.loginAgent(req, res);
});




/************Agent POST routes*************/
//add a new agent
route.post('/agent/addNewAgent/', (req, res) => {
   controller.addNewAgent(req, res);
});
/************Product POST routes*************/
//add a new product
route.post('/product/addNewProduct/', (req, res) => {
   controller.addNewProduct(req, res);
});
/************Product POST routes*************/
route.post('/categories/addNewCategory/', (req, res) => {
   controller.addNewCategory(req, res);
});
/****************Get routes***********************/
/************Agent routes*************/
//get all agents
route.get('/agent/getAllAgents/', (req, res) => {
   controller.getAllAgents(req, res);
});
//get agent by ID
route.get('/agent/getById/:id', (req, res) => {
   controller.getAgentById(req, res);
});
/************Product routes*************/
//get all products
route.get('/product/getAllProducts/', (req, res) => {
   controller.getAllProducts(req, res);
});
//get products by Id Agent 
route.get('/product/getAllProducts/:id', (req, res) => {
   controller.getAllProductsByIdAgent(req, res);
});
//get product By ID
route.get('/product/getProductById/:id', (req, res) => {
   controller.getProductById(req, res);
})
//get all the products of a certain category 
route.get('/product/getProductsByCategoryId/:categoryId', (req, res) => {
   controller.getProductsByCategoryID(req, res);
});

/************Categories routes*************/
//get all categories
route.get('/categories/getAllCategories/', (req, res) => {
   controller.getAllCategories(req, res);
});
//get categoryById
route.get('/categories/getCategoryById/:id', (req, res) => {
   controller.getCategoryById(req, res);
});


/****************Delete routes***********************/
/************Agent routes*************/
//delete agent
route.delete('/agent/deleteAgent/:id', (req, res) => {
   controller.deleteAgent(req, res);
});
/*************Products routes***********/
route.delete('/product/deleteProduct/:id', (req, res) => {
   controller.deleteProduct(req, res);
})

/************Category routes*************/
//delete Category
route.delete('/categories/deleteCategory/:id', (req, res) => {
   controller.deleteCategory(req, res);
})




//update agent profile
route.put('/agent/updateProfile/', (req, res) => {
   controller.updateAgentProfile(req, res);
});

/*********Product Update Functions*************/
//update product 
route.put('/product/updateProduct/', (req, res) => {
   controller.updateProduct(req, res);
})
   ;
/************Category routes*************/
route.put('/categories/updateOne/', (req, res) => {
   controller.updateCategory(req, res);
})

// reservation routes
route.post('/reservation/addReservation', (req, res) => {
   controller.createReservation(req, res);
})


route.get('/reservations/getAllReservations/user/:id', (req, res) => {
   controller.getAllReservationsByIdAgent(req, res);
});


route.get('/reservations/getAllReservations', (req, res) => {
   controller.getAllReservations(req, res);
});


route.put('/reservation/update/', (req, res) => {
   controller.updateReservation(req, res);
})
// agence routes
route.post('/agence/addagence', (req, res) => {
   controller.createAgence(req, res);
})


route.get('/agence/getAllAgences', (req, res) => {
   controller.getAllAgence(req, res);
});


route.put('/agence/update/', (req, res) => {
   controller.updateAgence(req, res);
})
module.exports = route;