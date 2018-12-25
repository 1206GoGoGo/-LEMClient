import login from '@/components/user/login'
import register from '@/components/user/register'


export default [
    {
        path:"/user/login",
        component:login,
    },
    {
        path:"/user/register",
        component:register,
    },

]