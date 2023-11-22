var bcrypt = require('bcrypt');
var fs = require('fs');
const agent = require('../model/agent');
const admin = require('../model/admin');
const customer = require('../model/customer');
const { parse } = require('path');
const mongoose = require('mongoose');
const product = require('../model/product');
const category = require('../model/category');
const reservation = require('../model/reservation');
const agence = require('../model/agence');

const jwt = require('jsonwebtoken');
var controller = {}
var cart = require('../model/cart');
const { default: axios } = require('axios');


function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
function getDate() {
  const today = new Date();
  const formattedDate = formatDate(today);
  return formattedDate;
}
/***************login Functions**************************************/
//agent login
controller.loginAgent = (req, res) => {
  agent.findOne({ email: req.body.email })
    .then(selectedAgent => {
      if (!selectedAgent) {
        res.send('no account found with this email ')
      }
      else {
        var trusted = bcrypt.compareSync(req.body.password, selectedAgent.password);
        if (trusted == true) {
          if (selectedAgent.etatCompte == 'active') {
            res.send(selectedAgent)
          }
          else if (selectedAgent.etatCompte == 'blocked') {
            res.send('you account has been blocked by the admin')
          }
          else if (selectedAgent.etatCompte == 'deleted') {
            res.send('you account has been deleted temporarly by the admin')
          }
        }
        else {
          res.send('your password is incorrect')
        }
      }
    })
    .catch(error => {
      res.send(error)
    })
}
//admin login 
controller.loginAdmin = (req, res) => {
  admin.findOne({ email: req.body.email })
    .then(selectedAgent => {
      if (!selectedAgent) {
        res.send('no account found with this email ')
      }
      else {
        var trusted = bcrypt.compareSync(req.body.password, selectedAgent.password);
        if (trusted == true) {
          res.send(selectedAgent)
        }
        else {
          res.send('your password is incorrect')
        }
      }
    })
    .catch(error => {
      res.send(error)
    })
}
//customer login 
controller.loginCustomer = (req, res) => {
  customer.findOne({ email: req.body.email })
    .then(selectedCustomer => {
      if (!selectedCustomer) {
        res.send('no account found with this email ')
      }
      else {
        var trusted = bcrypt.compareSync(req.body.password, selectedCustomer.password);
        if (trusted) {
          res.send(selectedCustomer)
        }
        else {
          res.send('your password is incorrect')
        }
      }
    })
    .catch(error => {
      res.send(error)
    })
}


/***************Get Data Functions**************************************/
/*******Agent Get Functions ********/
//get all agents
controller.getAllAgents = (req, res) => {
  agent.find({}, '-password').populate("agence")
    .then(agents => {
      res.send(agents);
    })
    .catch(error => {
      res.send(error);
    })
}
//get agent by id 
controller.getAgentById = (req, res) => {
  var agentID = req.params.id;
  agent.findOne({ _id: agentID }).populate("agence")
    .then(selectedAgent => {
      res.send(selectedAgent);
    })
    .catch(error => {
      res.send(error);
    })
}
/*******Product Get Functions ********/
//get all products
controller.getAllProducts = (req, res) => {
  product.find({})
    .then((products) => {
      res.send(products);
    })
    .catch((error) => {
      res.send('an error has oocured when retrieving products from database')
    })
}
//get product by id
controller.getProductById = (req, res) => {
  product.findById(req.params.id)
    .then(selectedProduct => {
      res.send(selectedProduct)
    })
    .catch(error => {
      res.send(error);
    })
}
//get then list of products of a certain category 
controller.getProductsByCategoryID = (req, res) => {
  product.find({ categoryId: req.params.categoryId })
    .then(products => {
      res.send(products);
    })
    .catch(error => {
      res.send('an error has occured when trying to  select the list of products ')
    })
}
/*******Category Get Functions ********/
//get all categories
controller.getAllCategories = (req, res) => {
  category.find({})
    .then(categories => {
      res.send(categories);
    })
    .catch(error => {
      res.send('error while trying to retroeve all users ');
    })
}
//get category by id 
controller.getCategoryById = (req, res) => {
  category.findById(req.params.id)
    .then(selectedCategory => {
      res.send(selectedCategory);
    })
    .catch(error => {
      res.send('error while trying to find a category')
    })
}
/*****Agent Get Routes*********/
controller.getCartItems = (req, res) => {
  cart.find({ $and: [{ customerId: req.params.customerId }, { orderId: 'no OrderID Yet' }] })
    .then(selectedItems => { res.send(selectedItems) })
    .catch(error => { res.send(error) })
}

