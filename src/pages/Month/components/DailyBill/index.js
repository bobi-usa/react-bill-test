import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react'
import { billTypeToName } from '@/contains/index'

const DailyBill = ({ date, billList }) => {
  const dayResult = useMemo(() => {
    const pay = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income,
    }
  }, [billList])

  // 控制展开收起
  const [visible, setVisible] = useState(false)
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          {/* expand 有这个类名 展开的箭头朝上的样子 */}
          <span className={classNames('arrow', visible && 'expand')} onClick={() => { setVisible(!visible) }}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <div className="type">支出</div>
            <div className="money">{dayResult.pay.toFixed(2)}</div>
          </div>
          <div className="income">
            <div className="type">收入</div>
            <div className="money">{dayResult.income.toFixed(2)}</div>
          </div>
          <div className="balance">
            <div className="money">{dayResult.total.toFixed(2)}</div>
            <div className="type">结余</div>
          </div>
        </div>
      </div>

      {/* 单日列表 */}
      <div className="billList" style={{ 'display': visible ? 'block' : 'none' }}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DailyBill
