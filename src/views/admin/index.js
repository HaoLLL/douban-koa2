import React, { Component } from 'react';
import {
    Form,
    Icon,
    Input,
    Button
} from 'antd';
import { request } from '../../lib';
import './index.sass';
const FormItem = Form.Item;
@Form.create()
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false
        }
    }
    _toggleLoading = (status = false) => {
        this.setState({
            loading: status
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log("发送表单")
        this.props.form.validateFields(async(err,values)=>{
            if(!err){
                request(this._toggleLoading)({
                    method:'post',
                    url:'/admin/login',
                    data:{
                        ...values
                    }
                }).then(res=>{
                    this.props.history.replace('/admin/list')
                })
            }
        })

    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className='login-form'>
                    <h3 style={{ testAlign: 'center' }}>预告片后台</h3>
                    <FormItem>
                        {
                            getFieldDecorator('email', {
                                rules: [{
                                    required: true,
                                    message: '请填入邮箱'
                                }]
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder='Email'></Input>
                                )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('password', {
                                rules: [{
                                    required: true,
                                    message: '请填入密码'
                                }]
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder='Password'></Input>
                                )
                        }
                    </FormItem>
                    <FormItem>
                        <Button style={{width:'100%'}} htmlType='submit' loading={this.state.loading}>Log in</Button>
                    </FormItem>
                </Form>

            </div>
        )
    }
}