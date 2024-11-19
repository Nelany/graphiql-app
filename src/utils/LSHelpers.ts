'use client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LSGetItem(key: string) {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      const parseData = JSON.parse(data);
      return parseData;
    } catch (error) {
      if (typeof data === 'string') {
        return data;
      }
      toast.error(`Error parsing JSON from localStorage! ${(error as Error)?.message || ''}`);

      return null;
    }
  }
  return null;
}

export function LSSetItem(name: string, data: unknown) {
  if (typeof data === 'string') {
    localStorage.setItem(name, data);
  } else
    try {
      localStorage.setItem(name, JSON.stringify(data));
    } catch (error) {
      toast.error(`Error stringifying data:', ${(error as Error)?.message || ''}`);
    }
}
