type IFormType = 'input'|'password'|'select'|'datepicker'

export interface IFromItem {
  field:string
  type:IFormType
  label:string
  rules?:any[]
  placeholder?:any
  options?:any[]
  otherOptions?:any
  isHidden?:boolean
}

export interface IFrom {
  fromItems:IFromItem[]
  labelWidth?:string
  collLayout?:any
  itemStyle?:any
  title?:string
}
