import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export default function Input(props:Props){
  const { className = '', ...rest } = props
  return (
    <input {...rest} className={`input mt-1 ${className}`} />
  )
}
