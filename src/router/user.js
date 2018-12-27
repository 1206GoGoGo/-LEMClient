import login from '@/components/user/login'
import register from '@/components/user/register'



export default [
    {
        path:"/user/login",
        meta:{
            //loginUnRequired:true,
        },
        component:login,
    },
    {
        path:"/user/regist",
        meta:{
            //loginUnRequired:true,
        },
        component:register,
    },

]