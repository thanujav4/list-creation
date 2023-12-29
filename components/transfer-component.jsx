import React, { useContext, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { data_context } from '../context/data_contest';

const TransferComponent = ({ data, index, length = 0 }) => {
    const { selectedlist, setSelectedlist, targetIndex, tables, setTables } = useContext(data_context);
    const [tableLength, setTableLenght] = useState(length);
    const [tableData, setTableData] = useState(data);
    const targetComponent = index === targetIndex;
    const leftComponent = index === targetIndex - 1;
    const righComponent = index === targetIndex + 1;

    useEffect(() => {
        setTableData(data);
        setTableLenght(data.length);
        console.log("Use effect runs");
    }, [data])


    const transfer_to_target_list = (i) => {
        // copy current table
        const table = Array.from(tableData);

        //copy main table
        const newTable = Array.from(tables);

        const transferData = table.splice(i, 1)[0];
        newTable[targetIndex].push(transferData);
        setTableData(table);
        setTables(newTable);
        setTableLenght(tableData.length);
    }

    const transfer_to_left_list = (i) => {
        console.log('transfer_to_left_list');
        // copy current table
        const table = [...tableData];

        //copy main table
        const newTable = [...tables];

        // const transferData = table[i];
        const transferData = table.splice(i, 1)[0];
        console.log("Transfer data " + JSON.stringify(transferData));
        newTable[targetIndex - 1].push(transferData);
        setTableData(table);
        setTableLenght(tableData.length);
        setTables(newTable);
    }

    const transfer_to_right_list = (i) => {
        // copy current table
        const table = [...tableData];

        //copy main table
        const newTable = [...tables];

        const transferData = table.splice(i, 1)[0];
        newTable[targetIndex + 1].push(transferData);
        console.log(newTable[targetIndex + 1]);
        setTableData(table);
        setTableLenght(tableData.length);
        setTables(newTable);
    }


    const handleTableSelection = (e) => {
        if (e.target.checked) {
            setSelectedlist([...selectedlist, index]);
        } else {
            const list = [...selectedlist]
            list.splice(list.indexOf(index), 1);
            setSelectedlist(list);
        }
    }


    return (
        <div className=' w-60 overflow-auto border bg-slate-300 px-4 py-4 rounded-lg'>
            <div className='flex gap-2 mb-4'>
                <input type='checkbox' onChange={handleTableSelection} id={`checkbox1${index}`} name='checkbox' />
                <label htmlFor={`checkbox1${index}`}>List {index + 1} </label>
                <p>{tableLength}</p>
            </div>
            {
                tableData?.map((items, i) => (
                    <div className='bg-white mb-2 p-4 rounded-lg' key={items.id}>
                        <div>
                            <h1> {items?.name} </h1>
                            <h1>{items?.description}</h1>
                        </div>

                        {
                            targetComponent && (
                                <div className='flex justify-between'>
                                    <FaChevronLeft className='cursor-pointer text-red-400' onClick={() => transfer_to_left_list(i)} />
                                    <FaChevronRight className=' cursor-pointer' onClick={() => transfer_to_right_list(i)} />
                                </div>
                            )
                        }
                        {
                            leftComponent && (
                                <div className='flex justify-end'>
                                    <FaChevronRight className=' cursor-pointer' onClick={() => transfer_to_target_list(i)} />
                                </div>
                            )
                        }

                        {
                            righComponent && (
                                <div className='flex justify-start'>
                                    <FaChevronLeft className=' cursor-pointer' onClick={() => transfer_to_target_list(i)} />
                                </div>
                            )
                        }


                    </div>
                ))
            }
        </div>
    );
};
export default TransferComponent;