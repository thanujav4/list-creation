import { useContext, useEffect, useState } from 'react'
import './App.css'
import TransferComponent from '../components/transfer-component'
import { data_context } from '../context/data_contest'
import axios from 'axios'

function App() {
  const { tables, setTables, selectedlist, setTargetIndex, setError, error } = useContext(data_context);
  console.log(tables);

  const fetchTables = async () => {
    await axios.get('https://apis.ccbp.in/list-creation/lists')
      .then(response => {
        const data = response.data?.lists;
        const tableMap = new Map();
        data?.forEach(list => {
          const { list_number, id, name, description } = list;
          if (tableMap.has(list_number)) {
            tableMap.get(list_number).push({ list_number, id, name, description });
          } else {
            tableMap.set(list_number, [{ list_number, id, name, description }]);
          }
        });
        setTables(Array.from(tableMap.values()));
      })
      .catch(err => {
        console.log(err);
      })
  }

  const addNewTable = () => {
    if (selectedlist.length === 2) {
      setError('')
      const index = Math.min(...selectedlist) + 1;
      const newList = [...tables];
      newList.splice(index, 0, []);
      setTables(newList);
      setTargetIndex(index);
    }else{
      setError("Select at least two tables !!")
    }
  }



  useEffect(() => {
    fetchTables();
  }, [])

  return (
    <div className='h-screen w-screen flex flex-col'>
      <div className='flex justify-center py-4 flex-col items-center'>
        <button className='bg-green-200 px-4 py-2 rounded-lg' onClick={() => addNewTable()}> Add table </button>
        <p className=' text-red-500'>{error}</p>
      </div>

      <div className='h-full py-10 px-10 flex gap-8'>
        {
          tables.map((data, index) => (
            <TransferComponent data={data} index={index} key={index} length={data.length} />
          ))
        }
      </div>

      <div className='flex justify-center py-4 flex-col items-center'>
        <button className='bg-red-400 text-white px-4 py-2 rounded-lg'> Save </button>
      </div>
    </div>
  )
}

export default App
