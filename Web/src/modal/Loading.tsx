import './loader.css'
import { useSelector } from 'react-redux'

const Loading = () => {

const loading = useSelector((state: any) => state.fetchUser.loading);

  return (
  <>
  {loading && <div
         style={{
           backgroundColor: "rgba(0,0,0,0.5)",
           position: "fixed",
           top: 0,
           left: 0,
           zIndex: 1000,
           width: "100%",
           height: "100%",
        }}  
  >
<div className='loader' ></div>

  </div> }
  </>
  )
}

export default Loading
