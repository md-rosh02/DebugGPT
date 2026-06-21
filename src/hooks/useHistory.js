import { useEffect, useState } from 'react';

const STORAGE_KEY = 'debuggpt:history';
const MAX_HISTORY = 8;

function loadHistory() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function useHistory() {
  const [history, setHistory] = useState(loadHistory);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addHistoryItem = (item) => {
    setHistory((current) => {
      const nextItem = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        ...item,
      };

      return [
        nextItem,
        ...current.filter((entry) => entry.errorText !== item.errorText),
      ].slice(0, MAX_HISTORY);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addHistoryItem, clearHistory };
}
