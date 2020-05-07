const ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
  checkLogin: ipUrl + 'checkLogin',
  getTypeInfo: ipUrl + 'getTypeInfo',
  getArticleList: ipUrl + 'getArticleList',
  addArticle: ipUrl + 'addArticle',
  updateArticle: ipUrl + 'updateArticle',
  deleteArticle: ipUrl + 'deleteArticle/',
  getArticleById: ipUrl + 'getArticleById/',
}

export default servicePath;