import { useState } from 'react';
import './App.css'
import Timer from './components/Timer'
import TimerForm
 from './components/TimerForm';
function App() {

  const [timer1, setTimer1] = useState({ title: "Running Timer", endTime: 60 });
  const [timer2, setTimer2] = useState({ title: "Quick Break", endTime: 30, elapsedTime: 7 });

  const handleFormSubmit = (data: any) => {
    const defaultTimer1 = { title: "Running Timer", endTime: 60 };
    const defaultTimer2 = { title: "Quick Break", endTime: 30, elapsedTime: 7 };
  
    const newTimer1 = {
      title: data.timer1.title || defaultTimer1.title,
      endTime: isNaN(parseInt(data.timer1.endTime)) ? defaultTimer1.endTime : Math.max(1, parseInt(data.timer1.endTime))
    };
  
    const parsedEndTime2 = isNaN(parseInt(data.timer2.endTime)) ? defaultTimer2.endTime : Math.max(1, parseInt(data.timer2.endTime));
    const parsedElapsedTime2 = isNaN(parseInt(data.timer2.elapsedTime)) ? defaultTimer2.elapsedTime : Math.max(0, parseInt(data.timer2.elapsedTime));
  
    const newTimer2 = {
      title: data.timer2.title || defaultTimer2.title,
      endTime: parsedEndTime2,
      elapsedTime: Math.min(parsedElapsedTime2, parsedEndTime2)  // Ensuring elapsed time doesn't exceed end time
    };

    setTimer1(newTimer1);
    setTimer2(newTimer2);
  };

  return (
    <>
    <div className="App">
      <h1>JetBrain's Timer Component</h1>
      <p>By : TAUFIK TAMBOLI</p>
      <div className="timer-container">
        <Timer title={timer1.title} endTime={timer1.endTime} />
        <Timer title={timer2.title} endTime={timer2.endTime} elapsedTime={timer2.elapsedTime} />
        <TimerForm onSubmit={handleFormSubmit} />
      </div>
    </div>
    </>
  )
}

export default App
