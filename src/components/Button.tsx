import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export default function Button({variant='primary', children, className='', ...rest}:Props){
  const base = 'inline-flex items-center justify-center rounded-md font-medium'
  const variants:any = {
    primary: 'bg-[#2F6FED] text-white',
    secondary: 'bg-white border border-[#E3E7EE] text-slate-800',
    ghost: 'bg-transparent text-slate-700'
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>{children}</button>
  )
}
