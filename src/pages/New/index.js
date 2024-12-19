import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import Icon from '@/components/Icon'
import { billListData } from '@/contains'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBillList } from '@/store/modules/billStore'

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
      date: new Date(),
      useFor,
    }
    console.log(data)
    dispatch(addBillList(data))
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
              <div className="text">{'今天'}</div>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
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
                      className="item"
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
