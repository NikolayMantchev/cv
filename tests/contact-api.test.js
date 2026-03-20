const mockEmailSend = jest.fn()
const mockContactSave = jest.fn()
const mockContactConstructor = jest.fn().mockImplementation(() => ({ save: mockContactSave }))

jest.mock('resend', () => ({
  __esModule: true,
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockEmailSend }
  }))
}))

jest.mock('mongoose', () => ({
  __esModule: true,
  default: {
    connect: jest.fn().mockResolvedValue({}),
    models: {},
    model: jest.fn().mockReturnValue(mockContactConstructor),
    Schema: jest.fn()
  }
}))

const createReq = (method, body = {}) => ({ method, body })

const createRes = () => {
  const res = {
    setHeader: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis()
  }
  return res
}

describe('contact API handler', () => {
  let handler

  beforeAll(async () => {
    const mod = await import('../api/contact/index.js')
    handler = mod.default
  })

  beforeEach(() => {
    mockEmailSend.mockResolvedValue({ id: 'test-email-id' })
    mockContactSave.mockResolvedValue({})
  })

  describe('HTTP method handling', () => {
    it('returns 200 for OPTIONS preflight', async () => {
      const req = createReq('OPTIONS')
      const res = createRes()
      await handler(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.end).toHaveBeenCalled()
    })

    it('returns 405 for GET requests', async () => {
      const req = createReq('GET')
      const res = createRes()
      await handler(req, res)
      expect(res.status).toHaveBeenCalledWith(405)
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Method not allowed' })
    })

    it('sets CORS headers on every request', async () => {
      const req = createReq('OPTIONS')
      const res = createRes()
      await handler(req, res)
      expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*')
      expect(res.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'POST, OPTIONS')
    })
  })

  describe('field validation', () => {
    it('returns 400 when name is missing', async () => {
      const req = createReq('POST', { email: 'a@b.com', subject: 'Hi', message: 'Hello' })
      const res = createRes()
      await handler(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'All fields are required' })
    })

    it('returns 400 when email is missing', async () => {
      const req = createReq('POST', { name: 'Alice', subject: 'Hi', message: 'Hello' })
      const res = createRes()
      await handler(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'All fields are required' })
    })

    it('returns 400 when subject is missing', async () => {
      const req = createReq('POST', { name: 'Alice', email: 'a@b.com', message: 'Hello' })
      const res = createRes()
      await handler(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
    })

    it('returns 400 when message is missing', async () => {
      const req = createReq('POST', { name: 'Alice', email: 'a@b.com', subject: 'Hi' })
      const res = createRes()
      await handler(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
    })
  })

  describe('email format validation', () => {
    const validBody = { name: 'Alice', subject: 'Hi', message: 'Hello' }

    it.each([
      'notanemail',
      'missing@',
      '@nodomain.com',
      'spaces in@email.com',
      'double@@domain.com'
    ])('returns 400 for invalid email: %s', async (email) => {
      const req = createReq('POST', { ...validBody, email })
      const res = createRes()
      await handler(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Invalid email format' })
    })

    it.each([
      'user@example.com',
      'user+tag@sub.domain.org',
      'first.last@company.co.uk'
    ])('accepts valid email: %s', async (email) => {
      const req = createReq('POST', { ...validBody, email })
      const res = createRes()
      await handler(req, res)
      expect(res.status).not.toHaveBeenCalledWith(400)
    })
  })

  describe('successful submission', () => {
    const validBody = { name: 'Alice', email: 'alice@example.com', subject: 'Hello', message: 'Test message' }

    it('sends email via Resend with correct fields', async () => {
      const req = createReq('POST', validBody)
      const res = createRes()
      await handler(req, res)
      expect(mockEmailSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: '04vision04@protonmail.com',
          reply_to: 'alice@example.com',
          subject: '[CV] Hello'
        })
      )
    })

    it('returns 201 with success message', async () => {
      const req = createReq('POST', validBody)
      const res = createRes()
      await handler(req, res)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Message sent successfully' })
    })

    it('includes sender name and message in email html', async () => {
      const req = createReq('POST', validBody)
      const res = createRes()
      await handler(req, res)
      const emailArg = mockEmailSend.mock.calls[0][0]
      expect(emailArg.html).toContain('Alice')
      expect(emailArg.html).toContain('alice@example.com')
      expect(emailArg.html).toContain('Test message')
    })
  })

  describe('error handling', () => {
    it('returns 500 when Resend throws', async () => {
      mockEmailSend.mockRejectedValueOnce(new Error('Resend service down'))
      const req = createReq('POST', { name: 'Alice', email: 'a@b.com', subject: 'Hi', message: 'Hello' })
      const res = createRes()
      await handler(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Failed to send message' })
    })
  })
})
