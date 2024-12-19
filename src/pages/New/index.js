import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import Icon from '@/components/Icon'
import { billListData } from '@/contains'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBillList } from '@/store/modules/billStore'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()

  // 1. 准备一个控制收入支出的状态
  const [billType, setBillType] = useState('pay') // pay-支出 income-收入

  //收集金额
  const [money, setMoney] = useState(0)

  const moneyChange = (value) => {
    // 使用正则表达式过滤输入，限制小数点后最多两位
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setMoney(value);
    }
  }
  // 收集账单类型
  const [useFor, setUseFor] = useState('')
  const dispatch = useDispatch()
  // 保存账单
  const saveBill = () => {
    // 收集表单数据
    const data = {
      type: billType,
      money: billType === 'pay' ? -money : +money,
      date,
      useFor,
    }
    console.log(data)
    dispatch(addBillList(data))
  }

  // 控制时间选择器打开和关闭
  const [dateVisible, setDateVisible] = useState(false)
  // 存储选择的时间
  const [date, setDate] = useState(() => new Date())
  // 确认选择时间
  const dateConfirm = (value) => {
    setDate(value)
    // 这里打印是上次date的值 是因为 React 的状态更新是异步的，因此在 dateConfirm 函数中，setDate(value) 之后立即打印 date 的值时，它仍然是更新前的值。
    // 在 React 中，setDate(value) 会触发组件重新渲染，但不会立即更新 date 的值，因此打印的 dayjs(date).format('YYYY-MM-DD') 显示的是旧的状态。
    // console.log(dayjs(date).format('YYYY-MM-DD'))
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => { navigate(-1) }}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' && 'selected')}
            onClick={() => setBillType('pay')}
          >
            支出
          </Button>

          <Button
            shape="rounded"
            className={classNames(billType === 'income' && 'selected')}
            onClick={() => setBillType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <div
                className="text"
                onClick={
                  () => setDateVisible(true)}>{dayjs(date).format('YYYY-MM-DD')
                }
              </div>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
                onClose={() => setDateVisible(false)}
              >
              </DatePicker>
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 数据区域 */}
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      // selected 类名表示选中
                      className={classNames('item', useFor === item.type && 'selected')}
                      key={item.type}
                      onClick={() => { setUseFor(item.type) }}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>保存</Button>
      </div>
    </div>
  )
}
export default New
