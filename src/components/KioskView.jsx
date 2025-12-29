import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  ChefHat,
  Loader2,
  CheckCircle,
  Settings,
  Trash2
} from 'lucide-react'

// Demo mode - set to false when connected to Supabase
const DEMO_MODE = false

// Demo Categories
const DEMO_CATEGORIES = [
  { id: 1, name: 'Rice' },
  { id: 2, name: 'French Fries' },
  { id: 3, name: 'Ice Cream' },
  { id: 4, name: 'Desserts' }
]

// Demo Products with sample images
const DEMO_PRODUCTS = [
  // Rice Products
  { id: 1, name: 'Well Milled', price: 41, category_id: 1, image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', has_flavors: false },
  { id: 2, name: 'Polotan', price: 58, category_id: 1, image_url: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400', has_flavors: false },
  { id: 3, name: 'Premium', price: 45, category_id: 1, image_url: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=400', has_flavors: false },
  { id: 4, name: 'Laon', price: 36, category_id: 1, image_url: 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=400', has_flavors: false },
  
  // French Fries Products (with flavors)
  { id: 5, name: 'Small Fries', price: 10, category_id: 2, image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', has_flavors: true },
  { id: 6, name: 'Medium Fries', price: 20, category_id: 2, image_url: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400', has_flavors: true },
  { id: 7, name: 'Large Fries', price: 30, category_id: 2, image_url: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400', has_flavors: true },
  
  // Ice Cream Products (Aice brand)
  { id: 8, name: 'Aice Milk Stick', price: 8, category_id: 3, image_url: 'https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=400', has_flavors: false },
  { id: 9, name: 'Aice Choco Malt', price: 10, category_id: 3, image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', has_flavors: false },
  { id: 10, name: 'Aice Strawberry Crispy', price: 12, category_id: 3, image_url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400', has_flavors: false },
  { id: 11, name: 'Aice Mochi', price: 15, category_id: 3, image_url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400', has_flavors: false },
  { id: 12, name: 'Aice Cone Chocolate', price: 18, category_id: 3, image_url: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400', has_flavors: false },
  { id: 13, name: 'Aice Sundae Cup', price: 20, category_id: 3, image_url: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400', has_flavors: false },
  { id: 14, name: 'Aice Sweet Corn', price: 10, category_id: 3, image_url: 'https://images.unsplash.com/photo-1633933358116-a27b902fad35?w=400', has_flavors: false },
  { id: 15, name: 'Aice Watermelon', price: 8, category_id: 3, image_url: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=400', has_flavors: false },
  { id: 16, name: 'Aice Family Pack', price: 170, category_id: 3, image_url: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400', has_flavors: false },
  
  // Desserts Products
  { id: 17, name: 'Mallows w/ Toppings', price: 10, category_id: 4, image_url: 'https://images.unsplash.com/photo-1587536849024-daaa4a417b16?w=400', has_flavors: false },
  { id: 18, name: 'Fingerstick w/ Toppings', price: 10, category_id: 4, image_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', has_flavors: false }
]

// Category emoji mapping
const categoryEmojis = {
  'Rice': '🍚',
  'French Fries': '🍟',
  'Ice Cream': '🍦',
  'Desserts': '🍰'
}

// Flavor options for fries
const FLAVOR_OPTIONS = ['Plain', 'BBQ', 'Cheese', 'Sour Cream']

const KioskView = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [placingOrder, setPlacingOrder] = useState(false)
  
  // Flavor selection modal state
  const [flavorModal, setFlavorModal] = useState({ open: false, product: null })
  const [selectedFlavor, setSelectedFlavor] = useState('Plain')

  // Load categories on mount
  useEffect(() => {
    loadCategories()
  }, [])

  // Load products when category changes
  useEffect(() => {
    if (selectedCategory) {
      loadProducts(selectedCategory)
    }
  }, [selectedCategory])

  const loadCategories = async () => {
    setLoading(true)
    
    if (DEMO_MODE) {
      // Use demo data
      setCategories(DEMO_CATEGORIES)
      setSelectedCategory(DEMO_CATEGORIES[0].id)
      setLoading(false)
      return
    }
    
    // Supabase fetch (when connected)
    try {
      const { supabase } = await import('../config/supabase')
      const { data, error } = await supabase.from('categories').select('*').order('name')
      if (!error && data) {
        setCategories(data)
        if (data.length > 0) {
          setSelectedCategory(data[0].id)
        }
      }
    } catch (err) {
      console.log('Using demo mode - Supabase not connected')
      setCategories(DEMO_CATEGORIES)
      setSelectedCategory(DEMO_CATEGORIES[0].id)
    }
    setLoading(false)
  }

  const loadProducts = async (categoryId) => {
    setProductsLoading(true)
    
    if (DEMO_MODE) {
      // Filter demo products by category
      const filtered = DEMO_PRODUCTS.filter(p => p.category_id === categoryId)
      setProducts(filtered)
      setProductsLoading(false)
      return
    }
    
    // Supabase fetch (when connected)
    try {
      const { supabase } = await import('../config/supabase')
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId)
        .order('name')
      if (!error) {
        setProducts(data || [])
      }
    } catch (err) {
      const filtered = DEMO_PRODUCTS.filter(p => p.category_id === categoryId)
      setProducts(filtered)
    }
    setProductsLoading(false)
  }

  // Check if product has flavor options (fries)
  const hasFlavorOptions = (product) => {
    return product.has_flavors === true
  }

  // Handle add to cart - show flavor modal if needed
  const handleAddToCart = (product) => {
    if (hasFlavorOptions(product)) {
      setFlavorModal({ open: true, product })
      setSelectedFlavor('Plain')
    } else {
      addToCart(product, null)
    }
  }

  // Add item to cart
  const addToCart = (product, flavor) => {
    setCart(prev => {
      // Create unique key for product+flavor combination
      const cartKey = flavor ? `${product.id}-${flavor}` : product.id
      const existing = prev.find(item => item.cartKey === cartKey)
      
      if (existing) {
        return prev.map(item =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { 
        ...product, 
        cartKey,
        quantity: 1, 
        flavor 
      }]
    })
    setFlavorModal({ open: false, product: null })
  }

  // Update quantity in cart
  const updateQuantity = (cartKey, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.cartKey === cartKey) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : null
        }
        return item
      }).filter(Boolean)
    })
  }

  // Remove item from cart
  const removeFromCart = (cartKey) => {
    setCart(prev => prev.filter(item => item.cartKey !== cartKey))
  }

  // Calculate totals
  const getCartTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const getCartItemCount = () => cart.reduce((sum, item) => sum + item.quantity, 0)

  // Get quantity for a specific product in cart (for display on product card)
  const getProductQuantity = (productId) => {
    return cart
      .filter(item => item.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0)
  }

  // Place order
  const placeOrder = async () => {
    if (cart.length === 0) return

    setPlacingOrder(true)
    try {
      // Create order object
      const newOrder = {
        id: Date.now(),
        created_at: new Date().toISOString(),
        status: 'pending',
        total: getCartTotal(),
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          flavor: item.flavor || null
        }))
      }

      // Save to localStorage for admin to see
      const existingOrders = JSON.parse(localStorage.getItem('biteflow_orders') || '[]')
      existingOrders.push(newOrder)
      localStorage.setItem('biteflow_orders', JSON.stringify(existingOrders))

      if (DEMO_MODE) {
        // Demo mode - just simulate order success
        await new Promise(resolve => setTimeout(resolve, 800))
        setOrderPlaced(true)
        setCart([])
        setIsCartOpen(false)
        setTimeout(() => setOrderPlaced(false), 3000)
        setPlacingOrder(false)
        return
      }

      // Supabase order creation
      const { supabase } = await import('../supabaseClient')
      
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({ total_amount: getCartTotal(), created_at: new Date().toISOString() })
        .select()
        .single()

      if (orderError) throw orderError

      const orderItems = cart.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
        flavor: item.flavor
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      setOrderPlaced(true)
      setCart([])
      setIsCartOpen(false)

      setTimeout(() => setOrderPlaced(false), 3000)
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setPlacingOrder(false)
    }
  }

  const clearCart = () => {
    setCart([])
    setIsCartOpen(false)
  }

  const formatPrice = (price) => `₱${price.toFixed(0)}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 pb-28">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white sticky top-0 z-40 shadow-xl">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg">
              <ChefHat className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">BiteFlow</h1>
              <p className="text-xs text-yellow-200 font-medium">Quick & Easy Ordering</p>
            </div>
          </div>
          <Link 
            to="/admin"
            className="w-11 h-11 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 active:scale-95 transition-all"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Category Bar - Horizontal Scrolling */}
      <nav className="bg-white sticky top-[60px] z-30 shadow-md border-b-2 border-yellow-400">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 p-3">
          {loading ? (
            <div className="flex items-center justify-center w-full py-2">
              <Loader2 className="w-6 h-6 text-red-600 animate-spin" />
            </div>
          ) : (
            categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all active:scale-95
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-200 scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <span className="text-xl">{categoryEmojis[category.name] || category.icon || '🍽️'}</span>
                <span>{category.name}</span>
              </button>
            ))
          )}
        </div>
      </nav>

      {/* Product Grid */}
      <main className="p-4">
        {productsLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-10 h-10 text-red-600 animate-spin mx-auto" />
              <p className="text-gray-500 mt-3">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-500 text-lg">No products in this category</p>
            <p className="text-gray-400 text-sm mt-1">Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products.map(product => {
              const quantity = getProductQuantity(product.id)
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] active:scale-[0.98] transition-all border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl">
                          {categoryEmojis[product.categories?.name] || '🍽️'}
                        </span>
                      </div>
                    )}
                    
                    {/* Quantity Badge */}
                    {quantity > 0 && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg animate-bounce-in">
                        {quantity}
                      </div>
                    )}

                    {/* Flavor indicator */}
                    {hasFlavorOptions(product) && (
                      <div className="absolute bottom-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold shadow">
                        +Flavors
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xl font-extrabold text-red-600">
                        {formatPrice(product.price)}
                      </span>
                      
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center text-red-700 hover:from-yellow-500 hover:to-yellow-600 shadow-lg shadow-yellow-200 active:scale-90 transition-all"
                      >
                        <Plus className="w-6 h-6" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Sticky Bottom Cart Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-yellow-400 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-50">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full px-4 py-4 flex items-center justify-between active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-7 h-7 text-white" />
                </div>
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-700 w-7 h-7 rounded-full text-sm font-extrabold flex items-center justify-center shadow-lg border-2 border-white">
                  {getCartItemCount()}
                </span>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800 text-lg">View Order</p>
                <p className="text-sm text-gray-500">{getCartItemCount()} items</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-2xl font-extrabold text-xl shadow-lg">
              {formatPrice(getCartTotal())}
            </div>
          </button>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-t-3xl max-h-[85vh] flex flex-col animate-slide-up shadow-2xl">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-red-600 to-red-500 text-white rounded-t-3xl">
              <div>
                <h2 className="text-xl font-extrabold">Your Order</h2>
                <p className="text-red-200 text-sm">{getCartItemCount()} items</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map(item => (
                <div
                  key={item.cartKey}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3 border border-gray-100"
                >
                  {/* Item Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 shadow-md">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl bg-gray-100">
                        {categoryEmojis[item.categories?.name] || '🍽️'}
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-sm truncate">
                      {item.name}
                    </h3>
                    {item.flavor && (
                      <p className="text-xs text-yellow-600 font-semibold">
                        🌶️ {item.flavor}
                      </p>
                    )}
                    <p className="text-red-600 font-extrabold text-lg">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.cartKey, -1)}
                      className="w-9 h-9 bg-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-300 active:scale-90 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-extrabold w-8 text-center text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartKey, 1)}
                      className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center hover:bg-yellow-500 active:scale-90 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.cartKey)}
                      className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center text-red-600 hover:bg-red-200 ml-1 active:scale-90 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t p-4 space-y-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-semibold">Total Amount</span>
                <span className="text-3xl font-extrabold text-red-600">
                  {formatPrice(getCartTotal())}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="flex-1 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100 active:scale-95 transition-all"
                >
                  Clear All
                </button>
                <button
                  onClick={placeOrder}
                  disabled={placingOrder}
                  className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 text-white font-extrabold text-lg hover:from-red-700 hover:to-red-600 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-red-200 active:scale-95 transition-all"
                >
                  {placingOrder ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Place Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flavor Selection Modal */}
      {flavorModal.open && flavorModal.product && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-bounce-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white shadow-lg">
                  {flavorModal.product.image_url ? (
                    <img
                      src={flavorModal.product.image_url}
                      alt={flavorModal.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🍟</div>
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-gray-800">{flavorModal.product.name}</h3>
                  <p className="text-red-600 font-bold text-xl">{formatPrice(flavorModal.product.price)}</p>
                </div>
              </div>
            </div>

            {/* Flavor Options */}
            <div className="p-4">
              <p className="font-bold text-gray-700 mb-3">Choose your flavor:</p>
              <div className="grid grid-cols-2 gap-2">
                {(flavorModal.product.flavor_options || FLAVOR_OPTIONS).map(flavor => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`py-3 px-4 rounded-xl font-bold text-sm transition-all active:scale-95
                      ${selectedFlavor === flavor
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0 flex gap-2">
              <button
                onClick={() => setFlavorModal({ open: false, product: null })}
                className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100 active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => addToCart(flavorModal.product, selectedFlavor)}
                className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-700 font-extrabold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add to Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Success Toast */}
      {orderPlaced && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce-in z-50">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="font-extrabold">Order Placed!</p>
            <p className="text-sm text-green-100">Thank you for your order</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default KioskView
