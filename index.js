const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')

const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', {define: { timestamps: false }})

const port = 4000
app.listen(port, () => `Listening on port ${port}`)

const House = sequelize.define('house', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  size: Sequelize.INTEGER,
  price: Sequelize.INTEGER
}, {
  tableName: 'houses'
})

House.sync() // this creates the houses table in your database when your app starts

app.get('/houses', function (req, res, next) {
  House.findAll()
    .then(houses => {
      res.json({ houses: houses })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong',
        error: err
      })
    })
})

app.get('/houses/:id', function (req, res, next) {
  const id = req.params.id     
  House.findByPk(id)
  .then(houses => {
    res.json({ houses: houses })
    })
  })

// app.use(bodyParser.json())

// app.post('/houses', function (req, res) {
//   console.log('Incoming data: ', req.body)
//   res.json({ message: 'Create a new house' })
// })

// House.create({
//   title: 'Multi Million Estate',
//   description: 'This was build by a super-duper rich programmer',
//   size: 1235,
//   price: 98400000
// }).then(house => console.log(`The house is now created. The ID = ${house.id}`))

// app.post('/houses', function (req, res) {
//   House
//     .create(req.body)
//     .then(house => res.status(201).json(house))
//     .catch(err => {
//       res.status(500).json({
//         message: 'Something went wrong',
//         error: err
//       })
//     })
// })

// app.get('/houses/:id', function (req, res, next) {
//   const id = req.params.id     
//   House.findByPk(id)
//   .then(houses => {
//     res.json({ houses: houses })
//     })
//   })

  app.put('/houses/:id', function (req, res) {
    const id = req.params.id
    House.findByPk(id)
      .then(house => house.update({title: 'HALLO'}))
      .then(house => res.status(200).json(house))
      .catch(err => {
        res.status(500).json({
          message: "I fucked up",
          error: err
        })
      })
    })

    app.delete('/houses/:id', function (req, res) {
      const id = req.params.id
      House.findByPk(id)
        .then(house => house.destroy({house}))
        .then(h => res.status(200).json({message: 'JOB DONE'}))
        .catch(err => {
          res.status(500).json({
            message:'ERROR',
            error: err
          })
        })
      })

    //   app.delete('/houses/:id', function(req, res){
    //     const id = req.params.id
    //     House.findByPk(id)
    //     .then(house => {
    //         if(house){
    //             house.destroy({house})
    //             .then(h => res.status(200).json({message: 'JUST ENOUGH TNT!! GOODJOB'}))
    //         } else {
    //             res.status(404).json({
    //                 message : 'couldnt destroy the house, bring TNT'
    //             })
    //         }
    //     })
    //     .catch(err =>{
    //         res.status(500).json({
    //             message: "TOMUCH TNT!!",
    //             error: err
    //         })
    //     })
    // })