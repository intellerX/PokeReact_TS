import React from 'react'
import { ITextField } from './ITextField'
import styles from "./textfield.module.scss"

const TextField = ({ placeholder, icon, onInput }: ITextField) => {
  if (icon) {
    return (
      <div className={ styles.container } >
        <span className={ styles.icon }>{ icon }</span>
        <input className={ styles.input } placeholder={ placeholder } onInput={ onInput } />
      </div>
    )
  }

  return (
    <input type="text" placeholder={ placeholder } />
  )
}

export default TextField
