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

export function createPageData(url:string,newData:any){
  return ftRequest.post<IDataType>({
    url:url,
    data:newData
  })
}

export function editPageData(url:string,editData:any){
  return ftRequest.patch<IDataType>({
    url:url,
    data:editData
  })
}
