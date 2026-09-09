import React from 'react'

type Props = {status?: string}

export default function StatusChip({status}:Props){
  const base = 'px-3 py-1 rounded-full text-sm font-medium'
  const mapping:any = {
    open: 'bg-blue-100 text-blue-800',
    full: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  const cls = mapping[status || ''] || 'bg-slate-100 text-slate-700'
  return <span className={`${base} ${cls}`}>{status || 'unknown'}</span>
}
