import history from '../history';
import { MClient } from '../config/asteroid.config.js';
import { product } from '../reducers/product.redux';


export const EXCEPT_RECOMMAND_PRODUCTS = 'EXCEPT_RECOMMAND_PRODUCTS';
export const RECEIVE_RECOMMAND_PRODUCTS = 'RECEIVE_RECOMMAND_PRODUCTS';
export const RECEIVE_PRODUCT_BYID = 'RECEIVE_PRODUCT_BYID';
export const ADD_COUNT = "ADD_COUNT";
export const RECEIVE_SHOP_PRODUCTS_BYSHOPID = "RECEIVE_SHOP_PRODUCTS_BYSHOPID";
export const GET_RECOMMAND_PRODUCTS= "GET_RECOMMAND_PRODUCTS"

// export const RECOMMAND_PRODUCTS_LIST = "RECOMMAND_PRODUCTS_LIST"




function exceptRecommandProduct(){
  return {
    type: EXCEPT_RECOMMAND_PRODUCTS,
    text: '加载中',
  }
}

function receiveRecommandProduct(products){
  return {
    type: RECEIVE_RECOMMAND_PRODUCTS,
    products,
  }
}


export function loadRecommandProducts(page, pagesize){
  return dispatch => {
    dispatch(exceptRecommandProduct());
    const subId =  MClient.sub("home.top.products", [page, pagesize]);
    let products = [];
    MClient.on("ready", message => {
      if (message.subs.includes(subId)) {
          console.log("mySubscription ready");
      }
    });
    MClient.on("added", message => {
      console.log(message.collection);
    });
    MClient.on("added", message => {
      if (message.collection === 'products') {
        console.log('首页加载的东西',message);
        if (products.length < pagesize) {
          products.push({fields: message.fields, id: message.id});
          console.log(message);
          console.log(products)
          dispatch(receiveRecommandProduct(products));
        }
      }


    });
  }
}

function exceptProductById(id){

}

function getRecommandProducts(products){
  return {
    type: GET_RECOMMAND_PRODUCTS,
    products
  }
}


function receiveProductById(product){
  return {
    type: RECEIVE_PRODUCT_BYID,
    product,
  }

}
function receiveProductByIdError(error){

}

function receiveShopProductsByShopId(products) {
  return {
    type: RECEIVE_SHOP_PRODUCTS_BYSHOPID,
    products
  }
}


export function addCount(count) {
  return {
    type: ADD_COUNT,
    count: count
  }
}

export function loadProductById(id){
  return dispatch => {
    // dispatch(exceptProductById(id));
    MClient.sub("get.product.id", [id]);
    let product = [];
    MClient.connect();
    let methodId = MClient.method("get.oneproduct.id", [id]);

    MClient.on("result", message => {
      if(message.id === methodId && !message.error){
        console.log(`gogogo`)
        console.log(message.result)
        dispatch(receiveProductById(message.result));
      }else{
        // dispatch(receiveProductByIdError(message.error));
      }
    })
  }
}

export function loadProductList(){

}



export function createOrder(product) {
  return dispatch => {
    let methodId = MClient.method('app.orders.insert',[product]);
         
    MClient.on('result', message => {
      if(message.id === methodId && !message.error){
        console.log(`订单提交成功`)
        if(message.result){
          history.push(`/firmorder/${message.result}`)
        }else{
          console.log(message.error);
        }
      }
    })
  }
}


export function loadShopProductsByShopId(shopId,page,pagesize) {
  return dispatch => {
    console.log(`加载店铺商品`)
    console.log(shopId)
    MClient.sub('app.get.shop.products',[shopId,page,pagesize]);
    MClient.connect();
    let products = [];
      MClient.on("added", ({collection, id, fields}) => {
        if(collection==='products'){
          if(products.length< pagesize){
            products.push({fields,id})
          }
          console.log(`~~~~`)
          console.log(products)
          dispatch(receiveShopProductsByShopId(products));
        }
      });
  }
}


export function gainRecommandProducts(page,pagesize,data=[]) {
  return dispatch => {
    console.log(`获取推荐商品`)
    MClient.sub('app.get.recommend.products', [page,pagesize]);
    MClient.connect();
    let products = [];
    // data = data.slice();
    console.log(data);
    console.log(page);
    MClient.on("added", message => {
      console.log(message.fields)
      if(message.collection==='products'){
        if(products.length< pagesize){
          message.fields.id = message.id
          products.push(message.fields)
        }
        console.log(data.concat(products))
        dispatch(getRecommandProducts(data.concat(products)))
      }
    })
  }
}
