import login from '@/components/user/login'
import register from '@/components/user/register'
import loginsuccess from '@/components/user/loginsuccess'


export default [
    {
        path:"/user/login",
        component:login,
    },
    {
        path:"/user/loginsuccess",
        component:loginsuccess,
    },

]