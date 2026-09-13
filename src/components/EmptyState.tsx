import React from 'react'

export default function EmptyState({title, subtitle}:{title:string, subtitle?:string}){
  return (
    <div className="card text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <div className="text-sm text-slate-600 mt-2">{subtitle}</div>}
    </div>
  )
}
