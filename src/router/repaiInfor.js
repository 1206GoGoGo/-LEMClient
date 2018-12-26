import repaiMoney from '@/components/repaiInfor/repaiMoney'
import scrapMoney from '@/components/repaiInfor/scrapMoney'

export default [
    {
        path:"/repaiInfor/repaiMoney",
        meta:{
            loginUnRequired:false,
        },
        component:repaiMoney,
    },
    {
        path:"/repaiInfor/scrapMoney",
        meta:{
            loginUnRequired:false,
        },
        component:scrapMoney,
    }

]