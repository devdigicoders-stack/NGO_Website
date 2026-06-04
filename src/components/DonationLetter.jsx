import { useState, useRef } from 'react'
import { Download, ArrowLeft, Loader2 } from 'lucide-react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

const formatDateEN = (dateStr) => {
  if (!dateStr) return new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
}

const formatDateHI = (dateStr) => {
  if (!dateStr) return new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  return new Date(dateStr).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

const numberToWords = (num) => {
  const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
    'Eighteen', 'Nineteen']
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  const convert = (n) => {
    if (n < 20) return a[n]
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '')
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + convert(n % 100) : '')
    if (n < 100000) return convert(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + convert(n % 1000) : '')
    if (n < 10000000) return convert(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + convert(n % 100000) : '')
    return convert(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + convert(n % 10000000) : '')
  }
  if (num === 0) return 'Zero'
  return convert(Math.abs(Math.floor(num))) + ' Rupees Only'
}

const DonationLetter = ({ donation, onBack }) => {
  const printAreaRef = useRef(null)
  const [downloading, setDownloading] = useState(false)

  if (!donation) return null

  const refId = donation._id || donation.id || '—'

  const handleDownloadPDF = async () => {
    if (!printAreaRef.current) return
    setDownloading(true)
    try {
      const element = printAreaRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution (retina support)
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`donation-letter-${refId}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err)
      alert('लेटर डाउनलोड करने में त्रुटि हुई। कृपया पुनः प्रयास करें।')
    } finally {
      setDownloading(false)
    }
  }

  // ── Theme Colors — confirmed = primary, pending = amber ──
  const isConfirmed = donation.status === 'confirmed'
  const primary = isConfirmed ? '#821905' : '#b45309'
  const primaryDark = isConfirmed ? '#5c1204' : '#92400e'
  const primaryDeep = isConfirmed ? '#2a0501' : '#451a03'
  const accentLight = isConfirmed ? '#f0c4bb' : '#fde68a'
  const gold = isConfirmed ? '#d4af37' : '#f59e0b'
  const bgLight = isConfirmed ? '#fdf6f5' : '#fffbeb'

  const amountNum = Number(donation.amount) || 0
  const amountStr = `₹${amountNum.toLocaleString('en-IN')}`
  const statusLabel = donation.status === 'confirmed' ? 'CONFIRMED / पुष्टित' : donation.status === 'cancelled' ? 'CANCELLED / निरस्त' : 'PENDING / लंबित'
  const statusBg = donation.status === 'confirmed' ? '#dcfce7' : donation.status === 'cancelled' ? '#fee2e2' : '#fef3c7'
  const statusColor = donation.status === 'confirmed' ? '#15803d' : donation.status === 'cancelled' ? '#dc2626' : '#b45309'

  return (
    <div style={{ padding: '20px 0', minHeight: '100vh', background: '#f1f5f9' }} className="no-print-bg">

      {/* ── Control Bar ── */}
      <div style={{ maxWidth: '800px', margin: '0 auto 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', flexWrap: 'wrap', gap: '12px' }} className="no-print">
        {onBack ? (
          <button
            onClick={onBack}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px', borderRadius: '10px', border: '1px solid #e2e8f0',
              background: '#fff', color: '#475569', fontSize: '14px', fontWeight: 600,
              cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.2s',
              fontFamily: "'Hind', sans-serif"
            }}
          >
            <ArrowLeft size={16} /> वापस जाएं
          </button>
        ) : <div />}

        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 24px', borderRadius: '10px', border: 'none',
            background: downloading ? '#9ca3af' : `linear-gradient(135deg, ${primary}, ${primaryDark})`,
            color: '#fff', fontSize: '14px', fontWeight: 700,
            cursor: downloading ? 'not-allowed' : 'pointer',
            boxShadow: downloading ? 'none' : '0 4px 12px rgba(130,25,5,0.25)', transition: 'all 0.2s',
            fontFamily: "'Hind', sans-serif"
          }}
          onMouseOver={e => { if(!downloading) e.currentTarget.style.opacity = '0.9' }}
          onMouseOut={e => { if(!downloading) e.currentTarget.style.opacity = '1' }}
        >
          {downloading ? (
            <>
              <Loader2 size={16} className="animate-spin" /> डाउनलोड हो रहा है...
            </>
          ) : (
            <>
              <Download size={16} /> PDF डाउनलोड करें
            </>
          )}
        </button>
      </div>

      {/* ── Letter Container (A4) ── */}
      <div
        ref={printAreaRef}
        className="donation-print-letter"
        style={{
          width: '794px',
          minHeight: '1123px',
          margin: '0 auto',
          background: '#ffffff',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          position: 'relative',
          padding: '0',
          boxSizing: 'border-box',
          fontFamily: "'Hind', 'Inter', sans-serif",
          color: '#1e293b',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Decorative Top Band ── */}
        <div style={{
          height: '8px',
          background: `linear-gradient(90deg, ${primaryDeep} 0%, ${primary} 35%, ${gold} 65%, ${primary} 100%)`,
          flexShrink: 0,
        }} />

        {/* ── Geometric Corner Accents ── */}
        <div style={{ position: 'absolute', top: '8px', left: 0, width: '200px', height: '200px', pointerEvents: 'none', opacity: 0.12 }}>
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            <polygon points="0,0 200,0 0,200" fill={primary} />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '200px', height: '200px', pointerEvents: 'none', opacity: 0.12 }}>
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            <polygon points="200,200 0,200 200,0" fill={primary} />
          </svg>
        </div>

        {/* ── Subtle Grid Background ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(rgba(130,25,5,0.02) 1px, transparent 0)`,
          backgroundSize: '14px 14px',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* ── Main Content ── */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', flex: 1, padding: '50px 65px 50px' }}>

          {/* ── Letterhead ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img
                src="/main_logo.png"
                alt="Logo"
                style={{ height: '72px', width: 'auto', objectFit: 'contain' }}
                onError={(e) => { e.target.src = '/logo.png' }}
              />
              <div>
                <h1 style={{ fontFamily: "'Hind', sans-serif", fontSize: '22px', fontWeight: 800, color: primary, margin: 0, lineHeight: 1.2 }}>
                  साधू लक्ष्मी जनकल्याण ट्रस्ट
                </h1>
                <p style={{ fontSize: '11px', color: '#64748b', margin: '3px 0 0', fontWeight: 600, letterSpacing: '0.6px' }}>
                  SADHU LAXMI JAN KALYAN TRUST (REGD. IV/175/26)
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '10.5px', color: '#475569', lineHeight: 1.55, fontWeight: 500 }}>
              <div>📞 +91 98765 43210</div>
              <div>✉️ info@sadhulaxmitrust.org</div>
              <div>🌐 www.sadhulaxmitrust.org</div>
            </div>
          </div>

          {/* ── Double Separator ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '30px' }}>
            <div style={{ height: '3px', background: primary }} />
            <div style={{ height: '1px', background: gold }} />
          </div>

          {/* ── Document Title Banner ── */}
          <div style={{
            background: `linear-gradient(135deg, ${primary}, ${primaryDark})`,
            padding: '14px 22px',
            borderRadius: '8px',
            marginBottom: '28px',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontSize: '16px', fontWeight: 800, color: '#fff',
              margin: 0, letterSpacing: '1.5px', textTransform: 'uppercase',
              fontFamily: "'Hind', sans-serif"
            }}>
              दान पुष्टि पत्र / DONATION CONFIRMATION LETTER
            </h2>
          </div>

          {/* ── Reference & Date Row ── */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: bgLight, border: `1px solid ${accentLight}`,
            borderRadius: '8px', padding: '12px 18px', marginBottom: '24px',
          }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Ref. No / रेफरेंस नं:
              </span>
              <span style={{ fontSize: '14px', fontWeight: 800, color: primary, fontFamily: 'monospace', marginLeft: '8px' }}>
                {refId}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Date / दिनांक:
              </span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginLeft: '8px' }}>
                {formatDateEN(donation.createdAt)}
              </span>
            </div>
          </div>

          {/* ── Recipient Info ── */}
          <div style={{ marginBottom: '22px' }}>
            <p style={{ fontSize: '11px', fontWeight: 800, color: primary, textTransform: 'uppercase', margin: '0 0 8px', letterSpacing: '0.5px' }}>
              To / सेवा में:
            </p>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px', fontFamily: "'Hind', sans-serif" }}>
              {donation.name}
            </h3>
            <div style={{ fontSize: '12.5px', color: '#475569', display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
              {donation.email && <span>✉️ {donation.email}</span>}
              {donation.phone && <span>📞 {donation.phone}</span>}
            </div>
          </div>

          {/* ── Subject Line ── */}
          <div style={{
            background: `rgba(130,25,5,0.04)`, borderLeft: `4px solid ${primary}`,
            padding: '10px 16px', marginBottom: '22px',
          }}>
            <p style={{ fontSize: '13px', fontWeight: 800, color: primary, margin: 0 }}>
              Subject: Donation Acknowledgement & Tax Exemption Receipt
            </p>
            <p style={{ fontSize: '12px', fontWeight: 700, color: '#475569', margin: '3px 0 0' }}>
              विषय: दान की पुष्टि और कर छूट रसीद (Ref: {refId})
            </p>
          </div>

          {/* ── Letter Body ── */}
          <div style={{ fontSize: '13px', lineHeight: 1.75, color: '#334155', marginBottom: '22px', textAlign: 'justify' }}>
            <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
              Dear {donation.name},
            </p>
            <p>
              We are pleased to acknowledge and confirm the receipt of your generous contribution to <strong style={{ color: primary }}>Sadhu Laxmi Jan Kalyan Trust</strong>. Your support is instrumental in empowering our ongoing humanitarian efforts and social welfare programs across the community.
            </p>
            <p style={{ marginTop: '8px' }}>
              The details of your donated amount are specified in the table below:
            </p>
          </div>

          {/* ── Donation Details Table ── */}
          <div style={{ marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ background: primary, color: '#fff' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, border: `1px solid ${primary}`, width: '50px' }}>S.No.</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, border: `1px solid ${primary}` }}>Purpose / दान का कारण</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, border: `1px solid ${primary}` }}>Receipt No.</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700, border: `1px solid ${primary}` }}>Status</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, border: `1px solid ${primary}`, width: '120px' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '11px 14px', border: '1px solid #e2e8f0', color: '#475569', textAlign: 'center' }}>1</td>
                  <td style={{ padding: '11px 14px', border: '1px solid #e2e8f0', fontWeight: 600 }}>
                    {donation.causeLabel || 'सामान्य कल्याण (General Welfare)'}
                  </td>
                  <td style={{ padding: '11px 14px', border: '1px solid #e2e8f0', textAlign: 'center', fontFamily: 'monospace', fontWeight: 600, color: primary, fontSize: '11.5px' }}>
                    {refId}
                  </td>
                  <td style={{ padding: '11px 14px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: 700,
                      background: statusBg, color: statusColor, whiteSpace: 'nowrap',
                    }}>
                      {statusLabel}
                    </span>
                  </td>
                  <td style={{ padding: '11px 14px', border: '1px solid #e2e8f0', textAlign: 'right', fontWeight: 800, color: primary, fontSize: '14px' }}>
                    {amountStr}
                  </td>
                </tr>
                <tr style={{ background: bgLight }}>
                  <td colSpan="4" style={{ padding: '11px 14px', border: '1px solid #e2e8f0', textAlign: 'right', fontWeight: 800, textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.5px', color: '#475569' }}>
                    Total Contributed Amount / कुल दान राशि:
                  </td>
                  <td style={{ padding: '11px 14px', border: '1px solid #e2e8f0', textAlign: 'right', fontSize: '15px', fontWeight: 800, color: primary }}>
                    {amountStr}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── Amount in Words ── */}
          <div style={{
            background: bgLight, border: `1px dashed ${accentLight}`,
            borderRadius: '6px', padding: '8px 14px', marginBottom: '22px',
            fontSize: '12px', color: '#475569',
          }}>
            <strong style={{ color: '#0f172a' }}>Amount in Words:</strong>{' '}
            <span style={{ fontStyle: 'italic', color: primary, fontWeight: 600 }}>
              {numberToWords(amountNum)}
            </span>
          </div>

          {/* ── Payment Details ── */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
            marginBottom: '22px',
          }}>
            <div style={{
              background: bgLight, borderRadius: '8px', padding: '12px 16px',
              border: `1px solid ${accentLight}`,
            }}>
              <p style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>
                Payment Method / भुगतान विधि
              </p>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                {(donation.paymentMethod || 'UPI').toUpperCase()}
              </p>
            </div>
            <div style={{
              background: bgLight, borderRadius: '8px', padding: '12px 16px',
              border: `1px solid ${accentLight}`,
            }}>
              <p style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>
                Donation Date / दान दिनांक
              </p>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                {formatDateHI(donation.createdAt)}
              </p>
            </div>
          </div>

          {/* ── Tax Exemption Box ── */}
          <div style={{
            background: '#f8fafc', border: '1px solid #e2e8f0',
            borderRadius: '8px', padding: '14px 18px', fontSize: '11.5px',
            color: '#475569', lineHeight: 1.65, marginBottom: '24px',
          }}>
            <p style={{ margin: 0 }}>
              💡 <strong style={{ color: '#0f172a' }}>Tax Exemption / 80G कर छूट:</strong> Sadhu Laxmi Jan Kalyan Trust is registered under <strong>Section 80G</strong> of the Income Tax Act, 1961 (Reg. No. <strong>IV/175/26</strong>). Donors may claim tax deduction on contributions as per applicable rules. Please retain this receipt for filing income tax returns.
            </p>
          </div>

          {/* ── Appreciation ── */}
          <div style={{ fontSize: '13px', lineHeight: 1.7, color: '#334155', textAlign: 'justify', marginBottom: '8px' }}>
            <p>
              Your generosity helps us bring direct change and relief to underprivileged communities. We extend our heartfelt gratitude for your trust and partnership in our mission of social welfare and humanitarian service.
            </p>
            <p style={{ marginTop: '8px', fontWeight: 600 }}>
              With warm regards,
            </p>
          </div>

          {/* ── Spacer ── */}
          <div style={{ flex: 1, minHeight: '20px' }} />

          {/* ── Footer / Signature ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '20px' }}>

            {/* Left: Org info */}
            <div style={{ fontSize: '11.5px', color: '#64748b', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 2px', fontWeight: 600, color: '#0f172a' }}>Sadhu Laxmi Jan Kalyan Trust</p>
              <p style={{ margin: 0 }}>Regd. No: IV/175/26</p>
              <p style={{ margin: 0 }}>Address: Delhi, India</p>
            </div>

            {/* Right: Signature area */}
            <div style={{ textAlign: 'center', width: '220px', position: 'relative' }}>
              {/* Stamp Circle */}
              <div style={{
                width: '85px', height: '85px', borderRadius: '50%',
                border: '2px dashed rgba(130,25,5,0.4)',
                position: 'absolute', top: '-40px', left: '20px',
                transform: 'rotate(-15deg)', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', color: 'rgba(130,25,5,0.5)',
                fontSize: '9px', fontWeight: 800, pointerEvents: 'none',
                zIndex: 1
              }}>
                <span style={{ fontSize: '9px', marginBottom: '1px' }}>साधू लक्ष्मी</span>
                <span style={{ fontSize: '9px' }}>जनकल्याण ट्रस्ट</span>
                <span style={{ fontSize: '7px', marginTop: '2px' }}>रजि. IV/175/26</span>
              </div>

              {/* Signature (Blue Cursive) */}
              <div style={{
                fontFamily: "'Caveat', cursive, 'Brush Script MT', sans-serif",
                fontSize: '32px', color: '#1d4ed8',
                height: '40px', lineHeight: '40px', marginBottom: '4px',
                transform: 'rotate(-3deg)', userSelect: 'none',
                position: 'relative', zIndex: 2
              }}>
                Sadhu Laxmi
              </div>

              <div style={{ height: '1.5px', background: '#94a3b8', width: '80%', margin: '0 auto 6px', position: 'relative', zIndex: 2 }} />

              <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0, position: 'relative', zIndex: 2 }}>
                Authorized Signatory
              </p>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0', position: 'relative', zIndex: 2 }}>
                Sadhu Laxmi Jan Kalyan Trust
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom Band ── */}
        <div style={{
          height: '8px',
          background: `linear-gradient(90deg, ${primary} 0%, ${gold} 50%, ${primary} 100%)`,
          flexShrink: 0,
        }} />
      </div>

      {/* ── Print Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Hind:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        @media print {
          body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .no-print-bg {
            background: transparent !important;
            padding: 0 !important;
          }
          .donation-print-letter {
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            width: 100% !important;
            min-height: 100vh !important;
            page-break-after: avoid;
          }
        }
      `}</style>
    </div>
  )
}

export default DonationLetter
