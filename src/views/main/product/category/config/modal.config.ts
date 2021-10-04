import { IFrom } from '@/base-ui/from'

export const modalConfig: IFrom = {
  fromItems: [
    { field: 'name', type: 'input', label: '类别名称', placeholder: '请输入类别名称' },
  ],
  collLayout: { span: 24 },
  itemStyle: { padding: 0 }
}
