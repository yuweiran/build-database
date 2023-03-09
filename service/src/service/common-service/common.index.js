
const { Table, Database, Fields } = require('../../model/index');
const { Op } = require("sequelize");

const { formatToNormalArray } = require('./common.func')
const { getAllField } = require('../model-service/Fields.service')

class CrossTablesService {
  //获取数据库表格以及所有表格下字段·树结构
  getTablesAndFields = async (dbId, tableId) => {
    let tables = await Table.findAll({
      where: {
        db_id: dbId,
        [Op.not]: {
          id: tableId
        }
      }
    })
    tables = await formatToNormalArray(tables)
    for (let i = 0; i < tables.length; i++) {
      let tb = tables[i]
      let fileds = await getAllField(tb.id)
      if (fileds.length > 0)
        tb.children = fileds
    }
    return tables
  }
}


module.exports = new CrossTablesService()