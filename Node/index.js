const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })
const app = express()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const secret = 'thisismysecret'





const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}


const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, next) {
  const user = users.find(user => user.email === payload.user)
  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
})

passport.use(jwtStrategy)


let email = ''
let password = ''

//Recupère un article via son nom en post
app.post('/get', urlEncodedParser, async function (req, res) {
  const name = req.body.name

  const url = 'https://testdb-c8e2.restdb.io/rest/articles'

  const config= {
    params: {
    q: {nom : name}
  },
    headers: {'x-apikey' : 'd994392c1ae7155ce9177488e4f57645696c7'}
  }
  const response = await axios.get(url, config)
  console.log(response.data)
})




//Recupère la liste des articles
app.post('/getliste', urlEncodedParser, async function (req, res) {

  const url = 'https://testdb-c8e2.restdb.io/rest/articles'

  const config= {
    headers: {'x-apikey' : 'd994392c1ae7155ce9177488e4f57645696c7'}
  }
  const response = await axios.get(url, config)
  console.log(response.data)
})



//Ajouter un article
app.post('/add', urlEncodedParser, passport.authenticate('jwt', { session: false }), async function (req, res) {

  const name = req.body.name
  const quantite = req.body.quantite
  const prix = req.body.prix

  const data = {
    nom: name,
    quantite: quantite,
    prix: prix,
    refmail: email
  }

  const url = 'https://testdb-c8e2.restdb.io/rest/articles'

  const config= {
    headers: {'x-apikey' : 'd994392c1ae7155ce9177488e4f57645696c7'}
  }
  const response = await axios.post(url, data, config)
  console.log(response)
})



//supprimer un article
app.delete('/delete', urlEncodedParser, passport.authenticate('jwt', { session: false }), async function (req, res, next) {
  try{

  let name = req.body.name
  let url = 'https://testdb-c8e2.restdb.io/rest/articles'

  let config= {
    params: {
    q: {nom : name}
  },
    headers: {'x-apikey' : 'd994392c1ae7155ce9177488e4f57645696c7'}
  }
  let response = await axios.get(url, config)
  let whoCreated = response.data[0].refmail

  if(whoCreated === email){ //si la personne voulant supprimer est la personne ayant créé l'article

  url = 'https://testdb-c8e2.restdb.io/rest/articles/*'

  config= {
    params: {
    q: {nom : name}
  },
    headers: {'x-apikey' : 'd994392c1ae7155ce9177488e4f57645696c7'}
  }


  response = await axios.delete(url,config)
  console.log(response)
}
else console.log("Vous n'avez pas créé cet article, vous ne pouvez donc pas le supprimer.")
}
catch (err) {
    next(err);
  } 
})



//modifier un article
app.put('/update', urlEncodedParser, passport.authenticate('jwt', { session: false }), async function (req, res, next) {
  try{

  const id = req.body.id
  const name = req.body.name
  const quantite = req.body.quantite
  const prix = req.body.prix

  let url = 'https://testdb-c8e2.restdb.io/rest/articles'

  let config= {
    params: {
    q: {nom : name}
  },
    headers: {'x-apikey' : 'd994392c1ae7155ce9177488e4f57645696c7'}
  }
  let response = await axios.get(url, config)
  let whoCreated = response.data[0].refmail
  if(whoCreated === email){ //si la personne voulant modifier est la personne ayant créé l'article

  const data = {
    nom: name,
    prix: prix,
    quantite: quantite
  }

  const url = 'https://testdb-c8e2.restdb.io/rest/articles/5ffd7504dcebc0650015a7e5'

  const config= {
    headers: {'x-apikey' : 'd994392c1ae7155ce9177488e4f57645696c7'}
  }
  const response = await axios.put(url, data, config)

  console.log(response)
  }
else{
  console.log("Vous n'avez pas créé cet article, vous ne pouvez donc pas le modifier.")
}
}
  catch (err) {
    next(err);
  }
})





//Créer un compte
app.post('/create', urlEncodedParser, async function (req, res) {

  const data = {
    mail: mail,
    password: password
  }

  const url = 'https://testdb-c8e2.restdb.io/rest/util'

  const config= {
    headers: {'x-apikey' : 'd994392c1ae7155ce9177488e4f57645696c7'}
  }
  const response = await axios.post(url, data, config)
  console.log(response)
})







//Connexion
app.post('/login', urlEncodedParser, async function (req, res) {
  email = req.body.email
  password = req.body.password


  if (!email || !password) {
    res.status(401).json({ error: 'Email or password was not provided.' })
    return
  }


  const url = 'https://testdb-c8e2.restdb.io/rest/util'

  const config= {
    params: {
    q: {mail : email,
        password : password}
  },
    headers: {'x-apikey' : 'd994392c1ae7155ce9177488e4f57645696c7'}
  }
  const response = await axios.get(url, config)
  let user = undefined


  if(response.data.length !== 0){ //si la reponse n'est pas vide
  user = response.data[0].mail
  }
  if (!user){
    res.status(401).json({ error: 'Email / password do not match.' })
    return
  }

  const userJwt = jwt.sign({ user: user }, secret)
  res.json({ jwt: userJwt })
})







app.listen(3002, () => {
  console.log('running')
})

