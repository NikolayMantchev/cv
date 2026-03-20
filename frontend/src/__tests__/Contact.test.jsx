import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '../components/Contact'

jest.mock('../utils/icons', () => ({
  Icon: ({ name }) => <span data-testid={`icon-${name}`} />
}))

global.fetch = jest.fn()

describe('Contact', () => {
  beforeEach(() => {
    fetch.mockReset()
  })

  it('renders the contact form with all fields', () => {
    render(<Contact />)
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your@email.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('updates each field as the user types', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const nameInput = screen.getByPlaceholderText('Your Name')
    await user.type(nameInput, 'Alice')
    expect(nameInput).toHaveValue('Alice')

    const emailInput = screen.getByPlaceholderText('your@email.com')
    await user.type(emailInput, 'alice@example.com')
    expect(emailInput).toHaveValue('alice@example.com')

    const subjectInput = screen.getByPlaceholderText('Subject')
    await user.type(subjectInput, 'Hello')
    expect(subjectInput).toHaveValue('Hello')

    const messageInput = screen.getByPlaceholderText('Your Message')
    await user.type(messageInput, 'A test message')
    expect(messageInput).toHaveValue('A test message')
  })

  it('calls fetch with correct payload on submit', async () => {
    fetch.mockResolvedValueOnce({ ok: true })
    const user = userEvent.setup()
    render(<Contact />)

    await user.type(screen.getByPlaceholderText('Your Name'), 'Alice')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'alice@example.com')
    await user.type(screen.getByPlaceholderText('Subject'), 'Hello')
    await user.type(screen.getByPlaceholderText('Your Message'), 'Test message')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice',
        email: 'alice@example.com',
        subject: 'Hello',
        message: 'Test message'
      })
    })
  })

  it('shows success state after successful submission', async () => {
    fetch.mockResolvedValueOnce({ ok: true })
    const user = userEvent.setup()
    render(<Contact />)

    await user.type(screen.getByPlaceholderText('Your Name'), 'Alice')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'alice@example.com')
    await user.type(screen.getByPlaceholderText('Subject'), 'Hello')
    await user.type(screen.getByPlaceholderText('Your Message'), 'Test message')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    })
    expect(screen.queryByPlaceholderText('Your Name')).not.toBeInTheDocument()
  })

  it('clears the form fields after successful submission', async () => {
    fetch.mockResolvedValueOnce({ ok: true })
    const user = userEvent.setup()
    render(<Contact />)

    await user.type(screen.getByPlaceholderText('Your Name'), 'Alice')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'alice@example.com')
    await user.type(screen.getByPlaceholderText('Subject'), 'Hello')
    await user.type(screen.getByPlaceholderText('Your Message'), 'Test message')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => screen.getByText(/message sent/i))

    // Go back to the form
    await user.click(screen.getByRole('button', { name: /send another message/i }))

    expect(screen.getByPlaceholderText('Your Name')).toHaveValue('')
    expect(screen.getByPlaceholderText('your@email.com')).toHaveValue('')
  })

  it('"Send another message" returns to the form', async () => {
    fetch.mockResolvedValueOnce({ ok: true })
    const user = userEvent.setup()
    render(<Contact />)

    await user.type(screen.getByPlaceholderText('Your Name'), 'Alice')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'alice@example.com')
    await user.type(screen.getByPlaceholderText('Subject'), 'Hello')
    await user.type(screen.getByPlaceholderText('Your Message'), 'Test message')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => screen.getByText(/message sent/i))
    await user.click(screen.getByRole('button', { name: /send another message/i }))

    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
  })

  it('stays on the form if the API returns a non-ok response', async () => {
    fetch.mockResolvedValueOnce({ ok: false })
    const user = userEvent.setup()
    render(<Contact />)

    await user.type(screen.getByPlaceholderText('Your Name'), 'Alice')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'alice@example.com')
    await user.type(screen.getByPlaceholderText('Subject'), 'Hello')
    await user.type(screen.getByPlaceholderText('Your Message'), 'Test message')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.queryByText(/message sent/i)).not.toBeInTheDocument()
    })
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
  })

  it('does not crash when fetch throws a network error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'))
    const user = userEvent.setup()
    render(<Contact />)

    await user.type(screen.getByPlaceholderText('Your Name'), 'Alice')
    await user.type(screen.getByPlaceholderText('your@email.com'), 'alice@example.com')
    await user.type(screen.getByPlaceholderText('Subject'), 'Hello')
    await user.type(screen.getByPlaceholderText('Your Message'), 'Test message')
    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
    })
  })
})
