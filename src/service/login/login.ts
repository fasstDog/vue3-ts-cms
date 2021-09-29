import ftRequset from "../index";
import { IAccount,ILoginResult } from "./types";
import {IDataType} from '../types'

enum loginAPI {
  // 登录接口
  AccountLogin='/login',
  // 请求用户信息接口
  LoginUserInfo='/users/',//user/id
  // 请求用户菜单接口
  UserMenus = '/role/'  //用法role/id/menu
}

export function accountLoginRequest(account:IAccount){
  return ftRequset.post<IDataType<ILoginResult>>({
    url:loginAPI.AccountLogin,
    data:account,
    showLoadding:false
  })
}


export function requestUserInfoById(id:number){
  return ftRequset.get<IDataType>({
    url:loginAPI.LoginUserInfo + id,
    showLoadding:false
  })
}

export function requestUserMenusBuRoleId(id:number){
  return ftRequset.get<IDataType>({
    url:loginAPI.UserMenus + id + '/menu'
  })
}
