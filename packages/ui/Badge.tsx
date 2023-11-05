import React from 'react'

export const Badge = ({ executionResult }) => {
  return (
    <>
        {
            (executionResult === 'Compilation Error'? <span className="bg-yellow-100 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-yellow-900 dark:text-yellow-300">Compilation Error</span>: <></>)
        }
        {
            (executionResult === 'Runtime Error'? <span className="bg-red-100 text-red-800 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-red-900 dark:text-red-300">Runtime Error</span>: <></>)
        }
        {
            (executionResult === 'Executed'? <span className="bg-green-100 text-green-800 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-green-900 dark:text-green-300">Success</span>: <></>)
        }
    </>
  )
}
