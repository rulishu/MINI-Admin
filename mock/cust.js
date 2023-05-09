export default {
  'POST /api/cust/questionManage': (req, res) => {
    // const {} = req.body;
    res.send({
      code: 1,
      message: '查询成功',
      data: {
        rows: [
          {
            id: '190',
            createTime: '2022-12-26 18:13:55',
            updateTime: '2022-12-26 122:13:55',
            createName: 'sjc',
            updateName: 'admin',
            mes: '为什么？',
            answerContent: '因为啊',
            goods: '一个足球',
          },
          {
            id: '191',
            createTime: '2022-12-26 18:13:55',
            updateTime: '2022-12-26 122:13:55',
            createName: 'sjc',
            updateName: 'admin',
            mes: '为什么？',
            answerContent: '因为啊',
            goods: '一个足球',
          },
          {
            id: '192',
            createTime: '2022-12-26 18:13:55',
            updateTime: '2022-12-26 122:13:55',
            createName: 'sjc',
            updateName: 'admin',
            mes: '为什么？',
            answerContent: '因为啊',
            goods: '一个足球',
          },
        ],
      },
    });
    return;
  },
  'POST /api/cust/delete': (req, res) => {
    const { id } = req.body;
    if (id != 0) {
      res.send({
        code: 1,
        message: '删除成功',
      });
      return;
    }
    res.send({
      code: -1,
      message: '删除失败',
    });
  },
};
