/**
 * Application Constants
 * Centralized configuration values used across the application
 */

// Flavor options for French Fries
export const FLAVOR_OPTIONS = ['Plain', 'BBQ', 'Cheese', 'Sour Cream']

// Order statuses
export const ORDER_STATUS = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

// Category emojis
export const CATEGORY_EMOJIS = {
  'Rice': '🍚',
  'French Fries': '🍟',
  'Ice Cream': '🍦',
  'Desserts': '🍰',
  'Default': '🍽️'
}

// Price formatting
export const CURRENCY_SYMBOL = '₱'

// Polling intervals (in milliseconds)
export const ORDER_REFRESH_INTERVAL = 3000 // 3 seconds

// Image upload settings
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// Analytics time periods
export const TIME_PERIODS = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month'
}

// API limits
export const DEFAULT_ORDER_LIMIT = 50
export const DEFAULT_PRODUCT_LIMIT = 100