/***************Delete Data Functions**************************************/
/*******Agents Delete Api ********/
//delete agent
controller.deleteAgent = (req, res) => {
  agent.findByIdAndUpdate(req.params.id, { etatCompte: 'deleted' })
    .then((data) => {
      res.send('agent account deleted successfully');
    })
    .catch((error) => {
      res.send(error)
    });
}
//delete Permanently 
controller.deleteAgentPermanently = (req, res) => {
  agent.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.send('agent account deleted permanetly successfully');
    })
    .catch((error) => {
      res.send(error)
    });
}
/*******Products Delete Functions ********/
//delete Product
controller.deleteProduct = (req, res) => {
  product.findByIdAndDelete(req.params.id)
    .then(data => {
      res.send('product deleted successfully')
    })
    .catch(error => {
      res.send('an error has occured while trying to delete a product ')
    })
}
/*******Category Delete Functions ********/
controller.deleteCategory = (req, res) => {
  category.findByIdAndDelete(req.params.id)
    .then(deletedCategory => {
      res.send(deletedCategory);
    })
    .catch(error => {
      res.send('erro while trying to delete the given category ');
    })
}
/***************Update Functions**************************************/
/*********Admin Update Functions*************/
//update agent profile 
controller.updateAdminProfile = (req, res) => {
  admin.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    avatar: req.body.avatar,
    regionAddress: req.body.regionAddress,
    cityAddress: req.body.cityAddress,
    postalCode: req.body.postalCode,
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 10)
  })
    .then((updatedAdmin) => {
      res.send(updatedAdmin);
    })
    .catch(error => {
      res.send(error);
    });
}
/*********Agent Update Functions*************/
//block agent
controller.blocAgent = (req, res) => {
  agent.findByIdAndUpdate(req.params.id, { etatCompte: 'blocked' })
    .then((data) => {
      res.send('agent account blocked successfully');
    })
    .catch((error) => {
      res.send(error)
    });
}
//unblock agent
controller.unBlockAgent = (req, res) => {
  agent.findByIdAndUpdate(req.params.id, { etatCompte: 'active' })
    .then((data) => {
      res.send('agent account activated successfully');
    })
    .catch((error) => {
      res.send(error)
    });
}
//restore agent
controller.restoreAgent = (req, res) => {
  agent.findByIdAndUpdate(req.params.id, { etatCompte: 'active' })
    .then((data) => {
      res.send('agent account restored successfully');
    })
    .catch((error) => {
      res.send(error)
    });
}
//update agent profile 
controller.updateAgence = (req, res) => {
  agence.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true })
    .then((updatedCategory) => {
      if (updatedCategory) {
        res.send(updatedCategory);
      }
      else {
        res.send('cannot find the agence ')
      }
    })
    .catch(error => {
      res.send('error while trying to update the given agence')
    })
}
controller.updateAgentProfile = (req, res) => {
  agent.findByIdAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true })
    .then((updatedAgent) => {
      res.send(updatedAgent);
    })
    .catch(error => {
      res.send(error);
    });
}
/*********Product Update Functions*************/
//update Product
controller.updateProduct = (req, res) => {
  product.findByIdAndUpdate(req.body.id, { productName: req.body.productName, productDescription: req.body.productDescription, unitPrice: req.body.unitPrice, Image: req.body.productImage, categoryId: req.body.categoryId })
    .then((updatedProduct => {
      res.send(updatedProduct);
    }))
    .catch(error => {
      res.send('an error occured while trying to update a product')
    })
}
/*********Category Update Functions*************/
//update category
controller.updateCategory = (req, res) => {
  category.findOneAndUpdate({ _id: req.body.id }, { categoryName: req.body.categoryName, categoryDescription: req.body.categoryDescription, categoryPhoto: req.body.categoryPhoto })
    .then((updatedCategory) => {
      if (updatedCategory) {
        res.send(updatedCategory);
      }
      else {
        res.send('cannot find the category ')
      }
    })
    .catch(error => {
      res.send('error while trying to update the given category ')
    })
}



