import { render, screen, act, fireEvent } from '@testing-library/react'
import HyperText from '../components/HyperText'

describe('HyperText', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it('renders a span containing letters of the text', () => {
    render(<HyperText text="Hello" />)
    // The outer span is present
    expect(document.querySelector('span[style]')).toBeInTheDocument()
  })

  it('eventually settles to the original text after animation completes', () => {
    render(<HyperText text="HELLO" duration={800} />)

    act(() => {
      jest.runAllTimers()
    })

    // Each letter is rendered in its own span; collect them
    const letters = Array.from(document.querySelectorAll('span[style] > span'))
      .map((s) => s.textContent)
      .join('')

    expect(letters).toBe('HELLO')
  })

  it('preserves spaces without scrambling them', () => {
    render(<HyperText text="HI ME" duration={400} />)

    act(() => {
      jest.runAllTimers()
    })

    const letters = Array.from(document.querySelectorAll('span[style] > span'))
      .map((s) => s.textContent)
      .join('')

    expect(letters).toBe('HI ME')
  })

  it('does not animate on first render when animateOnLoad is false', () => {
    render(<HyperText text="ABC" animateOnLoad={false} />)

    // With animateOnLoad=false the interval clears immediately on first render;
    // the display text should already be the original text
    const letters = Array.from(document.querySelectorAll('span[style] > span'))
      .map((s) => s.textContent)
      .join('')

    expect(letters).toBe('ABC')
  })

  it('clears the interval on unmount (no memory leak)', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval')
    const { unmount } = render(<HyperText text="TEST" />)
    unmount()
    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
  })

  it('re-triggers animation on mouse enter', () => {
    render(<HyperText text="HELLO" duration={800} />)

    // Let initial animation finish
    act(() => { jest.runAllTimers() })

    const outerSpan = document.querySelector('span[style]')

    act(() => {
      fireEvent.mouseEnter(outerSpan)
    })

    // After re-trigger, run all timers and confirm text settles again
    act(() => { jest.runAllTimers() })

    const letters = Array.from(document.querySelectorAll('span[style] > span'))
      .map((s) => s.textContent)
      .join('')

    expect(letters).toBe('HELLO')
  })
})
