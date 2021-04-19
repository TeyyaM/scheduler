import { useState } from 'react';

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    replace
      ? setHistory(prev => [...prev.slice(0, -1), newMode])
      : setHistory(prev => [...prev, newMode])
  };

  const back = function() {

    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, -1)])
    }
  };

  const mode = history.slice(-1)[0];
  return { mode, transition, back }
}