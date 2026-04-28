import { useCallback } from 'react'

/**
 * usePaystack
 *
 * A React-19-safe hook that calls Paystack's inline JS directly.
 * No npm package — uses the script loaded in index.html.
 *
 * @param {object} config  — { email, amount, publicKey, currency, metadata }
 * @param {function} onSuccess — called with transaction object on success
 * @param {function} onClose  — called when popup is closed without payment
 */
export function usePaystack({ config, onSuccess, onClose }) {

  const initializePayment = useCallback(() => {


    

    // Guard: make sure the Paystack script loaded correctly
    if (!window.PaystackPop) {
      console.error('Paystack script not loaded. Check your index.html.')
      return
    }

    // Guard: email is required by Paystack
    if (!config.email) {
      console.error('Paystack requires a valid email address.')
      return
    }

    const handler = window.PaystackPop.setup({
      key:       config.publicKey,
      email:     config.email,
      amount:    config.amount,          // in kobo (NGN × 100)
      currency:  config.currency || 'NGN',
      ref:       config.reference,
      metadata:  config.metadata || {},

      callback: (transaction) => {
        // Called by Paystack on successful payment
        onSuccess?.(transaction)
      },

      onClose: () => {
        // Called when user closes the popup without paying
        onClose?.()
      },
    })

    handler.openIframe()
  }, [config, onSuccess, onClose])

  return initializePayment
}