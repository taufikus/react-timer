import { useEffect, useState } from 'react';
import './TimerForm.css';

const TimerForm = ({ onSubmit }:any) => {
  const [title1, setTitle1] = useState('');
  const [endTime1, setEndTime1] = useState('');
  const [title2, setTitle2] = useState('');
  const [endTime2, setEndTime2] = useState('');
  const [elapsedTime2, setElapsedTime2] = useState('');
  const [isFormEmpty, setIsFormEmpty] = useState(true);

  useEffect(() => {
    const formValues = [title1, endTime1, title2, endTime2, elapsedTime2];
    setIsFormEmpty(formValues.every(value => value === ''));
  }, [title1, endTime1, title2, endTime2, elapsedTime2]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      timer1: { 
        title: title1, 
        endTime: endTime1 ? parseInt(endTime1) : 0 
      },
      timer2: { 
        title: title2, 
        endTime: endTime2 ? parseInt(endTime2) : 0, 
        elapsedTime: elapsedTime2 ? parseInt(elapsedTime2) : 0 
      }
    });

    setTitle1('');
    setEndTime1('');
    setTitle2('');
    setEndTime2('');
    setElapsedTime2('');
  };

  return (
    <form className="timer-form" onSubmit={handleSubmit}>
      <h3>Timer 1</h3>
      <input
        type="text"
        placeholder="Title"
        value={title1}
        onChange={(e) => setTitle1(e.target.value)}
      />
      <input
        type="number"
        placeholder="End Time (seconds)"
        value={endTime1}
        onChange={(e) => setEndTime1(e.target.value)}
      />
      <h3>Timer 2</h3>
      <input
        type="text"
        placeholder="Title"
        value={title2}
        onChange={(e) => setTitle2(e.target.value)}
      />
      <input
        type="number"
        placeholder="End Time (seconds)"
        value={endTime2}
        onChange={(e) => setEndTime2(e.target.value)}
      />
      <input
        type="number"
        placeholder="Elapsed Time (seconds)"
        value={elapsedTime2}
        onChange={(e) => setElapsedTime2(e.target.value)}
      />
      <button type="submit" disabled={isFormEmpty}>Update Timers</button>
    </form>
  );
};

export default TimerForm;