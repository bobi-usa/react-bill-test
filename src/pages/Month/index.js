import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState } from 'react'
import classNames from 'classnames'
// 使用 dayjs 格式化时间
import dayjs from 'dayjs'

const Month = () => {
  // 控制弹框的打开和关闭
  const [dateVisible, setDateVisible] = useState(false)

  // 控制时间显示(如果运算要返回函数进行return)
  const [currentDate, setCurrentDate] = useState(() => {
    // return new Date()
    // dayjs() 可以将 new Date() 传进去，不传也可以，默认也是当前时间
    return dayjs(new Date()).format('YYYY-MM')
  })

  const onConfirm = (value) => {
    // setCurrentDate(value)
    setCurrentDate(dayjs(value).format('YYYY-MM'))
  }
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backIcon={false}>月度收支</NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => { setDateVisible(true) }}>
            {/* 使用原生js格式化时间 */}
            {/* 
              注意：一个{}代表一个表达式，这里不能将年月写在一个{}，会发生错误，应该分开写
              {new Date(currentDate).getFullYear() | new Date(currentDate).getMonth() + 1}账单 ❌
            */}
            {/* <span className="text">
              {new Date(currentDate).getFullYear()} | {new Date(currentDate).getMonth() + 1}账单
            </span> */}

            {/* 使用 dayjs 格式化时间 */}
            <span className="text">
              {currentDate}月账单
            </span>
            {/* 思路：根据当前弹框打开的状态控制expand类名是否存在 */}
            <span className={classNames("arrow", dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <div className="money">{100}</div>
              <div className="type">支出</div>
            </div>
            <div className="item">
              <div className="money">{200}</div>
              <div className="type">收入</div>
            </div>
            <div className="item">
              <div className="money">{200}</div>
              <div className="type">结余</div>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="KaDate"
            title='记账日期'
            precision="month"
            visible={dateVisible}
            max={new Date()}
            onClose={() => { setDateVisible(false) }}
            onConfirm={onConfirm}
          />
        </div>
      </div>
    </div>
  )
}

export default Month