/************************POST data functions*************************/
/********SubCommand Register************ */
controller.addToCart = (req, res) => {
  console.log(req.body);
  axios.get('http://localhost:3030/product/getProductById/' + req.body.productId)
    .then(response => {
      const { productId, customerId } = req.body;
      const productCount = 1; // Initial product count

      // Check if an item with the same customerId, productId, and orderId exists
      cart.findOne({
        productId,
        customerId,
        orderId: 'no OrderID Yet'
      })
        .then(existingCartItem => {
          if (existingCartItem) {
            // If the item exists, increment the category by 1
            existingCartItem.productCount = '' + (parseInt(existingCartItem.productCount) + 1);
            existingCartItem.save()
              .then(savedItem => {
                res.send('Product quantity updated successfully ' + savedItem);
              })
              .catch(error => {
                res.send(error);
              });
          } else {
            // If the item does not exist, create a new cart item
            const cartItem = new cart({
              productId,
              customerId,
              productCount,
              subTotalPrice: response.data.unitPrice,
              orderId: 'no OrderID Yet'
            });

            cartItem.save()
              .then(savedItem => {
                res.send('Product saved successfully ' + savedItem);
              })
              .catch(error => {
                res.send(error);
              });
          }
        })
        .catch(error => {
          res.send(error);
        });
    })
    .catch(error => {
      res.send(error);
    });
};

/********Customer Register************ */
controller.customerRegister = (req, res) => {
  const newCustomer = new customer({
    name: req.body.customerName,
    email: req.body.customerEmail,
    avatar: req.body.customerPhoto,
    regionAddress: req.body.customerAddressRegion,
    cityAddress: req.body.customerAddressCity,
    postalCode: req.body.customerAddressPostalCode,
    phone: req.body.customerPhoneNumber,
    password: bcrypt.hashSync(req.body.customerPassword, 10)
  });
  console.log(req.body)
  newCustomer.save()
    .then(savedCustomer => {
      res.status = 200;
      res.send(savedCustomer)
    })
    .catch(error => {
      res.status = 500;
      res.send(error)
    })
}
/******** Agent Post Functions********/
//add a new agent
controller.addNewAgent = (req, res) => {
  const newAgent = new agent({
    name: req.body.name,
    email: req.body.email,
    avatar: req.body.avatar,
    regionAddress: req.body.regionAddress,
    cityAddress: req.body.cityAddress,
    postalCode: req.body.postalCode,
    phone: req.body.phone,
    etatCompte: 'active',
    password: bcrypt.hashSync(req.body.password, 10)
  });
  newAgent.save()
    .then(savedAgent => {
      res.send(savedAgent)
    })
    .catch(error => {
      res.send(error)
    })
}
/*********Product Post Functions*******/
//add new product 
controller.addNewProduct = (req, res) => {
  const newProduct = new product({
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    unitPrice: req.body.unitPrice,
    productImage: req.body.productImage,
    categoryId: req.body.categoryId
  });
  newProduct.save()
    .then((newSavedProduct) => {
      res.send(newSavedProduct)
    })
    .catch((error) => {
      res.send('error while trying to save a new product');
    })
}
/*********ِCategories Post Functions*******/
//add new category 
controller.addNewCategory = (req, res) => {
  const newCategory = new category({
    categoryDescription: req.body.categoryDescription,
    categoryName: req.body.categoryName,
    categoryPhoto: req.body.categoryPhoto,
  });
  newCategory.save()
    .then(savedCategory => {
      res.send(savedCategory)
    })
    .catch(error => {
      res.send('error while trying to save a new category ');
    })
}

// reservation
controller.createReservation = async (req, res) => {
  const newRes = new reservation(req.body)
  try {
    const saveRes = await newRes.save()
    res.status(201).json(saveRes)
  }
  catch (err) {
    res.send('error while trying to save a new reservation ');
  }

}

controller.getAllReservations = (req, res) => {
  reservation.find({}).populate("agent").populate("product")
    .then(Reservations => {
      res.send(Reservations);
    })
    .catch(error => {
      res.send('error while trying to retroeve all users ');
    })
}


controller.updateReservation = (req, res) => {
  reservation.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true })
    .then((updatedCategory) => {
      if (updatedCategory) {
        res.send(updatedCategory);
      }
      else {
        res.send('cannot find the category ')
      }
    })
    .catch(error => {
      res.send('error while trying to update the given category ')
    })
}

//agence

controller.createAgence = async (req, res) => {
  const newRes = new agence(req.body)
  try {
    const saveRes = await newRes.save()
    res.status(201).json(saveRes)
  }
  catch (err) {
    res.send('error while trying to save a new agence ');
  }

}

controller.getAllAgence = (req, res) => {
  agence.find({}).populate("agent").then(agences => {
    res.send(agences);
  })
    .catch(error => {
      res.send('error while trying to retroeve all users ');
    })
}


controller.updateAgence = (req, res) => {
  agence.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true })
    .then((updatedCategory) => {
      if (updatedCategory) {
        res.send(updatedCategory);
      }
      else {
        res.send('cannot find the agence ')
      }
    })
    .catch(error => {
      res.send('error while trying to update the given agence')
    })
}


module.exports = controller;