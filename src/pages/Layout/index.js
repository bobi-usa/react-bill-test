import { Outlet } from "react-router-dom"
import { Button } from 'antd-mobile'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getBillList } from "@/store/modules/billStore"

const Layout = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBillList())
  }, [dispatch])
  return (
    <div>
      {/* 如果不显示二级路由内容，要么是没有写出口，要么是出口放的位置不对，应该放在对应的一级路由中 */}
      <Outlet />

      我是Layout
      {/* 测试全局生效样式 */}
      <Button color='primary'>测试全局</Button>
      <div className="purple">
        <Button color='primary'>测试局部</Button>
      </div>
    </div>
  )
}

export default Layout
