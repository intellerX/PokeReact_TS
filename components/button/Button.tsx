import React from 'react'
import { IButton } from './IButton'
import styles from "./button.module.scss"

const Button = ({ onClick, children, icon, type }: IButton) => {
  if (icon) {
    return (
      <button onClick={ onClick } className={ styles.button } type={ type }>
        <span className={ styles.icon }>{ icon }</span>
        { children }
      </button>
    )
  }

  return (
    <button onClick={ onClick } className={ styles.button }>
      { children }
    </button>
  )
}

export default Button
