import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

type DropdownOption<T = string> = {
  value: T
  label: string
}

type DropdownProps<T = string> = {
  options: DropdownOption<T>[]
  value: T
  onChange: (value: T) => void
  ariaLabel?: string
  className?: string
  triggerClassName?: string
  menuClassName?: string
  disabled?: boolean
}

export function Dropdown<T = string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
  triggerClassName,
  menuClassName,
  disabled = false,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return

      if (event.key === 'Escape') {
        setIsOpen(false)
        setFocusedIndex(-1)
        triggerRef.current?.focus()
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0))
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1))
        return
      }

      if (event.key === 'Enter' && focusedIndex >= 0) {
        event.preventDefault()
        onChange(options[focusedIndex].value)
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, focusedIndex, options, onChange])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen((v) => !v)}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between rounded-md bg-[#F8F8F8] px-3 text-sm text-slate-900 transition-colors hover:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5 disabled:cursor-not-allowed disabled:opacity-50',
          triggerClassName,
        )}
      >
        <span className="truncate">{selectedOption?.label ?? 'Select...'}</span>
        <ChevronDown
          className={cn('ml-2 h-4 w-4 shrink-0 text-[#1B212D] transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className={cn(
            'absolute z-50 mt-1 max-h-60 w-full min-w-max overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg',
            menuClassName,
          )}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value
            const isFocused = index === focusedIndex

            return (
              <button
                key={String(option.value)}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                  setFocusedIndex(-1)
                }}
                onMouseEnter={() => setFocusedIndex(index)}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm transition-colors',
                  isSelected && 'bg-slate-100 font-medium text-slate-900',
                  isFocused && !isSelected && 'bg-slate-50 text-slate-900',
                  !isSelected && !isFocused && 'text-slate-700 hover:bg-slate-50',
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

