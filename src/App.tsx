import { NavMenu } from "./components/NavMenu"
// import { Home } from "./pages/Home"
import { Plants } from "./pages/Plants"

function App() {
  return (
    <div className="flex flex-col h-screen bg-primary">
      <NavMenu/>
      <Plants/>
    </div>
  )
}

export default App
