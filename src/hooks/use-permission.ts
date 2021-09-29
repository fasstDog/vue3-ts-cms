import { useStore } from "@/store";
export function usePermission(pageName:string,hanldeName:string){
  const store = useStore()
  const permissions = store.state.login.permission
  const verifyPermission = `system:${pageName}:${hanldeName}`

  // !!转为布尔值
  return !!permissions.find((item)=> item === verifyPermission)
}
