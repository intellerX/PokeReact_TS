export interface ITextField {
  placeholder?: string
  icon?: string
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void
}
