import { useState, useEffect } from 'react'
import './index.css'
import Topbar from './components/layout/Topbar'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ImageMarqueeStrip from './components/layout/ImageMarqueeStrip'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import NewsPage from './pages/NewsPage'
import ContactPage from './pages/ContactPage'
import DonatePage from './pages/DonatePage'
import RegistrationPage from './pages/RegistrationPage'
import IDCardDownloadPage from './pages/IDCardDownloadPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'

// App — handles dynamic page routing (Topbar + Navbar + Router + Footer)
function App() {
  const [path, setPath] = useState(window.location.pathname)

  // Sync browser path with react state
  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Handle hash scrolling on page/path changes or on initial load
  useEffect(() => {
    if (window.location.hash) {
      const elementId = window.location.hash.substring(1)
      // Add a brief timeout to ensure components are fully rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [path])

  // Listen for cross-section page navigation
  useEffect(() => {
    const handleDonateNav = () => {
      let targetPath = '/donate'
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath)
        setPath(targetPath)
        window.location.hash = ''
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    const handleNewsNav = () => {
      let targetPath = '/news'
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath)
        setPath(targetPath)
        window.location.hash = ''
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    const handleContactNav = () => {
      let targetPath = '/contact'
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath)
        setPath(targetPath)
        window.location.hash = ''
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    window.addEventListener('navigate-donate', handleDonateNav)
    window.addEventListener('navigate-news', handleNewsNav)
    window.addEventListener('navigate-contact', handleContactNav)
    return () => {
      window.removeEventListener('navigate-donate', handleDonateNav)
      window.removeEventListener('navigate-news', handleNewsNav)
      window.removeEventListener('navigate-contact', handleContactNav)
    }
  }, [])

  // Global anchor click listener to intercept cross-page hash scrolls smoothly
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a')
      if (!target) return
      
      const href = target.getAttribute('href')
      if (href === '/contact' || href === 'contact-page') {
        e.preventDefault()
        window.dispatchEvent(new Event('navigate-contact'))
        return
      }
      // Only intercept actual hash anchors (exclude "#" alone which is often used for empty buttons)
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault()
        const elementId = href.substring(1)
        const element = document.getElementById(elementId)
        
        if (element) {
          // Element exists on the current page, scroll smoothly
          element.scrollIntoView({ behavior: 'smooth' })
        } else {
          // Element is not on this page (likely on Home page). Navigate Home and set hash
          window.history.pushState({}, '', '/')
          setPath('/')
          window.location.hash = href
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  // Helper to map pathname to currentPage name for components (Navbar, Footer, etc.)
  const getPageName = (currentPath) => {
    if (currentPath === '/about') return 'about'
    if (currentPath === '/news') return 'news'
    if (currentPath === '/contact') return 'contact'
    if (currentPath === '/donate') return 'donate'
    if (currentPath === '/register') return 'register'
    if (currentPath === '/download-id') return 'download-id'
    if (currentPath === '/terms') return 'terms'
    if (currentPath === '/privacy') return 'privacy'
    return 'home'
  }

  const currentPage = getPageName(path) || 'home'

  // Smart routing function
  const setCurrentPage = (pageName, anchor = '') => {
    let targetPath = '/'
    if (pageName === 'about') targetPath = '/about'
    else if (pageName === 'news') targetPath = '/news'
    else if (pageName === 'contact') targetPath = '/contact'
    else if (pageName === 'donate') targetPath = '/donate'
    else if (pageName === 'register') targetPath = '/register'
    else if (pageName === 'download-id') targetPath = '/download-id'
    else if (pageName === 'terms') targetPath = '/terms'
    else if (pageName === 'privacy') targetPath = '/privacy'

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath)
      setPath(targetPath)
      
      if (anchor) {
        window.location.hash = anchor
      } else {
        window.location.hash = ''
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      // Already on the target page
      if (anchor) {
        const element = document.getElementById(anchor.replace('#', ''))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Topbar />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' ? <Home /> : currentPage === 'about' ? <AboutPage /> : currentPage === 'news' ? <NewsPage /> : currentPage === 'contact' ? <ContactPage /> : currentPage === 'donate' ? <DonatePage /> : currentPage === 'register' ? <RegistrationPage /> : currentPage === 'download-id' ? <IDCardDownloadPage /> : currentPage === 'terms' ? <TermsPage /> : currentPage === 'privacy' ? <PrivacyPage /> : <Home />}
      <ImageMarqueeStrip />
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default App
