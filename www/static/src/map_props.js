export function appInfo(state){
  return {
    AppInfo: state.AppInfo
   };
}


export function productinfo(state) {
  return {
    product: state.product
  }
}

export function modelInfo(state) {
  return {
    model: state.model,
    product: state.product
  }
}