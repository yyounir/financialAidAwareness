import React, { useEffect, useState, useRef } from 'react'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Comparator from './pages/Comparator'
import Form from './pages/Form'
import FormSubmitted from './pages/FormSubmitted'

function getRoute() {
  const hash = window.location.hash || '#/'
  const route = hash.replace(/^#\/?/, '')
  return route || '/'
}

export default function App() {
  const [route, setRoute] = useState(getRoute())
  const brandRef = useRef(null)

  useEffect(() => {
    function onHash() {
      setRoute(getRoute())
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div>
      <header className="site-header" style={{backgroundImage:"url('/INT-Asset-New-1024x640.png')"}}>
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div className="brand" ref={brandRef} style={{display:'flex',alignItems:'center',gap:12}}>
            <img
              className="site-logo"
              src="/freeaid.png"
              alt="Approve More Financial Aid logo"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                if (brandRef && brandRef.current) brandRef.current.classList.add('no-logo')
              }}
              onLoad={(e) => {
                if (brandRef && brandRef.current) brandRef.current.classList.remove('no-logo')
              }}
            />
            <div>
              <h1>FREEAid</h1>
              <p className="lede">A campaign to expand eligibility and ensure students get the support they need — sign the pledge and take action.</p>
            </div>
          </div>

          <nav className="top-nav">
            <a href="#/" className={route === '/' ? 'active' : ''} aria-current={route === '/' ? 'page' : undefined}>Home</a>
            <a href="#/calculator" className={route === 'calculator' ? 'active' : ''} aria-current={route === 'calculator' ? 'page' : undefined}>Calculator</a>
            <a href="#/comparator" className={route === 'comparator' ? 'active' : ''} aria-current={route === 'comparator' ? 'page' : undefined}>Comparator</a>
            <a href="#/form" className={route === 'form' ? 'active' : ''} aria-current={route === 'form' ? 'page' : undefined}>Take Action</a>
          </nav>
        </div>
      </header>

      <main className="container">
        {route === 'calculator' || route === '/calculator' ? (
          <Calculator />
        ) : route === 'comparator' || route === '/comparator' ? (
          <Comparator />
        ) : route === 'form' || route === '/form' ? (
          <Form />
        ) : route === 'form-submitted' || route === '/form-submitted' ? (
          <FormSubmitted />
        ) : (
          <Home />
        )}
      </main>
    </div>
  )
}
