import React, { useState, useEffect } from 'react'
import { List, Row, Col, Button, Modal, message } from 'antd'
import '../static/pages/ArticleList.css'
import axios from 'axios';
import servicePath from '../config/apiUrl'

function ArticleList(props) {

  const [list, setList] = useState([])

  useEffect(() => {
    requestList()
  }, [])

  const requestList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true
    }).then(
      (res) => {
        setList(res.data.data)
      }
    ).catch(()=>{
      console.log('getArticleList request error')
    })
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: '确定要删除么',
      content: '如果你点击OK按钮文章将被永远删除',
      onOk(){
        axios({
          method: 'get',
          url: servicePath.deleteArticle + id,
          withCredentials: true
        }).then((res)=>{
          console.log(res.data);
        })
      },
      onCancel() {
        message.error('没有修改')
      }
    })
  }

  const updateArticle = (id) => {
    props.history.push('/index/add/' + id)
  }

  return (
    <div>
      <List
        header={
          <Row className='list-div'>
            <Col span={8}><b>标题</b></Col>
            <Col span={3}><b>类别</b></Col>
            <Col span={3}><b>发布时间</b></Col>
            <Col span={3}><b>集数</b></Col>
            <Col span={3}><b>浏览</b></Col>
            <Col span={4}><b>操作</b></Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item=>(
          <List.Item key={item.id}>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={3}>{item.typeName}</Col>
              <Col span={3}>{item.addTime}</Col>
              <Col span={3}>8</Col>
              <Col span={3}>{item.view_count}</Col>
              <Col span={4}>
                <Button type='primary' onClick={()=>{updateArticle(item.id)}}>修改</Button>
                &nbsp;
                <Button onClick={()=>{handleDelete(item.id)}}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ArticleList
