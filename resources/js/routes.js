import Home from './components/views/Home';

export default {
    mode: 'history',

    linkActiveClass: 'font-bold',

    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackchunkName: "Form Generator" */ './components/views/Additional')
        },
        {
            path: '/form-generator',
            name: 'form-generator',
            component: Home 
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import(/* webpackchunkName: "Dashboard" */ './components/views/Dashboard'),
            meta: { requiresAuth: true }
        },
        {
            path: '/company/:id',
            name: 'company',
            component: () => import(/* webpackchunkName: "Dashboard" */ './components/views/Company')
        },
        {
            path: '/download-contracts',
            name: 'download-page',
            component: () => import(/* webpackchunkName: "Dashboard" */ './components/views/DownloadPage')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackchunkName: "Login" */ './components/views/Login')
        }
    ]
}