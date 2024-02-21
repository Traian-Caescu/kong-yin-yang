const express = require('express')
const app = express()
const axios = require('axios')
const path = require('path')

const YANG_PORT = process.env.YANG_PORT || 3001
const YIN_PORT = process.env.YIN_PORT || 3000
const YIN_HOST = process.env.YIN_HOST || 'localhost'  
const YANG_HOST = process.env.YANG_HOST || 'localhost'


app.use(express.static(__dirname))

// Deny access to public caller 
app.get('/want-yang', (req, res) => {
  if (req.headers.host == `${YANG_HOST}:${YANG_PORT}`)
    res.send(`<h2>Hey Yin, I'll be your Yang. <br>Here is my address: ${req.headers.host} (${req.socket.localAddress}). <br>I know yours is yours is: ${req.socket.remoteAddress}</h2>`)
  else
    res.send(`<h2>Hey Yang, this is Yin and Yang not Yang and Yang - what's the matter with you..?</h2>`)
})

app.get('/want-yin', async (req, res) => {
  try {
    const response = await axios.get(`http://${YIN_HOST}:${YIN_PORT}/want-yin`)
    res.send(response.data)
  } catch (err) {
    res.send(err)
  }
})

app.listen(YANG_PORT, () => console.log(`Listening on port ${YANG_PORT}`))




