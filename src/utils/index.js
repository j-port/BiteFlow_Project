/**
 * Utility Functions
 * Reusable helper functions used across the application
 */

import { CURRENCY_SYMBOL } from '../constants'

/**
 * Format price with currency symbol
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return `${CURRENCY_SYMBOL}${Number(price).toFixed(2)}`
}

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Format date to time only
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted time string
 */
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Calculate order total from items
 * @param {Array} items - Array of order items with price and quantity
 * @returns {number} Total amount
 */
export const calculateOrderTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}

/**
 * Get start of day timestamp
 * @returns {Date} Start of today
 */
export const getStartOfDay = () => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

/**
 * Get start of week timestamp (Sunday)
 * @returns {Date} Start of this week
 */
export const getStartOfWeek = () => {
  const date = new Date()
  date.setDate(date.getDate() - date.getDay())
  date.setHours(0, 0, 0, 0)
  return date
}

/**
 * Get start of month timestamp
 * @returns {Date} Start of this month
 */
export const getStartOfMonth = () => {
  const date = new Date()
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Validate image file
 * @param {File} file - File to validate
 * @param {number} maxSize - Maximum file size in bytes
 * @param {Array} allowedTypes - Allowed MIME types
 * @returns {{valid: boolean, error: string|null}}
 */
export const validateImageFile = (file, maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/webp']) => {
  if (!file) {
    return { valid: false, error: 'No file provided' }
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` }
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: `File too large. Max size: ${(maxSize / 1024 / 1024).toFixed(1)}MB` }
  }
  
  return { valid: true, error: null }
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
