import {render, screen} from '@testing-library/react'
import Homepage from '../pages/index'

describe('Homepage', () => {
  it('renders without crashing', () => {
    render(<Homepage />)
    expect(screen.getByRole('heading', {name: 'PyGrid Admin'})).toBeInTheDocument()
  })
})
