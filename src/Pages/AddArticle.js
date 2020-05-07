import React, { useState, useEffect } from 'react'
import '../static/pages/AddArticle.css'
import marked from 'marked'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const AddArticle = (props) => {

  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate,setShowDate] = useState()   //发布日期
  const [updateDate,setUpdateDate] = useState() //修改日志的日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState(1) //选择的文章类别
  const [typeName, setTypeName] = useState('')

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  }); 

  const changeContent = (e) => {
    setArticleContent(e.target.value)
    const html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    const html = marked(e.target.value)
    setIntroducehtml(html)
  }

  useEffect(() => {
    requestTypeInfo()
    const tempId = props.match.params.id
    console.log(props.match.params);
    if (tempId) {
      setArticleId(tempId)
      getArticleById(tempId)
    }
  }, [])

  const requestTypeInfo = () => {
    console.log(servicePath.getTypeInfo);
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      header:{ 'Access-Control-Allow-Origin':'*' },
      data:{'openId': 'xxxx'},
      withCredentials: true
    }).then((res)=>{
      setTypeInfo(res.data.data)
    }).catch((error)=>{
      message.error('请求错误')
    })
  }

  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      header: {'Access-Control-Allow-Origin': '*'}
    }).then((res)=>{
      const article = res.data.data[0]
      console.log(article);
      setArticleTitle(article.title)
      setArticleContent(article.content)
      let html=marked(article.content)
      setMarkdownContent(html)
      setIntroducemd(article.introduce)
      let tmpInt = marked(article.introduce)
      setIntroducehtml(tmpInt)
      setShowDate(article.addTime)
      setSelectType(article.typeId)
      setTypeName(article.typeName)
    })
  }

  const selectTypeHandler = (value)=>{
    setSelectType(value)
  }

  const selectTimeHandler = (date, dateString) => {
    console.log(date);
    setShowDate(dateString)
  }

  const titleChanged = (e) => {
    setArticleTitle(e.target.value)
    console.log(e.target.value);
  }

  const saveArticle = ()=>{
    if(!selectedType){
        message.error('必须选择文章类别')
        return false
    }else if(!articleTitle){
        message.error('文章名称不能为空')
        return false
    }else if(!articleContent){
        message.error('文章内容不能为空')
        return false
    }else if(!introducemd){
        message.error('简介不能为空')
        return false
    }else if(!showDate){
        message.error('发布日期不能为空')
        return false
    }

    message.success('检验通过')

    let dataProps={}   //传递到接口的参数
    dataProps.type_id = selectedType 
    dataProps.title = articleTitle
    dataProps.article_content =articleContent
    dataProps.introduce =introducemd
    console.log(showDate);
    let datetext= showDate.replace('-','/') //把字符串转换成时间戳
    dataProps.addTime =(new Date(datetext).getTime())/1000
    dataProps.view_count =Math.ceil(Math.random()*100)+1000

    if (articleId==0) {
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then((res)=>{
        console.log(res.data);
        message.success('添加成功')
      }).catch(()=>{
        console.log('请求错误');
      })
    } else {
      dataProps.id = articleId
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        data: dataProps,
        withCredentials: true
      }).then((res)=>{
        console.log(res.data);
        message.success('修改成功')
      }).catch(()=>{
        console.log('请求错误');
      })
    }
}

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input value={articleTitle} placeholder='博客标题' size='large' onChange={titleChanged}/>
            </Col>
            <Col span={4}>
              <Select 
                placeholder='请选择类型' 
                size='large'
                value={typeName}
                onChange={selectTypeHandler}
                >
                {
                  typeInfo.map((item, index)=>{
                    return <Option value={item.id} key={item.id}>{item.typeName}</Option>
                  })
                }
              </Select>
            </Col>
          </Row>
          <br/>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea 
                className='markdown-content'
                rows={45}
                placeholder='文章内容'
                value={articleContent}
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
            <div 
              className='show-html'
              dangerouslySetInnerHTML={{__html: markdownContent}}>

            </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size='large'>暂存文章</Button>
              <Button type='primary' size='large' onClick={saveArticle}>发布文章</Button>
            </Col>
            <Col span={24}>
              <br/>
              <TextArea
                rows={4}
                placeholder='文章简介'
                value={introducemd}
                onChange={changeIntroduce}
              />
              <div 
                className='introduce-html'
                dangerouslySetInnerHTML={{__html: introducehtml}}
              >
              </div>
            </Col>
            <Col span={24}>
              <div className='date-select'>
                <DatePicker 
                  placeholder='发布日期' 
                  value={showDate ? moment(showDate, 'YYYY-MM-DD HH:mm:ss') : null } format='YYYY-MM-DD HH:mm:ss'
                  size='large'
                  onChange={selectTimeHandler}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle
