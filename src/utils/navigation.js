/** SPA navigation helpers (same pattern as navigate-donate / navigate-news) */

export const goToDonate = (e) => {
  e?.preventDefault?.()
  window.dispatchEvent(new Event('navigate-donate'))
}

export const goToContact = (e) => {
  e?.preventDefault?.()
  window.dispatchEvent(new Event('navigate-contact'))
}

export const goToNews = (e) => {
  e?.preventDefault?.()
  window.dispatchEvent(new Event('navigate-news'))
}

/** Handle special href tokens used across sections */
export const handlePageLink = (href, e) => {
  if (href === 'donate-page' || href === '/donate') {
    goToDonate(e)
    return true
  }
  if (href === 'contact-page' || href === '/contact') {
    goToContact(e)
    return true
  }
  return false
}
