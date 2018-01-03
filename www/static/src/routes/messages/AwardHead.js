import React from 'react';
import { Flex } from 'antd-mobile';
import styles from './AwardHead.css';

class AwardHead extends React.Component {
  constructor() {
    super()
  }

  render(){
    return(
      <div className = {styles['Head-frame']}>
        <div style = {{display:'flex'}}>
          <img style = {{border:'1px solid #aaa',borderRadius:'15px',height:'30px',width:'30px'}}/>
          <span style = {{verticalAlign:'middle',lineHeight:'30px'}}>This is my name</span>
        </div>
        <br/>
        <br/>
        <Flex justify = "center">"已在万人车汇APP累计获得佣金"</Flex><br/>
        <Flex justify = "center" style = {{color:'#ffd308',fontSize:'30px'}}>￥3888</Flex><br/>
        <Flex justify = "center" style = {{color:'#ffd308',fontSize:'12px'}}>厉害了，你已超过100%的客户</Flex>

      </div>
    )
  }
}

export default AwardHead;