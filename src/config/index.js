const mongoose = require("mongoose")

const connectToDB = () => {
    let DB_URI = "mongodb+srv://toluwalaseowonubi:QssmFKX4j9Oh5Vg6@cluster0.gtqlv.mongodb.net/tolubackend?retryWrites=true&w=majority&appName=Cluster0"
    // let DB_URI = process.env.LOCAL_DB_URI
    mongoose.connect(DB_URI)
        .then(() => console.log("DB Connected"))
        .catch((err) => console.log("Error connecting to DB" + err))
}

module.exports = connectToDB