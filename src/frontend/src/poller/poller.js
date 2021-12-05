import { useState } from 'react';
import {useInterval} from './useInterval';

export const usePoll = (url, pollingInterval )  => {
    let [data, setData] = useState({})
    const fetchData =  async (url)  => {
      setData(await fetch(url)
        .then(response => response.json())
        .then(data => data));
    }

  useInterval(async () => {
    await fetchData(url)
   }, pollingInterval);

  return {data}
}
