import React, { useState, useEffect } from 'react'
import { Button, Card, Input, Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'
import '../static/pages/login.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'

function Login(props) {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const checkLogin = () => {
    if (!userName) {
      message.error('用户名不能为空');
      return;
    }

    if (!password) {
      message.error('密码不能为空');
      return;
    }

    const params = {
      'userName': userName,
      'password': password
    }

    setIsLoading(true)
    console.log(params);
    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: params,
      withCredentials: true
    }).then((res)=>{
      setIsLoading(false)
      if (res.data.data === '登录成功') {
        localStorage.setItem('token', res.data.token)
        props.history.push('/index')
      } else {
        message.error('登录失败，用户名或者密码错误')
        console.log(res.data);
      }
    }).catch(()=>{
      setIsLoading(false)
    })
  }

  return (
    <div className='login-div'>
      <Spin tip='Loading' spinning={isLoading}>
        <Card title='Blog System' bordered={true} style={{width: '400px'}}>
          <Input 
            id='userName'
            size='large'
            placeholder='Enter your userName'
            prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
            onChange={(e)=>{setUserName(e.target.value)}}
          />
          <Input 
            id='userName'
            size='large'
            placeholder='Enter your password'
            prefix={<KeyOutlined style={{color: 'rgba(0,0,0,.25'}}/>}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <br/><br/>
          <Button type='primary' size='large' block onClick={checkLogin}>Login in</Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login
