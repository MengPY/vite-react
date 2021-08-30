import React, { useState,useEffect } from 'react'
import { Form, Input, Button, Checkbox, message, Tree } from 'antd';
import {Link} from 'react-router-dom';

import { server } from './../../config/const';
import request from './../../api/request';

const Login = (props: any) => {
  const [count, setCount] = useState(0)
  const onFinish = (values: any) => {
    let params = {
      ...values
    }
    fetch(`${server}/user/login`,{
      method:'POST',
      body:JSON.stringify(params),
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      mode:'cors',
      cache:'default'
    })
    .then(res =>res.json())
    .then((data) => {
      let res = data || {};
      if (res.success) {
        props.history.push('/home')
        message.success('登录成功');
      } else {
        message.error(res.data);
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [treeData, setTreeData] = useState([]);
  
  useEffect(() => {
    let asyncTest = async () => {
      let data = await request(`${server}/cate/getCates`, 'get', {});
      console.log(data)
      setTreeData(data);
    }
    asyncTest();
  }, [])

  return (
    <Tree
      checkable
      defaultExpandedKeys={['0-0-0', '0-0-1']}
      defaultSelectedKeys={['0-0-0', '0-0-1']}
      defaultCheckedKeys={['0-0-0', '0-0-1']}
      treeData={treeData}
    />
  );
}

export default Login
