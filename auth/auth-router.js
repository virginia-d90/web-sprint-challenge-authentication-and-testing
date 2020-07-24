const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require("./auth-model")




router.post('/register', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8)

  const credentials ={
    username: req.body.username,
    password: req.body.password
  }

  Users.addUser(credentials)
    .then( async user => {
      const token = await createToken(user)

      res.status(200).json({error: false, message: "user created", token})
    })
    .catch(err => {
      res.status(400).json({error: true, message: "could not register", err})
    })
});

router.post("/login", (req, res) => {
  Users.findBy({username: req.body.username})
      .then(async user => {
          if(user){
              if(bcrypt.compareSync(req.body.password, user.password)){
                  const token = await createToken(user)

                  res.status(200).json({error:false, message: "user successfully logged in", token})
              } else {
                  res.status(400).json({error: true, message: "invalid password"})
              }
          } else {
              res.status(400).json({error: true, message: "invalid username"})
          }
      })
})


//create Token

function createToken(payload){
  const secret = "keep it secret"

  const options = {
    expiresIn: '1h'
  }
  delete payload.password
  return jwt.sign(payload, secret, options)
}

module.exports = router;
