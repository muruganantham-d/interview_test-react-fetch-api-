import { useState } from 'react'
import './App.css'
import MuiTable from './user-data-fetch/MuiTable'
import NormalTable2 from './user-data-fetch2/NormalTable2'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       {/* <MuiTable/> */}

       <NormalTable2/>
    </>
  )
}

export default App
