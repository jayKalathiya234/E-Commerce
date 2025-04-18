const cart = require('../model/cartModels')
const mongoose = require('mongoose')

exports.createCart = async (req, res) => {
    try {
        let { productId, productVariantId, quantity } = req.body

        let checkExistCart = await cart.findOne({ userId: req.user._id, productId, productVariantId })

        if (checkExistCart) {
            checkExistCart.quantity += quantity
            await checkExistCart.save()

            return res.status(409).json({ status: 409, message: "Cart Already Exist" })
        }

        checkExistCart = await cart.create({
            userId: req.user._id,
            productId,
            productVariantId,
            quantity
        });

        return res.status(201).json({ status: 201, message: "Cart Created SuccessFully...", cart: checkExistCart })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.getAllCarts = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedCarts;

        paginatedCarts = await cart.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productData"
                }
            },
            {
                $lookup: {
                    from: "productvariants",
                    localField: "productVariantId",
                    foreignField: "_id",
                    as: "productVariantData"
                }
            }
        ])

        let count = paginatedCarts.length

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "Cart Not Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + lastIndex)
            paginatedCarts = await paginatedCarts.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalCarts: count, message: "All Carts Found SuccessFully....", carts: paginatedCarts })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.getCartById = async (req, res) => {
    try {
        let id = req.params.id

        let getCardId = await cart.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productData"
                }
            },
            {
                $lookup: {
                    from: "productvariants",
                    localField: "productVariantId",
                    foreignField: "_id",
                    as: "productVariantData"
                }
            }
        ])

        if (!getCardId) {
            return res.status(404).json({ status: 404, message: "Cart Not Found" })
        }

        return res.status(200).json({ status: 200, message: "Cart Found SuccessFully....", cart: getCardId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.updateCartById = async (req, res) => {
    try {
        let id = req.params.id

        let updateCartId = await cart.findById(id)

        if (!updateCartId) {
            return res.status(404).json({ status: 404, message: "Cart Not Found" })
        }

        updateCartId = await cart.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, message: "Cart Updated SuccessFully....", cart: updateCartId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.deleteCartById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteCartId = await cart.findById(id)

        if (!deleteCartId) {
            return res.status(404).json({ status: 404, message: "Cart Not Found" })
        }

        await cart.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, message: "Cart Deleted SuccessFully...." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.getAllMyCarts = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedMyCart;

        paginatedMyCart = await cart.aggregate([
            {
                $match: {
                    userId: req.user._id
                }
            },
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productData"
                }
            },
            {
                $lookup: {
                    from: "productvariants",
                    localField: "productVariantId",
                    foreignField: "_id",
                    as: "productVariantData"
                }
            }
        ])
        let count = paginatedMyCart.length

        if (count === 0) {
            return res.status(404).json({ status: 404, message: "No Cart Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedMyCart = await paginatedMyCart.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalMyCarts: count, message: "All My Carts Found SuccessFully...", carts: paginatedMyCart })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}