import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import {Link} from 'react-router-dom';

import { server } from './../../config/const';

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
  
  return (
    <Form
      style={{ width: '600px', margin: '100px auto' }}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login
