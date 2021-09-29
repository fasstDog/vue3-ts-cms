type IFormType = 'input'|'password'|'select'|'datepicker'

export interface IFromItem {
  field:string
  type:IFormType
  label:string
  rules?:any[]
  placeholder?:any
  options?:any[]
  //
  otherOptions?:any
}

export interface IFrom {
  fromItems:IFromItem[]
  labelWidth?:string
  collLayout?:any,
  itemLayout?:any
}
