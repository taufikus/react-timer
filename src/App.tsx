import './App.css'
import Timer from './components/Timer'

function App() {

  return (
    <>
    <div className="App">
      <h1>JetBrain's Timer Component</h1>
      <p>By : TAUFIK TAMBOLI</p>
      <div className="timer-container">
        <Timer title="Running Timer" endTime={20} />
        <Timer title="Quick Break" endTime={30} elapsedTime={7} />
      </div>
    </div>
    </>
  )
}

export default App
