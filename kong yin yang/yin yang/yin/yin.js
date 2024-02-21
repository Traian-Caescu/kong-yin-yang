const express = require('express')
const app = express()
const axios = require('axios')

const YANG_PORT = process.env.YANG_PORT || 3001
const YIN_PORT = process.env.YIN_PORT || 3000
const YIN_HOST = process.env.YIN_HOST || 'localhost'  // Use when in debugger. Need to change yin or yang port too
const YANG_HOST = process.env.YANG_HOST || 'localhost'

app.use(express.static(__dirname))  

// Deny access to public caller 
// No need to deny access now as API gateway will only call the correct endpoints. Commented out previous
app.get('/want-yin', (req, res) => {
  if (req.headers.host == `${YIN_HOST}:${YIN_PORT}`)
    res.send(`<h2>Hey Yang, I'll be your Yin. <br>Here is my address: ${req.headers.host} (${req.socket.localAddress}). <br>I know yours is yours is: ${req.socket.remoteAddress}</h2>`)
  else
    res.send(`<h2>Hey Yin, this is Yin and Yang not Yin and Yin - what's the matter with you..?</h2>`)
})


app.get('/want-yang', async (req, res) => {
  try {
    const response = await axios.get(`http://${YANG_HOST}:${YANG_PORT}/want-yang`)
    res.send(`${response.data}`)
  } catch (err) {
    res.send(err)
  }
})

app.listen(YIN_PORT, () => console.log(`Listening on port ${YIN_PORT}`))




