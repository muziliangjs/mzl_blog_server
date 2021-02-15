const Router = require('koa-router')
var moment = require('moment');
const router = new Router({
  prefix: '/v1/article'
})
const {
  success,
  error
} = require('../../lib/lelper')
const {
  Auth
} = require('../../../middlewares/auth')
const {
  Article
} = require('../../models/articleModel.js')

// 获取列表/筛选
router.post('/', async (ctx) => {
  const {
    label_id = '',
      page = 1,
      limit = 10,
  } = ctx.request.body;
  const list = await Article.getArticleList(label_id, page, limit)
  success({
    data: {
      count: list.count,
      list: list.rows.map(item => item.dataValues)
    }
  })
})

// 修改
router.post('/modify', new Auth().verify, async (ctx) => {
  const {
    title,
    description,
    content,
    label,
    label_id,
    article_id,
  } = ctx.request.body;
  if (!label || !title || !description || !content || !label_id || !article_id) {
    error({
      msg: '检查数据'
    })
  }
  let articleTmp = {
    author_id: ctx.auth.uid,
    title,
    description,
    content,
    label,
    label_id,
  }
  const data = await Article.updateArticle(articleTmp, article_id)
  data[0] == 1 ?
    success({
      msg: '修改成功'
    }) : error({
      msg: '修改失败'
    })
})

// 删除
router.post('/del', new Auth().verify, async (ctx) => {
  const {
    id
  } = ctx.request.body;
  if (!id) {
    error({
      msg: 'id参数必填'
    })
  }
  const data = await Article.delLabel(id)
  data == 1 ? success() : error({
    msg: '删除失败'
  })
})

// 通过ID获取
router.post('/find', async (ctx) => {
  const {
    id
  } = ctx.request.body;
  if (!id) {
    error({
      msg: '参数错误'
    })
  }
  const data = await Article.getFindById(id)
  success({
    data
  })
})

// 创建
router.post('/create', new Auth().verify, async (ctx) => {
  const {
    title,
    description,
    content,
    label,
    label_id,
  } = ctx.request.body;
  if (!label || !title || !description || !content || !label_id) {
    error({
      msg: '检查数据'
    })
  }
  let articleTmp = {
    author_id: ctx.auth.uid,
    title,
    description,
    content,
    label,
    label_id,
    create_time: moment().format("YYYY-MM-DD"),
  }
  const data = await Article.createArticle(articleTmp)
  success({
    msg: '创建成功'
  })
})

module.exports = router;