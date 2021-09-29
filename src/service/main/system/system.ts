import ftRequest from "../../index";
import {IDataType} from '../../types'

export function getPageListData(url:string,queryInfo:any){
  return ftRequest.post<IDataType>({
    url:url,
    data:queryInfo
  })
}


// 删除操作（url:/user/id）
export function deletePageData(url:string){
  return ftRequest.delete<IDataType>({
    url:url
  })
}
