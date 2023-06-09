import { Outlet } from "react-router-dom"
import { NavMenu } from "./components/NavMenu"

function App() {
  return (
    <div className="flex flex-col h-screen bg-primary overflow-hidden">
      <NavMenu/>
      <Outlet/>
    </div>
  )
}

export default App
