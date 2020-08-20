import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { NotFound } from './NotFound'

test('<NotFound /> should render Page Not Found message', () => {
  const screen = render(<NotFound />)
  expect(screen.getByText('Page Not Found')).toBeInTheDocument()
})
