import login from '@/components/user/login'
import register from '@/components/user/register'
import error from '@/components/user/error'

export default [
    {
        path:"/user/login",
        component:login,
    },
    {
        path:"/user/register",
        component:register,
    },
    {
        path:"/user/error",
        component:error,
    }

]