import AC from './components/async_load'
export default [
    {
        name:'首页',
        icon:'home',
        path:'/',
        //动态加载component
        component:AC(()=>import('./views/home'))
    },
    {
        name:'详情页',
        icon:'detail',
        path:'/detail/:id',
        //动态加载component
        component:AC(()=>import('./views/movie'))
    },
    {
        name:'后台入口',
        icon:'admin',
        path:'/admin',
        //动态加载component
        component:AC(()=>import('./views/admin'))
    },
    {
        name:'后台列表页',
        icon:'admin',
        path:'/admin/list',
        //动态加载component
        component:AC(()=>import('./views/admin/list'))
    }

]