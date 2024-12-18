import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import Icon from '@/components/Icon'
import { billListData } from '@/contains'

const New = () => {
  const navigate = useNavigate()
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => { navigate(-1) }}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames('selected')}
          >
            支出
          </Button>

          <Button
            shape="rounded"
            className={classNames('')}
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
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData['pay'].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div className="item" key={item.type}>
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
        <Button className="btn save">保存</Button>
      </div>
    </div>
  )
}

export default New
