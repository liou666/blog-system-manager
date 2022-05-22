import React, { useState, useEffect } from 'react';
import { Table, Space, message, Popconfirm, Input, Button } from 'antd';
import type { PageInfo, Post } from '~/types';

import { getBlogList, deleteBlog } from '~/api';
import AddOrEdit from './AddOrEdit';

export default function List() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = React.useState(false);
  const [listRecord, setListRecord] = React.useState<Post | null>(null);

  const [count, setCount] = React.useState(0);
  const [optionFlag, setOptionFlag] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const getList = () => {
    const payload = searchTitle ? { ...pageInfo, title: searchTitle } : pageInfo;
    getBlogList(payload).then((res) => {
      setData(res.data.data);
      setTotal(res.data.total);
    });
  };
  const confirmDelete = (id: string) => {
    deleteBlog(id)
      .then((res) => {
        if (res.code === 0) {
          message.info(res.msg);
          getList();
        }
      })
      .catch((err) => {
        message.info(err);
      });
  };
  const goEdit = (record: Post) => {
    setCount(count + 1);
    setListRecord(record);
    showModal();
  };
  const goAdd = () => {
    setCount(count + 1);
    setListRecord(null);
    showModal();
  };
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '创作时间',
      dataIndex: 'create_time',
    },
    {
      title: '操作',
      key: 'action',
      render: (record: Post) => {
        return (
          <Space size="middle">
            <a onClick={() => goEdit(record)}>编辑</a>
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={() => confirmDelete(`${record.id}`)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    pageNum: 1,
    pageSize: 5,
  });

  useEffect(() => {
    getList();
  }, [pageInfo]);
  useEffect(() => {
    if (optionFlag) {
      getList();
      setOptionFlag(false);
    }
  }, [optionFlag]);

  const onSelectChange = (selectedRowKeys: any[]) => {
    console.log(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div>
      <div style={{ marginBottom: '8px' }}>
        <Input
          placeholder="请输入标题"
          onChange={(e) => setSearchTitle(e.target.value)}
          style={{ width: '200px' }}
          value={searchTitle}
        />
        <Button style={{ margin: '0 8px' }} onClick={() => getList()} type="primary">
          搜索
        </Button>
        <Button onClick={() => goAdd()} type="primary">
          新建文章
        </Button>
      </div>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 5,
          total,
          onChange: (pageNum: number, pageSize: number) => {
            setPageInfo({ pageNum, pageSize });
          },
        }}
      />
      <AddOrEdit
        setVisible={setVisible}
        visible={visible}
        setOptionFlag={setOptionFlag}
        key={count}
        record={listRecord}
      />
    </div>
  );
}
