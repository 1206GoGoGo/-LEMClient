import mainPanel from "@/components/index/index"


export default[
  
    {
        path:'/',
        component:mainPanel,
        redirect:'addDev/add',
        meta:{
            loginUnRequired:false,
        },
        children:[

        ]
    },
]