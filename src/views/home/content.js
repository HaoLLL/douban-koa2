import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import {
    Card,
    Row,
    Col,
    Badge,
    Icon,
} from 'antd';
import { Link } from 'react-router-dom';
const Meta = Card.Meta;
const site = 'http://pkncgei2c.bkt.clouddn.com/';
export default class Content extends Component {
    _renderContent = () => {
        const { movies } = this.props;
        console.log("content中");
        console.log(movies);
        return (
            <div style={{ padding: '30px' }}>
                <Row>
                    {
                        movies.map((it, i) => (
                            <Col key={i} xl={{ span: 6 }} lg={{ span: 8 }} md={{ span: 12 }} sm={{ span: 24 }} style={{ marginBottom: '8px' }}>
                                <Card bordered={false}
                                    hoverable
                                    style={{ width: '100%' }}
                                    actions={[
                                        <Badge>
                                            <Icon style={{ marginRight: '2px' }} type="clock-circle" />
                                            {moment(it.meta.createdAt).fromNow(true)}前更新
                          </Badge>,
                                        <Badge>
                                            <Icon style={{ marginRight: '2px' }} type="star" />
                                            {it.rate} 分
                          </Badge>
                                    ]}
                                    cover={<img onClick={() => this._showModal(it)} alt="example" src={site + it.posterKey + '?imageMogr2/thumbnail/x1680/crop/1080x1600'} />}>
                                    <Meta
                                        style={{ height: '202px', overflow: 'hidden' }}
                                        title={<Link to={`/detail/${it._id}`}>{it.title}</Link>}
                                        onClick={this._jumeToDetail}
                                        description={<Link to={`/detail/${it._id}`}>{it.summary}</Link>} />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                {/* <Modal
                    className='videoModal'
                    footer={null}
                    afterClose={this._handleClose}
                    visible={this.state.visible}
                    onCancel={this._handleCancel}
                >
                    <Spin size="large" />
                </Modal> */}
            </div>
        )
    }
    render() {
        console.log("RENDE");
        return (
            <div style={{ padding: 10 }}>
                {this._renderContent()}
            </div>
        )
    }
}