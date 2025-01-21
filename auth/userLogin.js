const user = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.userLogin = async (req, res) => {
    try {
        let { mobileNo, password } = req.body;

        let checkMobileNo = await user.findOne({ mobileNo, active: false })

        if (!checkMobileNo) {
            return res.status(404).json({ status: 404, message: "Mobile No Not Found" })
        }

        let comparePassword = await bcrypt.compare(password, checkMobileNo.password)

        if (!comparePassword) {
            return res.status(404).json({ status: 404, message: "Password Not Found" })
        }

        let token = jwt.sign({ _id: checkMobileNo._id }, process.env.SECRET_KEY, { expiresIn: '1D' });

        return res.status(200).json({ status: 200, message: "User Login SuccessFully...", user: checkMobileNo, token: token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        let { mobileNo, otp } = req.body

        let checkMobileNo = await user.findOne({ mobileNo })

        if (!checkMobileNo) {
            return res.status(404).json({ status: 404, message: "Mobile No Not Found" })
        }

        if (checkMobileNo.otp != otp) {
            return res.status(404).json({ status: 404, message: "Invalid Otp" })
        }

        checkMobileNo.otp = undefined

        await checkMobileNo.save();

        let token = jwt.sign({ _id: checkMobileNo._id }, process.env.SECRET_KEY, { expiresIn: '1D' });

        return res.status(200).json({ status: 200, message: "Otp Verify SuccessFully...", user: checkMobileNo, token: token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}

let otp = 5678

exports.forgotPassword = async (req, res) => {
    try {
        let { mobileNo } = req.body

        let checkMobileNo = await user.findOne({ mobileNo })

        if (!checkMobileNo) {
            return res.status(404).json({ status: 404, message: "Mobile No Not Found" })
        }

        checkMobileNo.otp = otp

        await checkMobileNo.save()

        return res.status(200).json({ status: 200, message: "Otp Sent SuccessFully..." });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.changePassword = async (req, res) => {
    try {
        let id = req.user._id

        let userId = await user.findById(id);

        if (!userId) {
            return res.status(404).json({ status: 404, message: "User Not Found" })
        }

        let { newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.json({ status: 400, message: "New Password And Confirm Password Not Match" })
        }

        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(newPassword, salt);

        let updatePassword = await user.findByIdAndUpdate(id, { password: hashPassword }, { new: true })

        return res.json({ status: 200, message: "Password Changed SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}