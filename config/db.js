const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        const cnn = await mongoose.connect('mongodb://localhost:27017/booksstories', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`mongodb Connected.. host${cnn.connection.host}`);
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB

