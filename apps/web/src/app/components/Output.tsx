import React, { useEffect, useState } from 'react'
import axios from 'axios';
const Output = ({ executionId }) => {
    const [executionResult, setExecutionResult] = useState(null)
    useEffect(() => {
        if(executionId) {
            const intervalId = setInterval(() => {
                axios.get(`/api/code/status/${executionId}`).then((data) => {
                    setExecutionResult(data.data);
                });
            }, 10000);
            return () => clearInterval(intervalId);
        }
    }, [executionId]);
    // const { output, verdict } = executionResult?.data;

    return (
        <>
            {
                (executionResult?.data?.verdict === 'Compilation Error'? <span className="bg-yellow-100 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-yellow-900 dark:text-yellow-300">Compilation Error</span>: <></>)
                
            }
            {
                (executionResult?.data?.verdict === 'Runtime Error'? <span class="bg-red-100 text-red-800 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-red-900 dark:text-red-300">Runtime Error</span>: <></>)
            }
            {
                (executionResult?.data?.verdict === 'Executed'? <span class="bg-green-100 text-green-800 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-green-900 dark:text-green-300">Success</span>: <></>)
            }
            {
                (!executionResult? <span class="bg-gray-100 text-gray-800 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-neutral-700 dark:text-gray-300">No Code To Execute!</span>: <></>)
            }
            <div className=' bg-neutral-800 h-auto rounded-md p-3 m-2'><strong>Output</strong><br/><br/>{ executionResult? executionResult.data.output: ""}</div>
        </>
        
    );
}
export default Output;