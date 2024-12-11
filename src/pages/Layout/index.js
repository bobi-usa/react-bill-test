import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getBillList } from "@/store/modules/billStore"
import './index.scss'
import {
  BillOutline,
  AddCircleOutline,
  CalculatorOutline,
} from 'antd-mobile-icons'
import { TabBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'

const tabs = [
  {
    key: '/',
    title: '月度账单',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: '记账',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: '年度账单',
    icon: <CalculatorOutline />,
  },
]

const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])
  const navigate = useNavigate()
  return (
    <div className="layout">
      {/* 如果不显示二级路由内容，要么是没有写出口，要么是出口放的位置不对，应该放在对应的一级路由中 */}
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar onChange={value => { navigate(value) }}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div >
  )
}

export default Layout
