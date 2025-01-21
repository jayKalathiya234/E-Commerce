const express = require('express');
const { createNewUser, getAllUsers, createNewUserAdmin, getUserById, updateUserById, activeUserAccount, deactiveAccoutOtpVerify, activeAccoutOtpVerify, resendOtpDeactiveAccount, resendOtpActiveAccount, deactiveUserAccount } = require('../controller/userController');
const { verifyOtp, userLogin, forgotPassword, changePassword } = require('../auth/userLogin');
const { createMainCategory, getAllMainCategory, getMainCategoryById, updateMainCategoryById, deleteMainCategoryById } = require('../controller/mainCategoryController');
const upload = require('../helper/imageUplode');
const { createCategory, getAllCategory, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controller/categoryController');
const { createSubCategory, getAllSubCategory, getSubCategoryById, updateSubCategoryById, deleteSubCategoryById } = require('../controller/subCategoryController');
const { createAddress, getAllAddress, getAddressById, updateAddressById, deleteAddressById, getAllMyAddress } = require('../controller/addressController');
const { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById } = require('../controller/productController');
const { createProductVariant, getAllProductVariant, getProductVarinatById, updateProductVariantById, deleteProducVariant, updateProductStatusById } = require('../controller/productVariantController');
const { createWishList, getAllWishList, getWishListById, deleteWishlListById, getMyWishListById } = require('../controller/wishlistController');
const { createSpecialOffer, getAllSpecialOffer, getSpecialOfferById, updateSpecialOfferById, deleteSpecialOfferById } = require('../controller/specialOfferController');
const { createPaymentMethod, getAllCardData, getAllMyPaymentData, updatePaymentdataById, deletePaymentDataById } = require('../controller/paymentMethodController');
const { auth } = require('../helper/authToken');
const { createOrder, getAllOrders, getOrderById, updateOrderById, updateOrderItemQuantityById, deleteOrderItemById, deleteOrderById, getAllMyOrders } = require('../controller/orderController');
const { createRatingAndReview, getAllRatingAndReview, getRatingAndReviewById, updateRatingAndReview, deleteRaingAndReviewById, getMyRatingAndReview } = require('../controller/ratingAndReviewController');
const { createReturnOrder, returnOrderVerifyOtp, getAllReturnOrder, getReturnOrderDataById, changeReturnOrderStatusById, getAllMyReturnOrderData } = require('../controller/returnOrderController');
const { createContactUs, getAllContactUs, getContactUsById, deleteContactUsById } = require('../controller/contactUsController');
const indexRoutes = express.Router();

// Auth Routes

indexRoutes.post('/login', userLogin)
indexRoutes.post('/verifyOtp', verifyOtp)
indexRoutes.post('/forgotPassword', forgotPassword)
indexRoutes.post('/resetPassword', auth(['admin', 'user']), changePassword)

// User Routes Routes

indexRoutes.post('/createadmin', createNewUserAdmin);
indexRoutes.post('/createUser', createNewUser);
indexRoutes.get('/getAllUsers', auth(['admin']), getAllUsers);
indexRoutes.get('/getUser', auth(['admin', 'user']), getUserById);
indexRoutes.put('/updateUser', auth(['admin', 'user']), updateUserById);
indexRoutes.get('/deactiveUser', auth(['user']), deactiveUserAccount);
indexRoutes.get('/deactiveAccountOtpVerify', auth(['user']), deactiveAccoutOtpVerify);
indexRoutes.get('/activeUserAccount', auth(['user']), activeUserAccount);
indexRoutes.get('/activeAccountOtpVerify', auth(['user']), activeAccoutOtpVerify);
indexRoutes.get('/resendOtpDeactiveAccount', auth(['user']), resendOtpDeactiveAccount);
indexRoutes.get('/resendOtpActiveAccount', auth(['user']), resendOtpActiveAccount);

// Main Category Routes

indexRoutes.post('/createMaincategory', auth(['admin']), upload.single('mainCategoryImage'), createMainCategory);
indexRoutes.get('/allMainCategory', auth(['admin', 'user']), getAllMainCategory);
indexRoutes.get('/getMainCategory/:id', auth(['admin', 'user']), getMainCategoryById);
indexRoutes.put('/updateMainCategory/:id', auth(['admin']), upload.single('mainCategoryImage'), updateMainCategoryById);
indexRoutes.delete('/deleteMainCategory/:id', auth(['admin']), deleteMainCategoryById)

// Category Routes

indexRoutes.post('/createCategory', auth(['admin']), createCategory);
indexRoutes.get('/allCategory', auth(['admin', 'user']), getAllCategory);
indexRoutes.get('/getCategory/:id', auth(['admin', 'user']), getCategoryById);
indexRoutes.put('/updateCategry/:id', auth(['admin']), updateCategoryById);
indexRoutes.delete('/deleteCategory/:id', auth(['admin']), deleteCategoryById);

// subCategory Routes

indexRoutes.post('/createSubCategory', auth(['admin']), createSubCategory);
indexRoutes.get('/allSubCategory', auth(['admin', 'user']), getAllSubCategory);
indexRoutes.get('/getSubCategory/:id', auth(['admin', 'user']), getSubCategoryById);
indexRoutes.put('/updateSubCategory/:id', auth(['admin']), updateSubCategoryById);
indexRoutes.delete('/deleteSubCategory/:id', auth(['admin']), deleteSubCategoryById);

// address Routes

indexRoutes.post('/createAddress', auth(['user']), createAddress);
indexRoutes.get('/allAddress', auth(['admin']), getAllAddress);
indexRoutes.get('/getAddress/:id', auth(['admin', 'user']), getAddressById);
indexRoutes.put('/updateAddress/:id', auth(['admin', 'user']), updateAddressById);
indexRoutes.delete('/deleteAddress/:id', auth(['admin', 'user']), deleteAddressById);
indexRoutes.get('/getAllMyAddress', auth(['user']), getAllMyAddress);

// product Routes 

indexRoutes.post('/createProduct', auth(['admin']), upload.array('images'), createProduct);
indexRoutes.get('/allProduct', auth(['admin', 'user']), getAllProducts);
indexRoutes.get('/getProduct/:id', auth(['admin', 'user']), getProductById);
indexRoutes.put('/updateProduct/:id', auth(['admin']), upload.array('images'), updateProductById);
indexRoutes.delete('/deleteProduct/:id', auth(['admin']), deleteProductById);

// product Variant 

indexRoutes.post('/createProductVariant', auth(['admin']), upload.fields([{ name: 'images' }]), createProductVariant);
indexRoutes.get('/allProductVariant', auth(['admin', 'user']), getAllProductVariant);
indexRoutes.get('/getProductVariant/:id', auth(['admin', 'user']), getProductVarinatById)
indexRoutes.put('/updateProductVariant/:id', auth(['admin']), upload.fields([{ name: 'images' }]), updateProductVariantById);
indexRoutes.delete('/deleteProductVariant/:id', auth(['admin']), deleteProducVariant);
indexRoutes.put('/updateProductStatus/:id', auth(['admin']), updateProductStatusById);

// WishList 

indexRoutes.post('/createWishList', auth(['admin', 'user']), createWishList);
indexRoutes.get('/allwishList', auth(['admin']), getAllWishList);
indexRoutes.get('/getWishlist/:id', auth(['admin', 'user']), getWishListById);
indexRoutes.delete('/deleteWishList/:id', auth(['admin', 'user']), deleteWishlListById);
indexRoutes.get('/getMyWishList', auth(['admin', 'user']), getMyWishListById);

// special Offer

indexRoutes.post('/createSpecialOffer', auth(['admin']), upload.single("offerImage"), createSpecialOffer);
indexRoutes.get('/allSpecialOffer', auth(['admin', 'user']), getAllSpecialOffer)
indexRoutes.get('/getSpecialOffer/:id', auth(['admin', 'user']), getSpecialOfferById);
indexRoutes.put('/updateSpecialOffer/:id', auth(['admin', 'user']), upload.single("offerImage"), updateSpecialOfferById);
indexRoutes.delete('/deleteSpecialOffer/:id', auth(['user']), deleteSpecialOfferById);

// Payment Method Routes

indexRoutes.post('/createPaymentMethod', auth(['admin', 'user']), createPaymentMethod);
indexRoutes.get('/allCardData', auth(['admin', 'user']), getAllCardData);
indexRoutes.get('/getAllMyPayment', auth(['admin', 'user']), getAllMyPaymentData);
indexRoutes.put('/updatePaymentData/:id', auth(['admin', 'user']), updatePaymentdataById);
indexRoutes.delete('/deletePaymentData/:id', auth(['admin', 'user']), deletePaymentDataById)

// Order Routes

indexRoutes.post('/createOrder', auth(['user']), createOrder);
indexRoutes.get('/allOrders', auth(['admin', 'user']), getAllOrders);
indexRoutes.get('/getOrder/:id', auth(['admin', 'user']), getOrderById);
indexRoutes.put('/updateOrder/:id', auth(['user']), updateOrderById);
indexRoutes.put('/updateItemQty/:id', auth(['user']), updateOrderItemQuantityById);
indexRoutes.delete('/deleteOrderItem/:id', auth(['user']), deleteOrderItemById);
indexRoutes.delete('/deleteOrder/:id', auth(['user']), deleteOrderById)
indexRoutes.get('/getAllMyOrders', auth(['user']), getAllMyOrders);

// rating And Review Routes

indexRoutes.post('/createRatingAndReview', auth(['user']), upload.fields([{ name: 'productImages' }]), createRatingAndReview);
indexRoutes.get('/allratingAndReview', auth(['admin', 'user']), getAllRatingAndReview);
indexRoutes.get('/getRatingReview/:id', auth(['admin', 'user']), getRatingAndReviewById);
indexRoutes.put('/updateRatingAndReview/:id', auth(['user']), upload.fields([{ name: 'productImages' }]), updateRatingAndReview);
indexRoutes.delete('/deleteRatingAndReview/:id', auth(['user']), deleteRaingAndReviewById);
indexRoutes.get('/getMyRating', auth(['user']), getMyRatingAndReview);

// return Order Routes

indexRoutes.post('/generateReturnOrderOtp', auth(['user']), createReturnOrder);
indexRoutes.post('/verifyReturnOrderOtp', auth(['user']), returnOrderVerifyOtp);
indexRoutes.get('/allReturnOrders', auth(['admin', 'user']), getAllReturnOrder);
indexRoutes.get('/getReturnOrder/:id', auth(['admin', 'user']), getReturnOrderDataById);
indexRoutes.put('/changeReturnOrderStatus/:id', auth(['admin']), changeReturnOrderStatusById);
indexRoutes.get('/getMyReturnOrders', auth(['user']), getAllMyReturnOrderData);

// contctUs Routes

indexRoutes.post('/createContctUs', createContactUs);
indexRoutes.get('/allContactUs', auth(['admin']), getAllContactUs);
indexRoutes.get('/getContactUs/:id', auth(['admin']), getContactUsById);
indexRoutes.delete('/deleteContactUs/:id', auth(['admin']), deleteContactUsById);

module.exports = indexRoutes