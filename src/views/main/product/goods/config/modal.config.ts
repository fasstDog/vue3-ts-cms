import { IFrom } from '@/base-ui/from'

export const modalConfig: IFrom = {
  fromItems: [
    { field: 'name', type: 'input', label: '商品名称', placeholder: '请输入商品名称' },
    { field: 'oldPrice', type: 'input', label: '原价', placeholder: '请输入原价' },
    { field: 'newPrice', type: 'input', label: '现价', placeholder: '请输入现价' },
    { field: 'imgUrl', type: 'input', label: '图片地址', placeholder: '请输入图片地址' },
  ],
  collLayout: { span: 24 },
  itemStyle: { padding: 0 }
}
