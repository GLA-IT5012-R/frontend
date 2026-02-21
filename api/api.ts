export const api: any = {
    loginOrRegister: '/verify-code/',  // 验证邮箱验证码并登录/注册
    requestCode: '/request-code/',     // 请求邮箱验证码
    adminlogin: '/login/',
    refreshToken: '/token/refresh/',
    testAuth: '/testAuth/',
    syncUser: '/sync-user/',
    saveAddr:'/save-address/',
    getProducts: '/products/list/',
    addProducts: '/products/add/',
    getAssetsList: '/products/assets/',
    updateProductStatus: '/products/update-status/',
    statsOverview: '/stats-overview/',
    upload: '/products/upload/',
    addCustomDesign: '/products/add-design/',

    addProduct: '/products/add-product/',
    // 订单
    orderList: '/orders/list/',
    addOrder: '/orders/add/',
    userOrders:'orders/user/',
    updateOrderStatus: '/orders/update-order-status/',
  
    // 管理端接口

};