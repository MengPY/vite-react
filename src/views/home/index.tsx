import React, { useState, useEffect } from 'react'
import './index.css'
import { Button, Table, message, Popconfirm, Modal, Form, Input, } from 'antd';

import {Link} from 'react-router-dom';

import { server } from './../../config/const';


import request from './../../api/request';

function Home(props: any) {
  const [count, setCount] = useState(0)

  const [rowKey, setRowKey] = useState('')
  
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
    setRowKey('');
    setIsModalVisible(true);
  }

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    let params = {
      ...values,
    }
    if (rowKey) {
      params.id = rowKey;
      let data = await request(`${server}/user/update`, 'post', params);
      let res = data || {};
      if (res.success) {
        message.success('更新成功');
        setIsModalVisible(false);
        getDataList();
      } else {
        message.error(res.data);
      }
    } else {
      let data = await request(`${server}/user/insert`, 'post', params);
      let res = data || {};
      if (res.success) {
        message.success('新增成功');
        setIsModalVisible(false);
        getDataList();
      } else {
        message.error(res.data);
      }
    }
    

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

  const handleDelete = async (row: any) => {
    console.log(row)
    let data = await request(`${server}/user/deleteByMap`, 'post', { name: row.name });
    let res = data || {};
    if (res > 0) {
      message.success('删除成功');
      getDataList();
    } else {
      message.error(res.data);
    }
  }

  const edit = async (row: any) => {
    console.log(row)
    setRowKey(row.id);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...row
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
      title: '创建时间',
      dataIndex: 'createTime',
      render: (_: any, record: any) =>
      record.createTime ?
      new Date(record.createTime).toLocaleDateString()+ ' '+ new Date(record.createTime).toLocaleTimeString()
      : null,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: (_: any, record: any) =>
      record.createTime ?
      new Date(record.updateTime).toLocaleDateString()+ ' '+ new Date(record.updateTime).toLocaleTimeString()
      : null,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: { key: React.Key }) =>
        dataList.length >= 1 ? (
          <>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
              <a>Delete</a>
            </Popconfirm>
            <a onClick={ () => edit(record) } style={{ marginLeft: '10px' }}>Edit</a>
          </>
        ) : null,
    },
  ];
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagination(pagination);
  };

  const getDataList = async () => {
    let params = {
      ...pagination,
      pageNum: pagination.current,
    }
    setTbLoading(true);
    let data = await request(`${server}/user/getUserPage`, 'get', params);
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
  }

  useEffect(() => {
    // let asyncTest = async () => {
    //   let { data } = await request(`${server}/user/getUserPage`, 'get', pagination);
    //   console.log(data)
    // }
    // asyncTest();

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
