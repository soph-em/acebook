const bcrypt = require("bcryptjs")

// creating the hash, takes a plaintext password, adds salt to a factor of 10 
const generateHash = (password) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

// compares the hashed version to the plain text password
const compareHash = (password, hashed) => {
    return bcrypt.compareSync(password, hashed)
}

module.exports = {generateHash, compareHash};



// testing data 
// $2a$10$q.pVxNlnff/0IYOeNv6u1.mGdPOml2D43iae1XQJuKMEp4/jmc74u
// console.log(compareHash("password123","$2a$10$q.pVxNlnff/0IYOeNv6u1.mGdPOml2D43iae1XQJuKMEp4/jmc74u"))