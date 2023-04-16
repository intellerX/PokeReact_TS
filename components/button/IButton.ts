export interface IButton {
  onClick?: () => void
  children?: React.ReactNode
  icon?: string
  type?: 'button' | 'submit' | 'reset'
}
