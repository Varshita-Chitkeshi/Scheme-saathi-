import { cn } from '../utils/helpers'

export default function Card({ children, className, as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={cn('rounded-2xl border border-slate-200 bg-white p-5 shadow-sm', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
