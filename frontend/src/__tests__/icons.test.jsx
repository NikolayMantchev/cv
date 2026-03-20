import { render } from '@testing-library/react'
import { ICON_MAP, Icon } from '../utils/icons'

describe('ICON_MAP', () => {
  it('contains social and contact icons', () => {
    expect(ICON_MAP).toHaveProperty('email')
    expect(ICON_MAP).toHaveProperty('github')
    expect(ICON_MAP).toHaveProperty('linkedin')
    expect(ICON_MAP).toHaveProperty('website')
    expect(ICON_MAP).toHaveProperty('location')
  })

  it('contains all skill category tab icons', () => {
    expect(ICON_MAP).toHaveProperty('tab_frontend')
    expect(ICON_MAP).toHaveProperty('tab_backend')
    expect(ICON_MAP).toHaveProperty('tab_design')
    expect(ICON_MAP).toHaveProperty('tab_devops')
  })

  it('contains frontend skill icons matching CV_DATA', () => {
    ;['html', 'css', 'react', 'typescript', 'angular', 'nextjs'].forEach((name) => {
      expect(ICON_MAP).toHaveProperty(name)
    })
  })

  it('contains backend skill icons matching CV_DATA', () => {
    ;['nodejs', 'express', 'mongodb', 'restapi'].forEach((name) => {
      expect(ICON_MAP).toHaveProperty(name)
    })
  })

  it('contains devops skill icons matching CV_DATA', () => {
    ;['docker', 'vercel', 'cicd', 'git'].forEach((name) => {
      expect(ICON_MAP).toHaveProperty(name)
    })
  })

  it('contains design skill icons matching CV_DATA', () => {
    ;['photoshop', 'figma'].forEach((name) => {
      expect(ICON_MAP).toHaveProperty(name)
    })
  })
})

describe('Icon component', () => {
  it('renders a span.icon wrapper for a known icon name', () => {
    const { container } = render(<Icon name="email" />)
    expect(container.querySelector('span.icon')).toBeInTheDocument()
  })

  it('applies a custom className alongside the icon class', () => {
    const { container } = render(<Icon name="github" className="big" />)
    const span = container.querySelector('span.icon')
    expect(span).toHaveClass('big')
  })

  it('returns null for an unknown icon name', () => {
    const { container } = render(<Icon name="does-not-exist" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders an icon element inside the wrapper', () => {
    const { container } = render(<Icon name="react" />)
    const wrapper = container.querySelector('span.icon')
    expect(wrapper?.childNodes.length).toBeGreaterThan(0)
  })
})
