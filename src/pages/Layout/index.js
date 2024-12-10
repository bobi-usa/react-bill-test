import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      {/* 如果不显示二级路由内容，要么是没有写出口，要么是出口放的位置不对，应该放在对应的一级路由中 */}
      <Outlet />
      我是Layout
    </div>
  )
}

export default Layout
