module.exports = `
doctype html
html
    head
        meta(charset="utf-8")
        meta(name="viewport" content="width=device-width,initial-scale=1")
        title Koa Server Pug
        link(href="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/css/bootstrap-grid.css" rel="stylesheet")
        script(src="https://cdn.bootcss.com/jquery/3.2.0/core.js")
        script(src="https://cdn.bootcss.com/twitter-bootstrap/4.1.3/js/bootstrap.bundle.js")
    body
        div.container
            div.row
                div.col-md-8
                    h1 Hi #{you}
                    p This is #{me}
                div.col-md-4
                    p 测试动态pug模板引擎
`