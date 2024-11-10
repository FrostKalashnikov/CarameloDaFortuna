const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const porta = 5500 //process.env.PORT 

app.use(express.static(path.join(__dirname, 'Pages')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', '/Home.html'))
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', '/Home.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', '/Login.html'))
})

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', '/Cadastro.html'))
})

app.get('/blackjack', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', '/BlackJack.html'))
})

app.get('/jackpot', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', '/Jackpot.html'))
})

app.get('/roulette', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', '/Roulette.html'))
})

app.listen(porta, ()=>{console.log(`servidor rodando na porta: ${porta}`)})


