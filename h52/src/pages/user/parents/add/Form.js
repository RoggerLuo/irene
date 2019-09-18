import React from 'react'
import { connect,Model } from 'dvax'
import { Checkbox,Form, Icon, Input, Row, Col, Button,Select,DatePicker } from 'antd'
import { Modal, message } from 'antd'
import columns from '../columns'
import Datechoose from 'components/datepicker/datechoose'
import Datechoose1 from 'components/datepicker/enterdatechoose'
import ControlledEditor from './Editor'
import {redirect} from 'components/history'
import moment from 'moment'

const FormItem = Form.Item
const Option = Select.Option;
function cancel(){
    redirect('/home/user/parents')
}

const FormComp = ({ form,submit,roles,...props}) => {
        //console.log(cities)
    // const { getFieldDecorator, validateFields, setFieldsValue, resetFields } = form
    const { getFieldDecorator, validateFields, setFieldsValue, resetFields,validateFieldsAndScroll } = form

    const onSubmit = () => {
         validateFieldsAndScroll((error,value)=>{ // 规则检查
            if(error==null){
            value = {...value}
            submit(value)
        }
        })
    }
    const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
    function onChange(date, dateString) {
        //this.setState({value:dataString.target.value})
      console.log(date, dateString);
    }


    return(
        <Form>
            <FormItem label={'姓名'} wrapperCol={{span:5}} labelCol={{ span: 3 }}>
                {
                    getFieldDecorator(
                        'name',
                        {initialValue:props['name']||'',rules:[{required:true,message:'必填',whitespace:true}]}
                    )(
                        <Input />
                    )
                }
            </FormItem>
             <FormItem label={'性别'} wrapperCol={{span:4}} labelCol={{ span: 3 }}>
                     {
                        getFieldDecorator(
                            'gender',
                            {initialValue:props['gender']||''}
                        )(  
                            <Select>

                                <Option value="MALE">男</Option>
                                <Option value="FEMALE">女</Option>
             
                            </Select>
      
                                                        
                        )
                    }
            </FormItem>

            <FormItem label={'账号'} wrapperCol={{span:3}} labelCol={{ span: 3 }}>
                     {
                        getFieldDecorator(
                            'username',
                            {initialValue:props['username']||''}
                        )(  
                            <Input />
                                                        
                        )
                    }
            </FormItem>        

             <FormItem label={'联系方式'} wrapperCol={{span:3}} labelCol={{ span: 3 }}>
                       {
                        getFieldDecorator(
                            'phone',
                            {initialValue:props['phone']||'',validateTrigger:'onBlur',rules:[{pattern:/^[1][3,4,5,7,8][0-9]{9}$/,required:true,message:'请输入正确的手机号！',whitespace:true}]}
                        )(
                    
                            <Input />
                        )
                    }             
            </FormItem>
            <FormItem label={'紧急联系人'} wrapperCol={{span:5}} labelCol={{ span: 3 }}>
                    {
                        getFieldDecorator(
                            'emergencyContact',
                            {initialValue:props['emergencyContact']||''}
                        )(
                             <Input  />
                        )
                    }
            </FormItem>
            <FormItem label={'联系人电话'} wrapperCol={{span:3}} labelCol={{ span: 3 }}>
                       {
                        getFieldDecorator(
                            'emergencyContactPhone',
                            {initialValue:props['emergencyContactPhone']||'',validateTrigger:'onBlur',rules:[{pattern:/^[1][3,4,5,7,8][0-9]{9}$/,required:true,message:'请输入正确的手机号！',whitespace:true}]}
                        )(
                    
                            <Input />
                        )
                    }             
            </FormItem>
            <FormItem label={'职务'} wrapperCol={{span:3}} labelCol={{ span: 2 }}>
                    {
                        getFieldDecorator(
                            'roleName',
                            {initialValue:props['roleName']||''}
                        )(
                            <Input />
                        )
                    }       
                                  
            </FormItem>
            <FormItem  style={{display:'none'}}>
                    <ControlledEditor/>
            </FormItem>      
            <FormItem>
                <Row>
                    <Col span={2} offset={1}>
                        <Button onClick={onSubmit} loading={false} type="primary" size="large" style={{width:'100px'}}> 保存 </Button>             
                    </Col>
                    <Col span={4} offset={2}>
                        <Button size="large" onClick={cancel} style={{width:'100px'}}>取消</Button>             
                    </Col>
                </Row>
            </FormItem>  
        </Form>
    )
}
const AntdComp =  Form.create()(FormComp)
const GeoComp = Model.connect('roleSelect')(AntdComp)
const GeoComps=Model.connect('userParents')(GeoComp)
export default GeoComps

            // {
            //             getFieldDecorator(
            //                 'roleId',
            //                 {initialValue:props['roleId']||''}
            //             )(
                       
            //                 <Select 
            //                     placeholder='请选择职位'
            //                     style={{ width: 150 }}
            //                     onDropdownVisibleChange={(open)=>Model.dispatch({type:'roleSelect/getRole'})}
            //                 >
            //                   {
            //                     roles.map((obj,index) =>{  
                                                               
            //                         return  <Option key={index} value={obj.roleId} //onClick={clickClean} 
            //                             >{obj.roleName}</Option>                               
                                 
            //                 })
            //                   }
            //                 </Select>
            //             )
            //         } 



           // <FormItem label={'生日'} wrapperCol={{span:5}} labelCol={{ span: 3 }}>
           //          {
           //              getFieldDecorator(
           //                  'birthday',
           //                  {initialValue:props['birthday']||moment()}
           //              )(
                    
           //                  <Datechoose />
           //              )
           //          }  

           //  </FormItem>
           //   <FormItem label={'入学年份'} wrapperCol={{span:3}} labelCol={{ span: 3 }}>
           //             {
           //              getFieldDecorator(
           //                  'enrollmentYear',
           //                  {initialValue:props['enrollmentYear']||moment()}
           //              )(
                    
           //                  <Datechoose1 />
           //              )
           //          }             
           //  </FormItem>