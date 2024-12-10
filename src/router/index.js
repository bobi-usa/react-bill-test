// 创建路由实例 绑定path element
import Layout from '@/pages/Layout'
import Month from '@/pages/Month'
import New from '@/pages/New'
import Year from '@/pages/Year'
import { createBrowserRouter } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Month />
      },
      {
        // 二级路由不能写 ‘/‘！
        path: 'year',
        element: <Year />
      },
    ]
  },
  {
    path: '/new',
    element: <New />
  }
])

export default router