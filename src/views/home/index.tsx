import React, { useState, useEffect } from 'react'
import './index.css'
import { Button, Table, message, Popconfirm, Modal, Form, Input, } from 'antd';

import {Link} from 'react-router-dom';

import { server } from './../../config/const';

function Home(props: any) {
  const [count, setCount] = useState(0)
  
  const [tbLoading, setTbLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [dataList, setDataList] = useState([])

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0
  })

  const [form] = Form.useForm();

  const toLogin = () => {
    props.history.push('/login')
  }
  
  const add = () => {
    setIsModalVisible(true);
  }

  const onFinish = (values: any) => {
    console.log('Success:', values);
    let params = {
      ...values
    }
    fetch(`${server}/user/insert`,{
      method:'post',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      body: JSON.stringify(params),
      mode:'cors',
      cache:'default'
    })
    .then(res =>res.json())
    .then((data) => {
      setTbLoading(false);
      let res = data || {};
      if (res.success) {
        message.success('新增成功');
        setIsModalVisible(false);
        getDataList();
      } else {
        message.error(res.data);
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleOk = () => {
    // form.setFieldsValue({
    //   name: 'Hello world!',
    //   age: 'male',
    //   email: '11@qq.com'
    // });
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleClick = () => {
    setCount(count + 1);
  }

  const handleDelete = (row: any) => {
    console.log(row)
    fetch(`${server}/user/deleteByMap`,{
      method:'post',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        name: row.name
      }),
      mode:'cors',
      cache:'default'
    })
    .then(res =>res.json())
    .then((data) => {
      setTbLoading(false);
      let res = data || {};
      if (res > 0) {
        message.success('删除成功');
        getDataList();
      } else {
        message.error(res.data);
      }
    });
  }
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: { key: React.Key }) =>
        dataList.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagination(pagination);
  };

  const getDataList = () => {
    let params = {
      ...pagination
    }
    setTbLoading(true);
    fetch(`${server}/user/getUserPage?pageNum=${pagination.current}&pageSize=${pagination.pageSize}`,{
      method:'get',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      mode:'cors',
      cache:'default'
    })
    .then(res =>res.json())
    .then((data) => {
      setTbLoading(false);
      let res = data || {};
      if (res.success) {
        let data = res.data.map((item: any) => {
          return {
            ...item,
            key: item.name
          }
        })

        if (!data.length && pagination.current > 1) {
          setPagination({
            ...pagination,
            current: pagination.current-1
          })
        } else {
          setPagination({
            ...pagination,
            total: res.total
          })
          setDataList(data);
        }
        
      } else {
        message.error(res.data);
      }
    });
  }

  useEffect(() => {
    getDataList();
  }, [pagination.current])


  
  
  return (
    <>
      <h3 onClick={handleClick}>{ count }</h3>
      <Link to="/about">关于</Link>
      <Button type="primary" onClick={ toLogin } style={{ marginRight: '10px' }}>Login</Button>
      <Button type="primary" onClick={ add }>新增</Button>
      <Table loading={tbLoading} pagination={pagination} dataSource={dataList} columns={columns} onChange={handleTableChange} />

      <Modal title="Add Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="age"
            name="age"
            rules={[{ required: true, message: 'Please input your age!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

        </Form>
      </Modal>
    </>
  )
}

export default Home
