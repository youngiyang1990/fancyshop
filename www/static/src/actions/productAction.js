import { MClient } from '../config/asteroid.config.js';


export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_FAILD= "GET_PRODUCT_FAILD";
export const ADD_PRODUCT_COUNT = "ADD_PRODUCT_COUNT";
export const GET_PRODUCTS_SUCCESS= "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAILD = "GET_PRODUCTS_FAILD";
export const CHANGE_SPEC = "CHANGE_SPEC";


function getProductSuccess(product,selected){
  return {
    type: GET_PRODUCT_SUCCESS,
    product,
    selected,
  }
}
export function changeSpce(index){
 return {
    type: CHANGE_SPEC,
    index,
 } 
}

export function addProductCount(num) {
  return {
    type: ADD_PRODUCT_COUNT,
    num,
  }
}

export function getProduct(id){
  return dispatch => {
    let methodId = MClient.method("get.oneproduct.id", [id]);
    MClient.on("result", message => {
      if(message.id === methodId && !message.error){
        let selected =   message.result.specifications.length === 0 ?[{spec_name: '默认规格',spec_value: message.result.endPrice,isThis: true}] :  message.result.specifications;
        selected[0]['isThis'] = true;
        dispatch(getProductSuccess(message.result,selected));
      }else{
        // dispatch(receiveProductByIdError(message.error));
      }
    })
  }
}