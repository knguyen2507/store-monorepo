export const RMQ = {
  EXCHANGE: 'store.services',

  RK_AUTHENTICATION_CMD_USER_CREATE: 'authentication.cmd.user.create',
  RK_AUTHENTICATION_CMD_USER_LOGIN: 'authentication.cmd.user.login',
  RK_AUTHENTICATION_CMD_USER_UPDATE_PASSWORD:
    'authentication.cmd.user.update.password',
  RK_AUTHENTICATION_CMD_USER_LOGOUT: 'authentication.cmd.user.logout',
  RK_AUTHENTICATION_QRY_FIND_USER: 'authentication.qry.find.user',
  RK_AUTHENTICATION_QRY_FIND_DETAIL_USER: 'authentication.qry.find.detail.user',
  RK_AUTHENTICATION_QRY_GET_TOTAL_USER: 'authentication.qry.get.total.user',
  RK_AUTHENTICATION_QRY_VERIFY_TOKEN: 'authentication.qry.verify.token',

  RK_PROPERTY_CMD_BRAND_CREATE: 'property.cmd.brand.create',
  RK_PROPERTY_QRY_FIND_BRAND: 'property.qry.find.brand',
  RK_PROPERTY_QRY_FIND_DETAIL_BRAND: 'property.qry.find.detail.brand',
  RK_PROPERTY_QRY_FIND_BRAND_BYCODE: 'property.qry.find.brand.bycode',
  RK_PROPERTY_QRY_GET_TOTAL_BRAND: 'property.qry.get.total.brand',

  RK_PROPERTY_CMD_CATEGORY_CREATE: 'property.cmd.category.create',
  RK_PROPERTY_QRY_FIND_CATEGORY: 'property.qry.find.category',
  RK_PROPERTY_QRY_FIND_DETAIL_CATEGORY: 'property.qry.find.detail.category',
  RK_PROPERTY_QRY_FIND_CATEGORY_BYCODE: 'property.qry.find.category.bycode',
  RK_PROPERTY_QRY_GET_TOTAL_CATEGORY: 'property.qry.get.total.category',

  RK_PROPERTY_CMD_PRODUCT_CREATE: 'property.cmd.product.create',
  RK_PROPERTY_CMD_PRODUCT_DELETE: 'property.cmd.product.delete',
  RK_PROPERTY_QRY_FIND_PRODUCT_BYADMIN: 'property.qry.find.product.byadmin',
  RK_PROPERTY_QRY_FIND_PRODUCT: 'property.qry.find.product',
  RK_PROPERTY_QRY_FIND_PRODUCT_BYCODE: 'property.qry.find.product.bycode',
  RK_PROPERTY_QRY_FIND_PRODUCT_BYBRAND: 'property.qry.find.product.bybrand',
  RK_PROPERTY_QRY_FIND_PRODUCT_BYCATEGORY:
    'property.qry.find.product.bycategory',
  RK_PROPERTY_QRY_FIND_PRODUCT_BYIDS: 'property.qry.find.product.byids',
  RK_PROPERTY_QRY_FIND_PRODUCT_SIMILAR: 'property.qry.find.product.similar',
  RK_PROPERTY_QRY_GET_TOTAL_PRODUCT: 'property.qry.get.total.product',

  // -------------------------------------------------------------------
  RK_AUHTN_QRY_GET_SHOP_INFORMATION: 'authn.qry.get.shop.information',
  // -------------------------------------------------------------------
  RK_AUTHN_CMD_SHOP_PERMISSION: 'authn.cmd.shop.permission',
};
