export default function LoginStyles() {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap');
      
      /* ===== BASE STYLES - DESKTOP ONLY ===== */
      body {
        font-family: 'Inter', 'Noto Sans Thai', sans-serif;
        transform: translateZ(0);
        backface-visibility: hidden;
        transition: padding-right 0.25s ease-out;
      }
      
      body.modal-open {
        overflow: hidden;
      }
      
      * {
        box-sizing: border-box;
      }
      
      button, .info-card, .contact-item {
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      /* ===== COMPONENT STYLES ===== */
      .card-shadow {
        box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.12), 0 10px 20px -5px rgba(0, 0, 0, 0.08);
      }
      
      .btn-primary {
        background: #ffffff;
        border: 1px solid #e5e7eb;
        transition: all 0.2s ease-out;
        will-change: transform;
        transform: translateZ(0);
        min-height: 56px;
        font-size: 16px;
      }
      
      .btn-primary:hover:not(:disabled) {
        border-color: #3b82f6;
        box-shadow: 0 8px 20px -4px rgba(59, 130, 246, 0.2);
        transform: translateY(-1px);
      }
      
      .btn-primary:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        border-color: #3b82f6;
      }
      
      .btn-primary:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
      }
      
      .footer-button {
        transition: all 0.2s ease-out;
        will-change: transform;
        transform: translateZ(0);
      }
      
      .footer-button:hover svg {
        transform: scale(1.1);
      }
      
      .text-heading {
        font-weight: 600;
        letter-spacing: -0.025em;
        color: #111827;
      }
      
      .text-body {
        font-weight: 400;
        color: #4b5563;
        line-height: 1.6;
      }
      
      .accent-line {
        background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
      }
      
      .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid #e5e7eb;
        border-top: 2px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      .error-alert {
        background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        border: 1px solid #fecaca;
        color: #dc2626;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 24px;
        animation: slideIn 0.3s ease-out;
      }
      
      .success-alert {
        animation: slideIn 0.3s ease-out;
      }
      
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      /* ===== DESKTOP OPTIMIZATIONS ===== */
      .main-container {
        width: 500px;
        margin: 0 auto;
      }
      
      .login-card {
        padding: 48px;
      }
      
      .logo-section {
        margin-bottom: 32px;
      }
      
      .header-section {
        margin-bottom: 40px;
      }
      
      .footer-section {
        margin-top: 32px;
      }
    `}</style>
  );
}