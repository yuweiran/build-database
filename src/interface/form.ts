import { Database, dbField } from "../database"

export interface formConfigItem {
  eType: 'input' | 'date-picker' | 'select' | 'time-picker' | 'switch' | 'checkbox' | 'radio' | 'cascader' | 'tree-select',
  field: string,
  props?: { [property: string]: any },
  data?: any[],
  dic?: string,
  requestParams?: { [property: string]: any },
  'property-reflect'?: {//格式化成字典的映射
    id: string,
    label: string,
    value: string,
    children: string
  },
  appearWhen?: {
    [property: string]: any
  },
  requiredWhen?: {
    [property: string]: any
  },
  [property: string]: any
}

const Dic_TorF = [{ id: 1, value: 1, label: '是' }, { id: 0, value: 0, label: '否' }]
export class formConfig {
  selectedTableData: dbField[] = []
  initDBConfig: formConfigItem[] = [
    { eType: 'input', field: 'name', label: '数据库名称', props: { placeholder: "输入数据库名称" } },
    {
      eType: 'select', field: 'type', label: '数据库类型', dic: "/dic/database-types", props: { placeholder: "选择数据库类型" }
    },
    { eType: 'input', field: 'description', label: '描述', props: { placeholder: "输入描述", type: 'textarea', resize: 'none', rows: 4 } },
  ]
  initTableConfig: formConfigItem[] = [
    { eType: 'input', field: 'name', label: '表格名称', props: { placeholder: "输入表格名称" } },
  ]


}

const formatFieldArrToDic = function (array: any) {
  return array.reduce((prev: any, v: any) => {
    prev.push({ id: v, value: v, label: v })
    return prev
  }, [])
}

//#region 配置相关的函数
//field页面得到form表单配置数据
interface iFieldConfigForm {
  databaseId: string | number,
  tableId: string | number
}
export const getFieldFormConfig = function (prop: iFieldConfigForm): formConfigItem[] {
  return [
    { eType: 'input', field: 'field', label: '字段名称', props: { placeholder: "输入字段名称" } },
    { eType: 'input', field: 'name', label: '备注', props: { placeholder: "输入备注名" } },
    {
      eType: 'select', field: 'type', dic: "/dic/field-types", requestParams: {
        dbId: prop.databaseId
      }, label: '类型', props: { placeholder: "选择字段类型" }
    },
    { eType: 'radio', field: 'allowNull', label: '允许为空', data: Dic_TorF },
    { eType: 'radio', field: 'unique', label: '是否唯一', data: Dic_TorF },
    { eType: 'radio', field: 'isMarjorKey', label: '是否为主键', data: Dic_TorF },
    {
      eType: 'radio', field: 'isForeignKey', label: '是否为外键', data: Dic_TorF, appearWhen: {
        isMarjorKey: 0
      }
    },
    {
      eType: "cascader", field: 'targetKey', label: '外键关联的主键', dic: "/dic/table-fields", requestParams: {
        dbId: prop.databaseId,
        tbId: prop.tableId
      },
      props: {
        "show-all-levels": false,
      },
      appearWhen: {
        isForeignKey: 1
      }
    },
  ]
}

//#endregion