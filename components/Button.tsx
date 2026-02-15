interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  className?: string
}

export default function Button({ children, variant = 'primary', href, className = '' }: ButtonProps) {
  const baseStyles = "px-10 py-4 font-light text-lg rounded-full transition-all hover:scale-105 shadow-lg"
  
  const variantStyles = {
    primary: "bg-mediterranean-terracotta text-white hover:bg-opacity-90",
    secondary: "border-2 border-mediterranean-blue text-mediterranean-blue hover:bg-mediterranean-blue hover:text-white"
  }

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={combinedStyles}>
        {children}
      </a>
    )
  }

  return (
    <button className={combinedStyles}>
      {children}
    </button>
  )
}
