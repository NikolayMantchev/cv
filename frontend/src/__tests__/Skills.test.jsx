import { render, screen, fireEvent } from '@testing-library/react'
import Skills from '../components/Skills'

jest.mock('../utils/icons', () => ({
  Icon: ({ name }) => <span data-testid={`icon-${name}`} />
}))

describe('Skills', () => {
  it('renders all four category tabs', () => {
    render(<Skills />)
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Graphic Design')).toBeInTheDocument()
    expect(screen.getByText('DevOps')).toBeInTheDocument()
  })

  it('shows Frontend skills by default', () => {
    render(<Skills />)
    expect(screen.getByText('HTML')).toBeInTheDocument()
    expect(screen.getByText('CSS')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('Frontend tab is active by default', () => {
    render(<Skills />)
    const frontendTab = screen.getByText('Frontend').closest('button')
    expect(frontendTab).toHaveClass('active')
  })

  it('clicking Backend shows backend skills and hides frontend skills', () => {
    render(<Skills />)
    fireEvent.click(screen.getByText('Backend'))
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('MongoDB')).toBeInTheDocument()
    expect(screen.queryByText('HTML')).not.toBeInTheDocument()
  })

  it('clicking DevOps shows devops skills', () => {
    render(<Skills />)
    fireEvent.click(screen.getByText('DevOps'))
    expect(screen.getByText('Docker')).toBeInTheDocument()
    expect(screen.getByText('Git')).toBeInTheDocument()
  })

  it('clicking Graphic Design shows design skills', () => {
    render(<Skills />)
    fireEvent.click(screen.getByText('Graphic Design'))
    expect(screen.getByText('Photoshop')).toBeInTheDocument()
    expect(screen.getByText('Figma')).toBeInTheDocument()
  })

  it('active class moves to the clicked tab', () => {
    render(<Skills />)
    const frontendTab = screen.getByText('Frontend').closest('button')
    const backendTab = screen.getByText('Backend').closest('button')

    expect(frontendTab).toHaveClass('active')
    expect(backendTab).not.toHaveClass('active')

    fireEvent.click(backendTab)

    expect(backendTab).toHaveClass('active')
    expect(frontendTab).not.toHaveClass('active')
  })

  it('renders skill progress bars with correct width', () => {
    render(<Skills />)
    // HTML has level 95 in CV_DATA
    const progressBars = document.querySelectorAll('.skill-progress')
    const htmlBar = Array.from(progressBars).find(
      (bar) => bar.style.width === '95%'
    )
    expect(htmlBar).toBeTruthy()
  })
})
