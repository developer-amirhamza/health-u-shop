


export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL
console.log(baseUrl, "url working ")


export const SummeryApi = {

    resetPassword: {
        url: "/api/user/reset-password",
        method: "post",
    },
    signup: {
        url: "/api/user/signup",
        method: "post",
    },
    signin: {
        url: "/api/user/signin",
        method: "post"
    },
    refreshToken: {
        url: '/api/user/refresh-token',
        method: 'post'
    },
    getUserDetails: {
        url: "/api/user/get-user-details",
        method: "get",
    },
    signout: {
        url: "/api/user/signout",
        method: "get",
    },
    imageUpload: {
        url: "/api/image/upload",
        method: "post",
    },
    updateUserDetails: {
        url: "/api/user/update-user",
        method: "put",
    },
    getAllUser: {
        url: "/api/user/all-users",
        method: "get",
    },
    updateUserByAdmin: {
        url: "/api/user/update-user-by-admin",
        method: "put",
    },
    deleteUser: {
        url: "/api/user/delete-user",
        method: "delete",
    },
    fetchProducts: {
        url: "/api/products/all",
        method: "get"
    },
    fetchProductDetails: {
        url: "/api/products/get-details",
        method: "post"
    },
    addProduct: {
        url: "/api/products/create",
        method: "post"
    },
    updateProduct: {
        url: "/api/products/update",
        method: "put"
    },
    deleteProduct: {
        url: "/api/products/delete",
        method: "delete"
    },
    searchProduct: {
        url: "/api/products/search",
        method: "get",  // GET request
    },
    getProductByCategory: {
        url: "/api/products/by-category",
        method: "post",
    },

    fetchCart: {
        url: "/api/cart/get-cart",
        method: "get"
    },
    addCart: {
        url: "/api/cart/add-cart",
        method: "post"
    },
    updateCart: {
        url: "/api/cart/update-cart",
        method: "put"
    },
    deleteCart: {
        url: "/api/cart/delete-cart",
        method: "delete"
    },
    mergeCart: {
        url: "/api/cart/merge",
        method: "post",
    },

    // Orders
    placeOrder: {
        url: "/api/orders/place-order",
        method: "post",
    },
    fetchMyOrders: {
        url: "/api/orders/my-orders",
        method: "get",
    },
    fetchOrderByNumber: {
        url: "/api/orders/lookup",
        method: "get",
    },
    fetchAllOrdersByAdmin: {
        url: "/api/orders/admin/get-all-orders",
        method: "get",
    },
    updateOrderByAdmin: {
        url: "/api/orders/admin/update-order",
        method: "put",
    },

    // Payment (Stripe)
    createCheckoutSession: {
        url: "/api/payment/create-checkout-session",
        method: "post",
    },

    // review
        getAllReviews: {
        url: "/api/reviews/all-reviews",
        method: "get"
    },
    addReview: {
        url: "/api/reviews/add-review",
        method: "post"
    },
    getProductReviews: {
        url: "/api/reviews/get-reviews",
        method: "post"
    },
    updateReview: {
        url: "/api/review/update-review",
        method: "put"
    },
    deleteReview: {
        url: "/api/review/delete-review",
        method: "delete"
    },

    // categories
    getAllCategories: {
        url: "/api/categories",
        method: "get"
    },
    createCategory: {
        url: "/api/categories/create",
        method: "post"
    },
    updateCategory: {
        url: "/api/categories/update",
        method: "put"
    },
    getCategoryBySlug: {
        url: "/api/categories/single-category",
        method: "post"
    },
    deleteCategory: {
        url: "/api/categories/delete",
        method: "delete"
    },



    // subcategory

fetchSubcategoriesByCategory: {
    url: "/api/subcategories/category/subcategories-by-categories",
    method: "post",
},
fetchSubcategoryBySlug: {
    url: "/api/subcategories/subcategory-by-slug",
    method: "get",
},
createSubcategory: {
    url: "/api/subcategories/create",
    method: "post",
},
updateSubcategory: {
    url: "/api/subcategories/update",
    method: "put",
},
deleteSubcategory: {
    url: "/api/subcategories/delete",
    method: "delete",
},

    // SummeryApi additions

    getProductBySubcategory: {
        url: "/api/products/by-subcategory",
        method: "post",
    },

    createProduct: {
        url: "/api/products/create",
        method: "post",
    },

    getAllBlogs: {
        url: "/api/blogs/all",
        method: "get",
    },
    getBlogById: {
        url: "/api/blogs/by-id",
        method: "post",
    },
    getBlogBySlug: {
        url: "/api/blogs/by-slug",
        method: "post",
    },
    createBlog: {
        url: "/api/blogs/create",
        method: "post",
    },
    updateBlog: {
        url: "/api/blogs/update",
        method: "put",
    },
    deleteBlog: {
        url: "/api/blogs/delete",
        method: "delete",
    },

};
