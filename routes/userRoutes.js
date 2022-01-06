<<<<<<< HEAD
const router = require('express').Router()
const { User, Post } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { redirect } = require('express/lib/response')

//user registration
router.post('/users/register', (req, res) => {
  User.register(new User({ username: req.body.username, email: req.body.email, dob: req.body.dob}), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
    // res.redirect('./loginPage.html')
  })
})

// authenticate user login
router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    // req.session.save(() => {
    //   req.session.userId = user.id;
    //   req.session.username = user.username;
    //   req.session.loggedIn = true;

      res.json(user ? {
        username: user.username,
        token: jwt.sign({ id: user.id }, process.env.SECRET)
      } : null)
    })
  })
  
// })

// getting user information for profile generation
router.get('/users/profile', passport.authenticate('jwt'), (req, res) => res.json(req.user))

module.exports = router
=======
const router = require('express').Router()
const { User, Post } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { redirect } = require('express/lib/response')

//user registration
router.post('/users/register', (req, res) => {
  User.register(new User({ username: req.body.username, email:req.body.email, dob:req.body.dob}), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
    // res.redirect('./loginPage.html')
  })
})

// authenticate user login
router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    // req.session.save(() => {
    //   req.session.userId = user.id;
    //   req.session.username = user.username;
    //   req.session.loggedIn = true;

      res.json(user ? {
        username: user.username,
        token: jwt.sign({ id: user.id }, process.env.SECRET)
      } : null)
    })
  })
  
// })

// getting user information for profile generation
router.get('/users/profile', passport.authenticate('jwt'), (req, res) => res.json(req.user))

module.exports = router
>>>>>>> a303fffd0ce8266936a0cbd8c7b051aaa59e989b
