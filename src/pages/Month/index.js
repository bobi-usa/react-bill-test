import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'

const Month = () => {
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backIcon={false}>月度收支</NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">2023 | 3月账单</span>
            <span className="arrow expand"></span>
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
            visible={false}
            max={new Date()}
          />
        </div>
      </div>
    </div>
  )
}

export default Month
