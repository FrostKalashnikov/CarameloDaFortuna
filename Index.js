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
    res.sendFile(path.join(__dirname, 'Pages', '/Game1-BlackJack.html'))
})

app.get('/Jackpot', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', '/Game2-SlotMachine.html'))
})

app.get('/Roulette', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages', '/Game3-Roulette.html'))
})

app.listen(porta, ()=>{console.log('servidor rodando')})


