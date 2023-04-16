import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TextField from './TextField'

describe('TextField component', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(<TextField placeholder="Enter text" />)
    expect(getByPlaceholderText('Enter text')).toBeInTheDocument()
  })
})
