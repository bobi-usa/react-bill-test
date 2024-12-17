import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
// 使用 dayjs 格式化时间
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const Month = () => {
  // 控制弹框的打开和关闭
  const [dateVisible, setDateVisible] = useState(false)

  // 控制时间显示(如果运算要返回函数进行return)
  const [currentDate, setCurrentDate] = useState(() => {
    // return new Date()
    // dayjs() 可以将 new Date() 传进去，不传也可以，默认也是当前时间
    return dayjs(new Date()).format('YYYY-MM')
  })

  // -------------------- 按月做数据的分组 start ---------------------------
  const billList = useSelector(state => state.bill.billList)
  /**
   * useMemo hook
   * 作用：类似Vue中的计算属性computed,可以用来做数据的二次处理，并且有缓存的作用，只有当
   *      数据发生变化的时候才会重新计算
   * 依赖项：所依赖的原始数据
   */
  const monthGroup = useMemo(() => {
    // return出去计算之后的值
    // return _.groupBy(billList, (item) => {
    //   return dayjs(item.date).format('YYYY-MM');
    // })

    /**
     * reduce 实现
     * 说明：
     * 1. 月份从0开始，所以+1
     * 2. String.prototype.padStart 用于在月份前补0，第一个参数是位数，第二个是若没达
     *    到位数的话拿什么补齐
     * 3. 按月份分组后的结果是一个以 YYYY-MM 为键的对象，每个键对应一个数组，包含属于该
     *    月份的所有数据项。
     */
    return billList.reduce((obj, item) => {
      const date = new Date(item.date)
      const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
      if (!obj[yearMonth]) obj[yearMonth] = []
      obj[yearMonth].push(item)
      return obj
    }, {})

    // 原始数据当作依赖项放进来
  }, [billList])
  // -------------------- 按月做数据的分组 end ---------------------------

  // -------------------- 月份数据统计 start ----------------------------
  // 当前时间月份下的数据集合
  const [currentMonthList, setMonthList] = useState([])

  // 时间选择确认回调
  const onConfirm = (value) => {
    // setCurrentDate(value)
    setCurrentDate(dayjs(value).format('YYYY-MM'))
    // 将对应月份的账单集合以数据的形式存放在数据里
    setMonthList(monthGroup[dayjs(value).format('YYYY-MM')])
  }

  // 初始化的时候把当前月的统计数据显示出来
  useEffect(() => {
    setMonthList(monthGroup[currentDate])
  }, [monthGroup])

  // 计算月份统计数据：老师的方法
  const monthResult = useMemo(() => {
    console.log('currentMonthList', currentMonthList)
    // 在 onConfirm 中 setMonthList 对应的月份数据没有, 赋值为undefined,故这里增加判断
    if (!currentMonthList || !currentMonthList.length) return {
      income: 0,
      pay: 0,
      total: 0,
    }
    const income = currentMonthList
      .filter(item => item.type === 'income')
      .reduce((a, c) => a + c.money, 0)
    const pay = currentMonthList
      .filter(item => item.type === 'pay')
      .reduce((a, c) => a + c.money, 0)
    return {
      income,
      pay,
      total: income + pay,
    }
  }, [currentMonthList])

  // 计算月份统计数据：我的方法
  // const monthResult = useMemo(() => {
  //   let totalObj = {
  //     pay: 0,
  //     income: 0,
  //     total: 0,
  //   }
  //   if (!currentMonthList || !currentMonthList.length) return totalObj
  //   return currentMonthList.reduce((totalObj, item) => {
  //     // type: income 收入
  //     // type: pay 支出
  //     // 总和为结余
  //     if (item.type === 'income') totalObj.income += item.money
  //     if (item.type === 'pay') totalObj.pay += item.money

  //     // 总和
  //     totalObj.total += item.money
  //     console.log('totalObj', totalObj)
  //     return totalObj
  //   }, totalObj)
  // }, [currentMonthList])
  // -------------------- 月份数据统计 end ----------------------------

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
              <div className="money">{monthResult.pay.toFixed(2)}</div>
              <div className="type">支出</div>
            </div>
            <div className="item">
              <div className="money">{monthResult.income.toFixed(2)}</div>
              <div className="type">收入</div>
            </div>
            <div className="item">
              <div className="money">{monthResult.total.toFixed(2)}</div>
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
