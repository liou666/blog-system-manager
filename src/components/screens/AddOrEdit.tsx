import React, { useEffect, useState } from 'react';
import { Form, Input, Modal,message } from 'antd';
import MDEditor from '@uiw/react-md-editor';

import { editBlog, addBlog } from '~/api';

import type { Post } from '~/types';
export default function Add({
  setVisible,
  visible,
  record,
  setOptionFlag
}: {
    setVisible: Function;
    setOptionFlag: Function;
  visible: boolean;
  record?: Post | null;
}) {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [label, setLabel] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const requireFields = [title, content]

  useEffect(() => {
    if (record) {
      setContent(record.content);
      setTitle(record.title);
      setAuthor(record.author);
      setLabel(record.label);
      setSubTitle(record.subTitle);
    }
  }, []);

  const handleOk = () => {
    if (!requireFields.every(Boolean)) {
     return message.error('必填项不能为空');
    }
    const result = { title, content, author, label, sub_title:subTitle }
    setConfirmLoading(true);
    if (record) {
      // edit
      editBlog(`${record.id}`, {blogData:result}).then(res => {
        if (res.code === 0) {
          message.success('编辑成功');
          setConfirmLoading(false);
          setVisible(false);
          setOptionFlag(true);
        }
      })
    } else {
      // add
      addBlog(result).then(res => { 
        if (res.code === 0) {
          message.success('添加成功');
          setConfirmLoading(false);
          setVisible(false);
          setOptionFlag(true);
        }
      })
    }
  
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      title={record ? '编辑' : '新建'}
      visible={visible}
      width={600}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 20 }} layout="horizontal">
        <Form.Item initialValue={title} label="标题">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          <span style={{ color: 'red', position: 'absolute', left: '-60px', top: 0, fontSize: '20px' }}>*</span>
        </Form.Item>
        <Form.Item label="作者">
          <Input onChange={(e) => setAuthor(e.target.value)} value={author} />
        </Form.Item>
        <Form.Item label="子标题">
          <Input onChange={(e) => setSubTitle(e.target.value)} value={subTitle} />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: 'required' }]} label="标签">
          <Input value={label} onChange={(e)=>setLabel(e.target.value)} />{' '}
          {/* <span style={{ color: 'red', position: 'absolute', left: '-60px', top: 0, fontSize: '20px' }}>*</span> */}
        </Form.Item>
        <Form.Item label="内容">
          <MDEditor
            value={content}
            onChange={(value) => {
              setContent(value!);
            }}
          />
          <span style={{ color: 'red', position: 'absolute', left: '-60px', top: 0, fontSize: '20px' }}>*</span>
        </Form.Item>
      </Form>
    </Modal>
  );
}
