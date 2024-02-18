require ("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const dbConnect = require('./config/mongo')


app.use(cors());
app.use(express.json());
app.use(express.static("storage"))



const port = process.env.PORT || 4001;



/**
 * Invocamos a las rutas
 */
// Cuando las personas entren a "http://localhost/api/..."
app.use("/api", require("./routes/"))

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

dbConnect()