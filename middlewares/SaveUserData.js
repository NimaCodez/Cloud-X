const { UserModel } = require("../models/user.model");

const SaveUserData = async (req, res, next) => {
    const { email } = req.user;

    const browser = req.get('User-Agent');
    const IPAddress = req.ip;
    const lastTimeLoggedIn = Date.now();
    await UserModel.updateOne({ email },  {
        $set: {
            browser,
            IPAddress,
            lastTimeLoggedIn
        }
    })

    next();
}

module.exports = {
    SaveUserData
}
