export const api: any = {
    loginOrRegister: '/verify-code/',  // 验证邮箱验证码并登录/注册
    requestCode: '/request-code/',     // 请求邮箱验证码
    adminlogin: '/login/',
    refreshToken: '/token/refresh/',
    testAuth: '/testAuth/',
    syncUser: '/sync-user/',
    saveAddr:'/save-address/',
    // products
    getProducts: '/products/list/',
    addProducts: '/products/add/',
    getAssetsList: '/products/assets/',
    updateProductStatus: '/products/update-status/',
    statsOverview: '/stats-overview/',
    upload: '/products/upload/',
    addCustomDesign: '/products/add-design/',
    addProduct: '/products/add-product/',
    // shops order/cart
    orderList: '/shops/list/',
    addOrder: '/shops/add/',
    usershops:'shops/user/',
    updateshopstatus: '/shops/update-order-status/',
    addCart:'/shops/add-cart/',
    updcart:'/shops/updare-cart/',
    cartlist:'/shops/cart/',
    delcarts:'/shops/delcarts/'

    // 管理端接口

};