import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'

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
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <div className="type">支出</div>
            <div className="money">{dayResult.pay}</div>
          </div>
          <div className="income">
            <div className="type">收入</div>
            <div className="money">{dayResult.income}</div>
          </div>
          <div className="balance">
            <div className="money">{dayResult.total}</div>
            <div className="type">结余</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyBill
