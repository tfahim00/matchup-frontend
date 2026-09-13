import React from 'react'

export default function ErrorState({title, onRetry}:{title?:string, onRetry?:()=>void}){
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{title || 'Couldn\'t load data'}</h3>
        </div>
        {onRetry && <button onClick={onRetry} className="text-blue-600">Retry</button>}
      </div>
    </div>
  )
}
