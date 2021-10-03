import ftRequset from "@/service";

enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}


export function getCategoryGoodsCount(){
  return ftRequset.get({
    url:DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale(){
  return ftRequset.get({
    url:DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryGoodsFavor(){
  return ftRequset.get({
    url:DashboardAPI.categoryGoodsFavor
  })
}
export function getAddressGoodsSale(){
  return ftRequset.get({
    url:DashboardAPI.addressGoodsSale
  })
}

