import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Storage bucket name for product images
export const PRODUCT_IMAGES_BUCKET = 'product-images'

// =============================================
// STORAGE HELPERS
// =============================================

/**
 * Upload a product image to Supabase Storage
 * @param {File} file - The image file to upload
 * @returns {Promise<{url: string | null, error: Error | null}>}
 */
export const uploadProductImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `products/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .getPublicUrl(filePath)

    return { url: publicUrl, error: null }
  } catch (error) {
    console.error('Error uploading image:', error)
    return { url: null, error }
  }
}

/**
 * Delete a product image from Supabase Storage
 * @param {string} imageUrl - The public URL of the image
 */
export const deleteProductImage = async (imageUrl) => {
  try {
    const urlParts = imageUrl.split(`${PRODUCT_IMAGES_BUCKET}/`)
    if (urlParts.length < 2) return { success: true, error: null }
    
    const filePath = urlParts[1]
    const { error } = await supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .remove([filePath])

    if (error) throw error
    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting image:', error)
    return { success: false, error }
  }
}

// =============================================
// CATEGORY HELPERS
// =============================================

export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
  return { data, error }
}

export const createCategory = async (category) => {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single()
  return { data, error }
}

export const updateCategory = async (id, updates) => {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export const deleteCategory = async (id) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)
  return { error }
}

// =============================================
// PRODUCT HELPERS
// =============================================

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, icon)')
    .order('name')
  return { data, error }
}

export const fetchProductsByCategory = async (categoryId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, icon)')
    .eq('category_id', categoryId)
    .eq('is_available', true)
    .order('name')
  return { data, error }
}

export const createProduct = async (product) => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()
  return { data, error }
}

export const updateProduct = async (id, updates) => {
  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)
  return { error }
}

// =============================================
// ORDER HELPERS
// =============================================

export const createOrder = async (orderData, orderItems) => {
  try {
    // Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        total_amount: orderData.total_amount,
        status: 'pending',
        customer_name: orderData.customer_name || null,
        notes: orderData.notes || null
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Create order items
    const items = orderItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.quantity * item.unit_price,
      flavor: item.flavor || null
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(items)

    if (itemsError) throw itemsError

    return { data: order, error: null }
  } catch (error) {
    console.error('Error creating order:', error)
    return { data: null, error }
  }
}

export const fetchOrders = async (limit = 50) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (name, image_url)
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit)
  return { data, error }
}

// =============================================
// ANALYTICS HELPERS
// =============================================

export const getRevenueStats = async () => {
  const now = new Date()
  
  // Start of today (midnight)
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  
  // Start of this week (Sunday)
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay())
  weekStart.setHours(0, 0, 0, 0)
  
  // Start of this month
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  try {
    // Today's revenue
    const { data: todayData } = await supabase
      .from('orders')
      .select('total_amount')
      .gte('created_at', todayStart)

    // Week's revenue
    const { data: weekData } = await supabase
      .from('orders')
      .select('total_amount')
      .gte('created_at', weekStart.toISOString())

    // Month's revenue
    const { data: monthData } = await supabase
      .from('orders')
      .select('total_amount')
      .gte('created_at', monthStart)

    return {
      today: todayData?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0,
      week: weekData?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0,
      month: monthData?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0,
      todayOrders: todayData?.length || 0,
      weekOrders: weekData?.length || 0,
      monthOrders: monthData?.length || 0
    }
  } catch (error) {
    console.error('Error fetching revenue stats:', error)
    return { today: 0, week: 0, month: 0, todayOrders: 0, weekOrders: 0, monthOrders: 0 }
  }
}

export const getMostBoughtProducts = async (limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        quantity,
        product_id,
        products (
          id,
          name,
          price,
          image_url,
          categories (name)
        )
      `)

    if (error) throw error

    // Aggregate quantities by product
    const productTotals = {}
    data?.forEach(item => {
      if (item.products) {
        const productId = item.product_id
        if (!productTotals[productId]) {
          productTotals[productId] = {
            ...item.products,
            category_name: item.products.categories?.name,
            total_quantity: 0,
            total_revenue: 0
          }
        }
        productTotals[productId].total_quantity += item.quantity
        productTotals[productId].total_revenue += item.quantity * item.products.price
      }
    })

    // Sort by quantity and return top items
    return Object.values(productTotals)
      .sort((a, b) => b.total_quantity - a.total_quantity)
      .slice(0, limit)
  } catch (error) {
    console.error('Error fetching most bought products:', error)
    return []
  }
}
