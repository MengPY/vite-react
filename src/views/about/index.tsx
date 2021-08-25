import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { Table, Tag, Space } from 'antd';

function About() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  const [pageInfo, setPageInfo] = useState({
    total: 0,
    simple: false,
    showSizeChanger: true,
    showQuickJumper: true,
    onChange: (page: number, pageSize: number) => {
      console.log(page)
    }
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a onClick={() => { delItem(record.id) }}>Delete</a>
        </Space>
      ),
    },
  ];
  
  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //     tags: ['loser'],
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];

  const getData = async (pageInfo: any) => {
    const params = {
      pageNum: 1,
      pageSize: 10,
      ...pageInfo
    }
    const response = await fetch(`http://localhost:8081/user/getUserPage?pageNum=${params.pageNum}&pageSize=${params.pageSize}`);
    const json = await response.json();
    setPageInfo({
      ...pageInfo,
      total: json.total,
      onChange: (pageNum: number, pageSize: number) => {
        getData({
          pageNum,
          pageSize
        })
      }
    })
    let data = (json.data || []).map((item: any, index: number) => {
      return {
        ...item,
        key: index,
        tags: []
      }
    });
    setData(data);
  }

  const delItem = async (id: string) => {
    const params = {
      id
    }
    const response = await fetch(`http://localhost:8081/user/deleteById`, { method: 'post', headers:{ 'Content-Type': 'application/json' }, body: JSON.stringify(params) });
    const json = await response.json();
    console.log(json)
    if (!json.error && json.success) {
      getData(pageInfo)
    }
  }

  useEffect(() => {
    (async function asyncFn () {
      await getData({});
    })();
  }, []);

  return (
    <>
      <Table pagination={pageInfo} columns={columns} dataSource={data} />
    </>
  )
}

export default About
