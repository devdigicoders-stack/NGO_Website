import { useRef, useEffect } from 'react'
import { getIDCardTemplate } from '../utils/registrationUtils'

const IDCardGenerator = ({ orgId, formData, regNumber, onGenerated }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    generateIDCard()
  }, [orgId, formData, regNumber])

  const generateIDCard = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const template = getIDCardTemplate(orgId)

    // Load template image
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = template

    img.onload = () => {
      // Set canvas size (standard ID card size)
      canvas.width = 1050
      canvas.height = 650

      // Draw template (scaled to fit)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      // Draw photo if available (bottom left)
      if (formData.photo) {
        const photoImg = new Image()
        photoImg.src = formData.photo
        photoImg.onload = () => {
          // Photo position at bottom
          ctx.save()
          ctx.beginPath()
          ctx.rect(60, 400, 160, 200)
          ctx.clip()
          ctx.drawImage(photoImg, 60, 400, 160, 200)
          ctx.restore()
          
          drawDynamicData()
        }
      } else {
        drawDynamicData()
      }
    }

    const drawDynamicData = () => {
      // All dynamic data at bottom section
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      
      // Bottom section starts (below photo area)
      const leftColumnX = 250
      const rightColumnX = 600
      let currentY = 420
      const lineHeight = 35

      // Name
      ctx.fillStyle = '#1a1a1a'
      ctx.font = 'bold 22px Arial, sans-serif'
      ctx.fillText('नाम:', leftColumnX, currentY)
      ctx.font = '20px Arial, sans-serif'
      const name = formData.name || ''
      ctx.fillText(name.length > 20 ? name.substring(0, 20) + '...' : name, leftColumnX + 110, currentY)
      currentY += lineHeight

      // Father/Husband name
      ctx.font = 'bold 20px Arial, sans-serif'
      ctx.fillText('पिता/पति:', leftColumnX, currentY)
      ctx.font = '18px Arial, sans-serif'
      ctx.fillStyle = '#2a2a2a'
      const father = formData.father || ''
      ctx.fillText(father.length > 18 ? father.substring(0, 18) + '...' : father, leftColumnX + 110, currentY)
      currentY += lineHeight

      // DOB
      ctx.font = 'bold 18px Arial, sans-serif'
      ctx.fillStyle = '#1a1a1a'
      ctx.fillText('जन्म तिथि:', leftColumnX, currentY)
      ctx.font = '18px Arial, sans-serif'
      ctx.fillStyle = '#333333'
      ctx.fillText(formData.dob || '', leftColumnX + 110, currentY)
      currentY += lineHeight

      // Mobile
      ctx.font = 'bold 18px Arial, sans-serif'
      ctx.fillStyle = '#1a1a1a'
      ctx.fillText('मोबाइल:', leftColumnX, currentY)
      ctx.font = '18px Arial, sans-serif'
      ctx.fillStyle = '#333333'
      ctx.fillText(formData.mobile || '', leftColumnX + 110, currentY)
      currentY += lineHeight

      // Address (wrapped, bottom area)
      ctx.font = 'bold 18px Arial, sans-serif'
      ctx.fillStyle = '#1a1a1a'
      ctx.fillText('पता:', leftColumnX, currentY)
      
      ctx.font = '16px Arial, sans-serif'
      ctx.fillStyle = '#333333'
      const address = formData.address || ''
      const maxWidth = 550
      const words = address.split(' ')
      let line = ''
      let addressY = currentY
      let addressLines = 0
      
      for (let word of words) {
        const testLine = line + word + ' '
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && line !== '') {
          ctx.fillText(line.trim(), leftColumnX + 110, addressY)
          line = word + ' '
          addressY += 25
          addressLines++
          if (addressLines >= 2) break // Max 2 lines
        } else {
          line = testLine
        }
      }
      if (addressLines < 2 && line.trim()) {
        ctx.fillText(line.trim(), leftColumnX + 110, addressY)
      }
      currentY += 60

      // Registration Number (prominent at bottom)
      ctx.font = 'bold 24px Arial, sans-serif'
      ctx.fillStyle = '#c62828'
      ctx.fillText('रजि. नं: ' + regNumber, leftColumnX, currentY)

      if (onGenerated) {
        onGenerated(canvas.toDataURL('image/png'))
      }
    }
  }

  return (
    <div style={{ display: 'none' }}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default IDCardGenerator
