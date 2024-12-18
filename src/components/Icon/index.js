const Icon = ({ type }) => {
  return (
    <img
      // https://yiy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/food.sv 
      src={`/ka/${type}.svg`}
      alt="icon"
      style={{
        width: 20,
        height: 20,
      }
      } />
  )
}

export default Icon
