// Swagger
export const pathPrefixSwagger = {
  setup: 'api/docs',
};

// --------------------------------------------
// User
export const pathPrefixUser = {
  swagger: 'user',
  controller: 'user',
};

export const pathPrefixQueryUser = {
  findUsers: 'find',
  findUserById: 'detail',
  getTotalUser: 'get-total-user',
  verifyAccessToken: 'verify-access-token',
};

export const pathPrefixCommandUser = {
  createUser: 'create-user',
  login: 'login',
  updatePassword: 'change-password',
  logout: 'logout',
};

// --------------------------------------------
// Product
export const pathPrefixProduct = {
  swagger: 'product',
  controller: 'product',
};

export const pathPrefixQueryProduct = {
  findProductListByAdmin: 'admin/find',
  findProducts: 'find',
  findProductByCode: 'detail',
  findProductByBrand: 'find-by-brand',
  findProductByCategory: 'find-by-category',
  findProductByIds: 'find-by-ids',
  findProductSimilar: 'find-similar',
  getTotalProduct: 'get-total-product',
};

export const pathPrefixCommandProduct = {
  createProduct: 'create',
  deleteProduct: 'delete',
};

// --------------------------------------------
// Category
export const pathPrefixCategory = {
  swagger: 'category',
  controller: 'category',
};

export const pathPrefixQueryCategory = {
  findCategories: 'find',
  findCategoryById: 'detail',
  findCategoryByCode: 'find-by-code',
  getTotalCategory: 'get-total-category',
};

export const pathPrefixCommandCategory = {
  createCategory: 'create',
};

// --------------------------------------------
// Brand
export const pathPrefixBrand = {
  swagger: 'brand',
  controller: 'brand',
};

export const pathPrefixQueryBrand = {
  findBrands: 'find',
  findBrandById: 'detail',
  findBrandByCode: 'find-by-code',
  getTotalBrand: 'get-total-brand',
};

export const pathPrefixCommandBrand = {
  createBrand: 'create',
};
