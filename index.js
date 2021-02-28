const config = require("config")
const app = require("./app")

const PORT = config.get('port') || 5000

app.listen(PORT, () =>
  console.log(`Server started to port ${PORT}!`)
)