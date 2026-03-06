import React, { useState } from 'react'
import CV_DATA from '../../../CV_DATA';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Send form data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const { contact, socialLinks, personal } = CV_DATA

  if (submitted) {
    return (
      <section className="contact-section submitted">
        <div className="contact-container">
          <h2 className="section-title">Message Sent!</h2>
          <div className="success-message">
            {contact.form.success}
          </div>
          <button
            className="secondary-button"
            onClick={() => setSubmitted(false)}
          >
            Send another message
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">{contact.title}</h2>
        <p className="section-subtitle">{contact.subtitle}</p>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>{contact.email}</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-text">
                <h3>Location</h3>
                <p>{personal.location}</p>
              </div>
            </div>

            <div className="social-links">
              <h3>Connect with me</h3>
              <div className="social-links-grid">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="social-icon">{link.icon}</span>
                    <span className="social-label">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{contact.form.name}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{contact.form.email}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">{contact.form.subject}</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{contact.form.message}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Your Message"
              />
            </div>

            <button type="submit" className="primary-button">
              {contact.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact