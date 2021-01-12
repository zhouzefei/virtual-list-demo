import { useState, useRef, useEffect } from "react";
import "./App.css"

const itemH = 30;
const totalData = []
for (let i = 0;i< 1000; i++ ){
  totalData.push({
    key: i.toString(),
    val: 'Item' + i,
  })
};

export default () => {
  const [data,setData] = useState([]);
  const [transform,setTransform] = useState('');
  const scrollWrap = useRef()

  useEffect(()=>{
    updateViewContent();
  },[]);

  // 更新
  const updateViewContent = (scrollTop = 0) => {
    const viewCount = Math.ceil(scrollWrap.current.clientHeight/itemH); // 可视区域总的展示个数 进1位
    const start = Math.floor(scrollTop/itemH); // 舍去小数点
    // star 四舍五入
    const roundVal = Math.round(scrollTop/itemH) - start; // 查看差异值
    const end = start + viewCount + roundVal;
    const viewData = totalData.slice(start,end);
    setData(viewData);
    setTransform(`translate3d(0, ${ start * itemH }px, 0)`)
  };

  // 滚动
  const handleScroll = (e) => {
    updateViewContent(e.target.scrollTop)
  };

  return (
    <div className="virtual-list" onScroll={handleScroll} ref={scrollWrap}>
        <div className="virtual-list-height" style={{"height": (totalData.length * itemH) + 'px'}}></div>
        <div className="view-content" style={{transform:transform}}>
          {
            data.map(item=>{
              return (
                <div className="view-item" key={item.key}>{item.val}</div>
              )
            })
          }
        </div>
    </div>
  )
}