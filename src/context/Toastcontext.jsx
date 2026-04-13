import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback(({ message, type = 'success', duration = 3000 }) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const dismiss = (id) => setToasts(prev => prev.filter(t => t.id !== id))

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)

// ── Toast container + individual toast ───────────────────────────────────────

function ToastContainer({ toasts, onDismiss }) {
  if (!toasts.length) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-end',
      }}
    >
      {toasts.map(t => (
        <Toast key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

function Toast({ toast, onDismiss }) {
  const icons = {
    success: '✓',
    error:   '✕',
    info:    '✦',
  }

  const colors = {
    success: { bg: '#1a0f00', border: '#C8923A', icon: '#C8923A' },
    error:   { bg: '#1a0f00', border: '#e05050', icon: '#e05050' },
    info:    { bg: '#1a0f00', border: '#8B5E3C', icon: '#8B5E3C' },
  }

  const c = colors[toast.type] || colors.success

  return (
    <div
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderLeft: `3px solid ${c.border}`,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        minWidth: '240px',
        maxWidth: '320px',
        animation: 'kohi-slide-in 0.25s ease',
        cursor: 'pointer',
      }}
      onClick={() => onDismiss(toast.id)}
    >
      <span style={{ color: c.icon, fontSize: '13px', fontFamily: 'monospace', flexShrink: 0 }}>
        {icons[toast.type]}
      </span>
      <span style={{
        color: '#F5EDD9',
        fontSize: '13px',
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        lineHeight: 1.4,
        flex: 1,
      }}>
        {toast.message}
      </span>
    </div>
  )
}

// inject keyframe once
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes kohi-slide-in {
      from { opacity: 0; transform: translateX(20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
  `
  document.head.appendChild(style)
}