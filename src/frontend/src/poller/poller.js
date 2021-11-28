import { useEffect , useState } from 'react';

export const usePoll = (url, pollingInterval = 1000)  => {
    let [data, setData] = useState({})
    const fetchData =  async (url)  => {
      setData(await fetch(url)
        .then(response => response.json())
        .then(data => data));
    }

    useEffect(()=> {
        setTimeout(async () => {
          await fetchData(url)
        },pollingInterval)
    }, [fetchData])

  return {data}
}
