const authService = require("../services/auth.service");
const login = async (req, res, next) => {
    try {
        const { token } = await authService.login(req.body);
        res.status(200).json({ message: "Uğurla daxil oldunuz", success: true, token });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    login
};