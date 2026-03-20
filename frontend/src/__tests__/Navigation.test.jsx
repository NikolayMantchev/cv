import { render, screen, fireEvent, act } from '@testing-library/react'
import Navigation from '../components/Navigation'

describe('Navigation', () => {
  it('renders all nav items from CV_DATA', () => {
    render(<Navigation />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('hamburger button opens the mobile menu', () => {
    render(<Navigation />)
    const hamburger = screen.getByLabelText('Open menu')
    fireEvent.click(hamburger)
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
    expect(hamburger).toHaveAttribute('aria-expanded', 'true')
  })

  it('hamburger button closes the menu when already open', () => {
    render(<Navigation />)
    const hamburger = screen.getByLabelText('Open menu')
    fireEvent.click(hamburger) // open
    fireEvent.click(screen.getByLabelText('Close menu')) // close
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument()
    expect(screen.getByLabelText('Open menu')).toHaveAttribute('aria-expanded', 'false')
  })

  it('locks body scroll when the menu is open', () => {
    render(<Navigation />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body scroll when the menu is closed', () => {
    render(<Navigation />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    fireEvent.click(screen.getByLabelText('Close menu'))
    expect(document.body.style.overflow).toBe('')
  })

  it('restores body scroll on unmount', () => {
    const { unmount } = render(<Navigation />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    unmount()
    expect(document.body.style.overflow).toBe('')
  })

  it('adds scrolled class when scrollY > 50', () => {
    render(<Navigation />)
    const nav = screen.getByRole('navigation')
    expect(nav).not.toHaveClass('scrolled')

    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true, writable: true })
    act(() => { fireEvent.scroll(window) })

    expect(nav).toHaveClass('scrolled')
  })

  it('removes scrolled class when scrollY <= 50', () => {
    render(<Navigation />)
    const nav = screen.getByRole('navigation')

    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true, writable: true })
    act(() => { fireEvent.scroll(window) })
    expect(nav).toHaveClass('scrolled')

    Object.defineProperty(window, 'scrollY', { value: 10, configurable: true, writable: true })
    act(() => { fireEvent.scroll(window) })
    expect(nav).not.toHaveClass('scrolled')
  })

  it('removes scroll listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = render(<Navigation />)
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })

  it('calls scrollIntoView and closes menu when a nav item is clicked', () => {
    const mockSection = document.createElement('section')
    mockSection.id = 'about'
    mockSection.scrollIntoView = jest.fn()
    const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValue(mockSection)

    render(<Navigation />)
    fireEvent.click(screen.getByLabelText('Open menu'))
    fireEvent.click(screen.getByText('About'))

    expect(mockSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument() // menu closed

    getElementByIdSpy.mockRestore()
  })

  it('marks the active nav item with aria-current="page"', () => {
    const mockSection = document.createElement('section')
    mockSection.scrollIntoView = jest.fn()
    const getElementByIdSpy = jest.spyOn(document, 'getElementById').mockReturnValue(mockSection)

    render(<Navigation />)
    fireEvent.click(screen.getByText('Skills'))

    const skillsButton = screen.getByText('Skills').closest('button')
    expect(skillsButton).toHaveAttribute('aria-current', 'page')

    getElementByIdSpy.mockRestore()
  })
})
