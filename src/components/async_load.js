import React, { Component } from 'react';
export default (loadComponent, placeholder = "正在加载中") => {
    return class AsyncComponent extends Component {
        unmount = false;
        constructor(props) {
            super(props);
            this.state = {
                Child: null
            }
        }

        //AC(()=>import('...')) 是一个promise 起一个别名
        async componentDidMount() {
            const {default:Child} = await loadComponent();
            if(this.unmount)return;
            this.setState({
                Child
            })
        }

        componentWillUnmount(){
            this.unmount = true;
        }

        render() {
            const { Child } = this.state;
            return (
                Child ? <Child {...this.props} /> : placeholder
            )
        }
    }
}