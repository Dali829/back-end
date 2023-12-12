const express = require('express');
const route = express.Router();
const controller = require('../controller/controller')
var jwt = require('jsonwebtoken');


/****************login routes***********************/
//agent login route
route.post('/agent/login/', (req, res) => {
   controller.loginAgent(req, res);
});
//admin login
route.post(('/admin/login/', (req, res) => {
   controller.loginAdmin(req, res);
}));

/****************POST routes***********************/
/*************Customer Post Routes*******/
route.post('/customer/login/', (req, res) => {
   controller.loginCustomer(req, res);
})
/************Customer POST routes*************/
//add a new customer
route.post('/customer/register/', (req, res) => {
   controller.customerRegister(req, res);
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
//get all the ordered products of an user AKA cart items
route.get('/cart/getCartItems/:customerId', (req, res) => {
   controller.getCartItems(req, res)
})
/************Categories routes*************/
//get all categories
route.get('/categories/getAllCategories/', (req, res) => {
   controller.getAllCategories(req, res);
});
//get categoryById
route.get('/categories/getCategoryById/:id', (req, res) => {
   controller.getCategoryById(req, res);
});
/************Categories routes*************/
route.post('/cart/addToCart/', (req, res) => {
   controller.addToCart(req, res);
})

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
//delete definitevily 
route.delete('/agent/deleteAgentPermanently/:id', (req, res) => {
   controller.deleteAgentPermanently(req, res);
});
/************Category routes*************/
//delete Category
route.delete('/categories/deleteCategory/:id', (req, res) => {
   controller.deleteCategory(req, res);
})



/****************Update routes***********************/
/************Agent routes*************/
//block an agent
route.put('/agent/blocAgent/:id', (req, res) => {
   controller.blocAgent(req, res);
});
//unblock an agent 
route.put('/agent/unBlockAgent/:id', (req, res) => {
   controller.unBlockAgent(req, res);
});
//restore agent account
route.put('/agent/restoreAgent/', (req, res) => {
   controller.restoreAgent(req, res);
})
//update agent profile
route.put('/agent/updateProfile/', (req, res) => {
   controller.updateAgentProfile(req, res);
});
/*********Admin Update Functions************/
//update admin profile
route.put('/admin/updateProfile/', (req, res) => {
   controller.updateAdminProfile(req, res);
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