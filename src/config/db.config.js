const dotenv = require(`dotenv`)

dotenv.config()

module.exports ={
    local: {
        localDatabaseUrl: 'mongodb://localhost:27017/jwtAuthDb'
    }
}