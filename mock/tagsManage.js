export default {
  'POST /api/selectPage': (req, res) => {
    const { pageSize } = req.body;
    const list = [];
    for (let i = 0; i < pageSize; i++) {
      list[i] = {
        id: i + 1,
        type: '1',
        name: '微信用户580',
        number: '粉丝',
      };
    }
    setTimeout(() => {
      res.send({
        code: 1,
        message: '查询成功',
        data: {
          rows: list,
          total: 100,
        },
      });
    }, 2000);
  },
  'POST /api/selectById': (req, res) => {
    const { id } = req.body;
    if (id === 1) {
      setTimeout(() => {
        res.send({
          code: 1,
          message: '查询成功',
          data: {
            name: '用户身份',
            tags: ['管理员', '超级管理员'],
          },
        });
      }, 2000);
    }
  },
  'POST /api/add': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 1,
        message: '新增成功',
        data: {},
      });
    }, 2000);
  },
  'POST /api/edit': (req, res) => {
    setTimeout(() => {
      res.send({
        code: 1,
        message: '编辑成功',
        data: {},
      });
    }, 2000);
  },
};
