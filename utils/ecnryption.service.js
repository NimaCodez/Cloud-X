const { genSaltSync, hashSync, compareSync } = require("bcrypt")

const hashPassword = (password) => {
    const salt = genSaltSync(11);
    return hashSync(password, salt);
}

const comparePassword = (password, hashPassword) => {
    return compareSync(password, hashPassword);
}

module.exports = {
    hashPassword,
    comparePassword
}
