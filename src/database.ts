
type type = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql'



export interface columnItem {
  field: string,
  title: string,
  [property: string]: any
}
//数据库
export interface dbParams {
  id?: number | string,
  name?: string,
  type?: type,
  description?: string,
  account: string
}
//数据库表
export interface tbParams {
  name: string,
  dbId: number | string,
  id?: number | string,
}
//数据库字段
export interface dbField {
  id?: number | string,
  tbId: number | string,
  field: string,
  name: string,
  type: string,
  isForeignKey?: boolean,
  isMarjorKey?: boolean,
}


export const tableFieldColumnList: columnItem[] = [
  { field: 'field', title: '字段名' },
  { field: 'name', title: '字段释义' },
  { field: 'type', title: '类型' },
  { field: 'isMarjorKey', title: '是否为主键' },
  { field: 'isForeignKey', title: '是否为外键' },
]



export class Database {
  constructor(params: dbParams) {
    if (Object.hasOwn(params, 'name')) {
      this.name = params.name as string
    } else {
      this.name = "database" + new Date().getTime()
    }
    if (Object.hasOwn(params, 'type')) {
      this.type = params.type as type
    }
    if (Object.hasOwn(params, 'description')) {
      this.description = params.description as string
    }
    if (Object.hasOwn(params, 'account')) {
      this.account = params.account as string
    }
  }
  id: undefined | number = undefined
  name: string = ""
  type: type = 'mysql'
  description: string = ''
  account = ""
}
export class DatabaseTable {
  constructor(params: tbParams) {
    if (Object.hasOwn(params, 'name')) {
      this.name = params.name as string
    }
    this.dbId = params.dbId
    if (Object.hasOwn(params, 'id')) {
      this.id = params.id as number
    }
  }

  id: undefined | number = undefined
  name = "tableName" + new Date().getTime()
  dbId: number | string = ""
}
export class TableField {
  constructor(params: dbField) {
    if (Object.hasOwn(params, 'isForeignKey')) {
      this.isForeignKey = params.isForeignKey as boolean
    }
    if (Object.hasOwn(params, 'isMarjorKey')) {
      this.isMarjorKey = params.isMarjorKey as boolean
    }
    this.name = params.name
    this.tbId = params.tbId
    this.type = params.type
    this.field = params.field
  }
  id: undefined | number = undefined
  field: string = "field"
  tbId: number | string = ""
  name: string = "字段释义"
  type: string = ""
  isForeignKey: boolean = false
  isMarjorKey: boolean = false
}