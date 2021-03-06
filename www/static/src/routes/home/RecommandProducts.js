import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Flex, WhiteSpace, WingBlank, Badge, Toast} from 'antd-mobile';
import style from './RecommandProducts.css';
import goodsImg from '../../assets/img/home/one.jpg';
import { loadRecommandProducts } from '../../actions/products';
class RecommandProducts extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){

  }

  renderItem(product, index){
    return (
      <Link to = {"product/"+product.id} key={index}>
        <div className = {style['test']}>
          <img src = {product.fields.cover} alt = {product.fields.name} className = {style['good-img']}/>
          <span className = {style['price-now']}>现价：￥{product.fields.endPrice/100}</span>
          <span　className = {style['reward']}>佣金：2％</span>
        </div>
      </Link>
    )
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps);
  }



  render(){
    let products = [];
    if (this.props.recommandProducts.products) {
      this.props.recommandProducts.products.map((product,index)=>{
        products.push(this.renderItem(product, index));
      });
    }else{
      products = 	''
    }
    return(
      <div  style = {{backgroundColor:'#fff',padding:'10px'}}>
      <div className = {style['recommend-frame']}>
        <span className = {style['recommend-font']}>火爆推荐</span>
        <Flex justify = "between">
          {products}
        </Flex>
      </div>
    </div>
    )
  }
}

function mapRecommandProducts(state){
  return {
    recommandProducts: state.recommandProducts
  }
}


export default connect(mapRecommandProducts)(RecommandProducts);
