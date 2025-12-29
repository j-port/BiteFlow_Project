import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  LayoutDashboard,
  Package,
  Tags,
  TrendingUp,
  DollarSign,
  Calendar,
  Award,
  Plus,
  Trash2,
  Upload,
  Loader2,
  X,
  ChefHat,
  ArrowLeft,
  Image as ImageIcon,
  ShoppingBag,
  Edit3,
  Save,
  BarChart3,
  Clock,
  CalendarDays,
  RefreshCw,
  ClipboardList,
  CheckCircle,
  AlertCircle,
  Timer
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

// Demo Products
const DEMO_PRODUCTS = [
  { id: 1, name: 'Well Milled', price: 41, category_id: 1, categories: { name: 'Rice' }, image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', has_flavors: false },
  { id: 2, name: 'Polotan', price: 58, category_id: 1, categories: { name: 'Rice' }, image_url: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400', has_flavors: false },
  { id: 3, name: 'Premium', price: 45, category_id: 1, categories: { name: 'Rice' }, image_url: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=400', has_flavors: false },
  { id: 4, name: 'Laon', price: 36, category_id: 1, categories: { name: 'Rice' }, image_url: 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=400', has_flavors: false },
  { id: 5, name: 'Small Fries', price: 10, category_id: 2, categories: { name: 'French Fries' }, image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', has_flavors: true },
  { id: 6, name: 'Medium Fries', price: 20, category_id: 2, categories: { name: 'French Fries' }, image_url: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400', has_flavors: true },
  { id: 7, name: 'Large Fries', price: 30, category_id: 2, categories: { name: 'French Fries' }, image_url: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400', has_flavors: true },
  { id: 8, name: 'Aice Milk Stick', price: 8, category_id: 3, categories: { name: 'Ice Cream' }, image_url: 'https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=400', has_flavors: false },
  { id: 9, name: 'Aice Choco Malt', price: 10, category_id: 3, categories: { name: 'Ice Cream' }, image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', has_flavors: false },
  { id: 10, name: 'Aice Strawberry Crispy', price: 12, category_id: 3, categories: { name: 'Ice Cream' }, image_url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400', has_flavors: false },
  { id: 11, name: 'Aice Mochi', price: 15, category_id: 3, categories: { name: 'Ice Cream' }, image_url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400', has_flavors: false },
  { id: 12, name: 'Aice Cone Chocolate', price: 18, category_id: 3, categories: { name: 'Ice Cream' }, image_url: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400', has_flavors: false },
  { id: 13, name: 'Aice Sundae Cup', price: 20, category_id: 3, categories: { name: 'Ice Cream' }, image_url: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400', has_flavors: false },
  { id: 14, name: 'Aice Sweet Corn', price: 10, category_id: 3, categories: { name: 'Ice Cream' }, image_url: 'https://images.unsplash.com/photo-1633933358116-a27b902fad35?w=400', has_flavors: false },
  { id: 15, name: 'Aice Watermelon', price: 8, category_id: 3, categories: { name: 'Ice Cream' }, image_url: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=400', has_flavors: false },
  { id: 16, name: 'Aice Family Pack', price: 170, category_id: 3, categories: { name: 'Ice Cream' }, image_url: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400', has_flavors: false },
  { id: 17, name: 'Mallows w/ Toppings', price: 10, category_id: 4, categories: { name: 'Desserts' }, image_url: 'https://images.unsplash.com/photo-1587536849024-daaa4a417b16?w=400', has_flavors: false },
  { id: 18, name: 'Fingerstick w/ Toppings', price: 10, category_id: 4, categories: { name: 'Desserts' }, image_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', has_flavors: false }
]

// Demo analytics data
const DEMO_REVENUE = {
  today: 1250,
  week: 8750,
  month: 35200,
  todayOrders: 45,
  weekOrders: 312,
  monthOrders: 1245
}

const DEMO_MOST_BOUGHT = [
  { id: 1, name: 'Well Milled', price: 41, total_sold: 156, image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' },
  { id: 5, name: 'Small Fries', price: 10, total_sold: 134, image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400' },
  { id: 9, name: 'Aice Choco Malt', price: 10, total_sold: 98, image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400' },
  { id: 8, name: 'Aice Milk Stick', price: 8, total_sold: 87, image_url: 'https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=400' },
  { id: 6, name: 'Medium Fries', price: 20, total_sold: 76, image_url: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400' }
]

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders')
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null)
  
  // Analytics state
  const [revenueStats, setRevenueStats] = useState({
    today: 0, week: 0, month: 0,
    todayOrders: 0, weekOrders: 0, monthOrders: 0
  })
  const [mostBought, setMostBought] = useState([])
  const [categorySales, setCategorySales] = useState([])

  // Product form state
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category_id: '',
    description: '',
    flavor_options: []
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Category form state
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [categoryForm, setCategoryForm] = useState({ name: '', icon: '🍽️' })

  // Flavor input state
  const [flavorInput, setFlavorInput] = useState('')

  useEffect(() => {
    fetchData()
    loadOrders()
    
    // Listen for new orders from localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'biteflow_orders') {
        loadOrders()
      }
    }
    window.addEventListener('storage', handleStorageChange)
    
    // Also poll for changes every 3 seconds (for same-tab updates)
    const interval = setInterval(loadOrders, 3000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const loadOrders = () => {
    const savedOrders = localStorage.getItem('biteflow_orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    )
    setOrders(updatedOrders)
    localStorage.setItem('biteflow_orders', JSON.stringify(updatedOrders))
  }

  const deleteOrder = (orderId) => {
    if (!confirm('Delete this order?')) return
    const updatedOrders = orders.filter(order => order.id !== orderId)
    setOrders(updatedOrders)
    localStorage.setItem('biteflow_orders', JSON.stringify(updatedOrders))
  }

  const fetchData = async () => {
    setLoading(true)
    await Promise.all([
      loadCategories(),
      loadProducts(),
      loadAnalytics()
    ])
    setLoading(false)
  }

  const loadCategories = async () => {
    if (DEMO_MODE) {
      setCategories(DEMO_CATEGORIES)
      return
    }
    try {
      const { supabase } = await import('../config/supabase')
      const { data } = await supabase.from('categories').select('*').order('name')
      setCategories(data || [])
    } catch {
      setCategories(DEMO_CATEGORIES)
    }
  }

  const loadProducts = async () => {
    if (DEMO_MODE) {
      setProducts(DEMO_PRODUCTS)
      return
    }
    try {
      const { supabase } = await import('../config/supabase')
      const { data } = await supabase.from('products').select('*, categories(name)').order('name')
      setProducts(data || [])
    } catch {
      setProducts(DEMO_PRODUCTS)
    }
  }

  const loadAnalytics = () => {
    // Get completed orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('biteflow_orders') || '[]')
    const completedOrders = savedOrders.filter(o => o.status === 'completed')

    // Calculate date ranges
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(todayStart)
    weekStart.setDate(todayStart.getDate() - todayStart.getDay())
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    // Filter orders by date
    const todayOrders = completedOrders.filter(o => new Date(o.created_at) >= todayStart)
    const weekOrders = completedOrders.filter(o => new Date(o.created_at) >= weekStart)
    const monthOrders = completedOrders.filter(o => new Date(o.created_at) >= monthStart)

    // Calculate revenue
    setRevenueStats({
      today: todayOrders.reduce((sum, o) => sum + o.total, 0),
      week: weekOrders.reduce((sum, o) => sum + o.total, 0),
      month: monthOrders.reduce((sum, o) => sum + o.total, 0),
      todayOrders: todayOrders.length,
      weekOrders: weekOrders.length,
      monthOrders: monthOrders.length
    })

    // Calculate most bought items from completed orders
    const itemCounts = {}
    completedOrders.forEach(order => {
      order.items.forEach(item => {
        if (!itemCounts[item.id]) {
          // Find product details from DEMO_PRODUCTS
          const product = DEMO_PRODUCTS.find(p => p.id === item.id) || {}
          itemCounts[item.id] = {
            id: item.id,
            name: item.name,
            price: item.price,
            total_sold: 0,
            total_revenue: 0,
            image_url: product.image_url || '',
            category_id: product.category_id,
            category_name: product.categories?.name || 'Other'
          }
        }
        itemCounts[item.id].total_sold += item.quantity
        itemCounts[item.id].total_revenue += item.price * item.quantity
      })
    })

    // Sort by quantity sold
    const sortedItems = Object.values(itemCounts).sort((a, b) => b.total_sold - a.total_sold)
    setMostBought(sortedItems.slice(0, 10))

    // Calculate category sales
    const catSales = {}
    DEMO_CATEGORIES.forEach(cat => {
      catSales[cat.id] = {
        id: cat.id,
        name: cat.name,
        total_sold: 0,
        total_revenue: 0
      }
    })

    completedOrders.forEach(order => {
      order.items.forEach(item => {
        const product = DEMO_PRODUCTS.find(p => p.id === item.id)
        if (product && catSales[product.category_id]) {
          catSales[product.category_id].total_sold += item.quantity
          catSales[product.category_id].total_revenue += item.price * item.quantity
        }
      })
    })

    setCategorySales(Object.values(catSales).sort((a, b) => b.total_revenue - a.total_revenue))
  }

  // Refresh analytics when orders change
  useEffect(() => {
    loadAnalytics()
  }, [orders])

  // Image handling
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  // Add/Edit Product
  const handleSubmitProduct = async (e) => {
    e.preventDefault()
    if (!productForm.name || !productForm.price || !productForm.category_id) {
      alert('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    
    if (DEMO_MODE) {
      // Demo mode - add to local state
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: productForm.name,
        price: parseFloat(productForm.price),
        category_id: parseInt(productForm.category_id),
        categories: categories.find(c => c.id === parseInt(productForm.category_id)),
        image_url: imagePreview || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        has_flavors: productForm.flavor_options.length > 0
      }
      
      if (editingProduct) {
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...newProduct, id: editingProduct.id } : p))
      } else {
        setProducts(prev => [...prev, newProduct])
      }
      
      resetProductForm()
      setSubmitting(false)
      return
    }

    // Supabase product creation would go here
    setSubmitting(false)
  }

  const resetProductForm = () => {
    setProductForm({ name: '', price: '', category_id: '', description: '', flavor_options: [] })
    setImageFile(null)
    setImagePreview(null)
    setShowProductForm(false)
    setEditingProduct(null)
    setFlavorInput('')
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      category_id: product.category_id,
      description: product.description || '',
      flavor_options: product.flavor_options || []
    })
    setImagePreview(product.image_url)
    setShowProductForm(true)
  }

  const handleDeleteProduct = async (product) => {
    if (!confirm(`Delete "${product.name}"?`)) return

    if (DEMO_MODE) {
      setProducts(prev => prev.filter(p => p.id !== product.id))
      return
    }

    // Supabase delete would go here
  }

  // Category handling
  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!categoryForm.name.trim()) return

    if (DEMO_MODE) {
      const newCategory = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        name: categoryForm.name,
        icon: categoryForm.icon
      }
      setCategories(prev => [...prev, newCategory])
      setCategoryForm({ name: '', icon: '🍽️' })
      setShowCategoryForm(false)
      return
    }

    // Supabase create would go here
  }

  const handleDeleteCategory = async (category) => {
    if (!confirm(`Delete category "${category.name}"? Products in this category will be uncategorized.`)) return

    if (DEMO_MODE) {
      setCategories(prev => prev.filter(c => c.id !== category.id))
      return
    }

    // Supabase delete would go here
  }

  // Flavor options handling
  const addFlavor = () => {
    if (flavorInput.trim() && !productForm.flavor_options.includes(flavorInput.trim())) {
      setProductForm(prev => ({
        ...prev,
        flavor_options: [...prev.flavor_options, flavorInput.trim()]
      }))
      setFlavorInput('')
    }
  }

  const removeFlavor = (flavor) => {
    setProductForm(prev => ({
      ...prev,
      flavor_options: prev.flavor_options.filter(f => f !== flavor)
    }))
  }

  const formatPrice = (price) => `₱${Number(price).toFixed(0)}`

  const getCategoryName = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.name || 'Uncategorized'
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white sticky top-0 z-40 shadow-xl">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              to="/"
              className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold">BiteFlow Admin</h1>
              <p className="text-xs text-gray-400">Management Dashboard</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <ChefHat className="w-5 h-5 text-gray-800" />
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white sticky top-[60px] z-30 shadow-md">
        <div className="flex">
          {[
            { id: 'orders', icon: ClipboardList, label: 'Orders', badge: orders.filter(o => o.status === 'pending').length },
            { id: 'insights', icon: BarChart3, label: 'Sales' },
            { id: 'products', icon: Package, label: 'Products' },
            { id: 'categories', icon: Tags, label: 'Categories' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 flex flex-col items-center gap-1 font-medium text-xs border-b-3 transition-all relative
                ${activeTab === tab.id
                  ? 'border-red-600 text-red-600 bg-red-50'
                  : 'border-transparent text-gray-500 hover:bg-gray-50'
                }`}
            >
              <div className="relative">
                <tab.icon className="w-5 h-5" />
                {tab.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="p-4 pb-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-10 h-10 text-red-600 animate-spin mx-auto" />
              <p className="text-gray-500 mt-3">Loading dashboard...</p>
            </div>
          </div>
        ) : activeTab === 'orders' ? (
          /* ==================== ORDERS TAB ==================== */
          <div className="space-y-4">
            {/* Order Stats Summary */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-yellow-100 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-700">
                  <Timer className="w-4 h-4" />
                  <span className="text-xl font-bold">{orders.filter(o => o.status === 'pending').length}</span>
                </div>
                <p className="text-xs text-yellow-600 font-medium">Pending</p>
              </div>
              <div className="bg-blue-100 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-blue-700">
                  <Clock className="w-4 h-4" />
                  <span className="text-xl font-bold">{orders.filter(o => o.status === 'preparing').length}</span>
                </div>
                <p className="text-xs text-blue-600 font-medium">Preparing</p>
              </div>
              <div className="bg-green-100 rounded-xl p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xl font-bold">{orders.filter(o => o.status === 'completed').length}</span>
                </div>
                <p className="text-xs text-green-600 font-medium">Completed</p>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={loadOrders}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 active:scale-[0.98] transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Orders
            </button>

            {/* Orders List */}
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-md">
                <ClipboardList className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 font-medium">No orders yet</p>
                <p className="text-gray-400 text-sm mt-1">Orders will appear here when customers place them</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.slice().reverse().map(order => (
                  <div key={order.id} className={`bg-white rounded-2xl shadow-md overflow-hidden border-l-4 ${
                    order.status === 'pending' ? 'border-yellow-500' :
                    order.status === 'preparing' ? 'border-blue-500' :
                    'border-green-500'
                  }`}>
                    {/* Order Header */}
                    <div className="p-4 border-b bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-800">Order #{order.id.toString().slice(-6).toUpperCase()}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.created_at).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {order.status === 'pending' ? '⏳ Pending' :
                           order.status === 'preparing' ? '👨‍🍳 Preparing' :
                           '✅ Completed'}
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-4 space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="bg-gray-100 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                              {item.quantity}
                            </span>
                            <span className="text-gray-700">{item.name}</span>
                            {item.flavor && (
                              <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                                {item.flavor}
                              </span>
                            )}
                          </div>
                          <span className="font-semibold text-gray-800">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 mt-2 flex items-center justify-between">
                        <span className="font-bold text-gray-800">Total</span>
                        <span className="text-xl font-extrabold text-red-600">{formatPrice(order.total)}</span>
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="p-4 pt-0 flex gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 active:scale-[0.98] transition-all"
                        >
                          <Clock className="w-4 h-4" />
                          Start Preparing
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="flex-1 py-3 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 active:scale-[0.98] transition-all"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark Complete
                        </button>
                      )}
                      {order.status === 'completed' && (
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-300 active:scale-[0.98] transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                          Clear Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : activeTab === 'insights' ? (
          /* ==================== SALES INSIGHTS TAB ==================== */
          <div className="space-y-6">
            {/* Revenue Cards */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Revenue Overview
              </h2>
              <div className="grid gap-3">
                {/* Today */}
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-green-100 text-sm">Today</p>
                        <p className="text-3xl font-extrabold">{formatPrice(revenueStats.today)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{revenueStats.todayOrders}</p>
                      <p className="text-green-100 text-xs">orders</p>
                    </div>
                  </div>
                </div>

                {/* This Week */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-blue-100 text-sm">This Week</p>
                        <p className="text-3xl font-extrabold">{formatPrice(revenueStats.week)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{revenueStats.weekOrders}</p>
                      <p className="text-blue-100 text-xs">orders</p>
                    </div>
                  </div>
                </div>

                {/* This Month */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <CalendarDays className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-purple-100 text-sm">This Month</p>
                        <p className="text-3xl font-extrabold">{formatPrice(revenueStats.month)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{revenueStats.monthOrders}</p>
                      <p className="text-purple-100 text-xs">orders</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Most Bought Items */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Most Bought Food
              </h2>
              
              {mostBought.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow-md">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500 font-medium">No sales data yet</p>
                  <p className="text-gray-400 text-sm mt-1">Complete some orders to see rankings</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {mostBought.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-3 shadow-md flex items-center gap-3"
                    >
                      {/* Rank */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-white shadow-lg
                        ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 
                          index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' : 
                          index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-700' : 
                          'bg-gray-300'}`}
                      >
                        {index + 1}
                      </div>

                      {/* Image */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {item.image_url ? (
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl">🍽️</div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item.category_name}</p>
                      </div>

                      {/* Stats */}
                      <div className="text-right">
                        <p className="text-lg font-extrabold text-red-600">{item.total_sold}</p>
                        <p className="text-xs text-gray-500">sold</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Category Sales */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Tags className="w-5 h-5 text-blue-500" />
                Sales by Category
              </h2>
              
              {categorySales.length === 0 || categorySales.every(c => c.total_sold === 0) ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow-md">
                  <Tags className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500 font-medium">No category data yet</p>
                  <p className="text-gray-400 text-sm mt-1">Complete orders to see category breakdown</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {categorySales.map((cat) => {
                    const colors = {
                      'Rice': 'from-amber-500 to-amber-600',
                      'French Fries': 'from-yellow-500 to-yellow-600',
                      'Ice Cream': 'from-cyan-500 to-cyan-600',
                      'Desserts': 'from-pink-500 to-pink-600'
                    }
                    const icons = {
                      'Rice': '🍚',
                      'French Fries': '🍟',
                      'Ice Cream': '🍦',
                      'Desserts': '🍰'
                    }
                    return (
                      <div
                        key={cat.id}
                        className={`bg-gradient-to-r ${colors[cat.name] || 'from-gray-500 to-gray-600'} rounded-2xl p-4 text-white shadow-lg`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{icons[cat.name] || '🍽️'}</span>
                          <span className="font-bold text-sm">{cat.name}</span>
                        </div>
                        <p className="text-2xl font-extrabold">{formatPrice(cat.total_revenue)}</p>
                        <p className="text-white/80 text-xs">{cat.total_sold} items sold</p>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>

            {/* Refresh Button */}
            <button
              onClick={loadAnalytics}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-200 active:scale-[0.98] transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Sales Data
            </button>
          </div>
        ) : activeTab === 'products' ? (
          /* ==================== PRODUCTS TAB ==================== */
          <div className="space-y-4">
            {/* Add Product Button */}
            <button
              onClick={() => setShowProductForm(true)}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:from-red-700 hover:to-red-600 active:scale-[0.98] transition-all"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </button>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <button
                onClick={() => setSelectedCategoryFilter(null)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategoryFilter === null
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 shadow-md hover:bg-gray-50'
                }`}
              >
                All ({products.length})
              </button>
              {categories.map(cat => {
                const count = products.filter(p => p.category_id === cat.id).length
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryFilter(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      selectedCategoryFilter === cat.id
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-white text-gray-600 shadow-md hover:bg-gray-50'
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                )
              })}
            </div>

            {/* Products List */}
            {products.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-md">
                <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 font-medium">No products yet</p>
                <p className="text-gray-400 text-sm mt-1">Add your first product</p>
              </div>
            ) : (
              <div className="space-y-3">
                {products
                  .filter(p => selectedCategoryFilter === null || p.category_id === selectedCategoryFilter)
                  .map(product => (
                  <div key={product.id} className="bg-white rounded-2xl p-3 shadow-md flex items-center gap-3">
                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 truncate">{product.name}</h3>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold mt-1 ${
                        getCategoryName(product.category_id) === 'Rice' ? 'bg-amber-100 text-amber-700' :
                        getCategoryName(product.category_id) === 'French Fries' ? 'bg-yellow-100 text-yellow-700' :
                        getCategoryName(product.category_id) === 'Ice Cream' ? 'bg-blue-100 text-blue-700' :
                        getCategoryName(product.category_id) === 'Desserts' ? 'bg-pink-100 text-pink-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {getCategoryName(product.category_id)}
                      </span>
                      <p className="text-red-600 font-extrabold mt-1">{formatPrice(product.price)}</p>
                      {product.has_flavors && (
                        <p className="text-xs text-yellow-600">🍟 Has flavor options</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 hover:bg-blue-200 active:scale-90 transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product)}
                        className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 hover:bg-red-200 active:scale-90 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ==================== CATEGORIES TAB ==================== */
          <div className="space-y-4">
            {/* Add Category Button */}
            <button
              onClick={() => setShowCategoryForm(true)}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-800 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:from-yellow-600 hover:to-yellow-500 active:scale-[0.98] transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>

            {/* Demo Mode Notice */}
            {DEMO_MODE && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
                <p className="text-blue-700 font-medium text-sm">
                  📱 Demo Mode Active - Data is stored locally
                </p>
              </div>
            )}

            {/* Categories List */}
            {categories.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-md">
                <Tags className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 font-medium">No categories yet</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {categories.map(category => (
                  <div key={category.id} className="bg-white rounded-2xl p-4 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                        {category.icon || '🍽️'}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{category.name}</h3>
                        <p className="text-xs text-gray-500">
                          {products.filter(p => p.category_id === category.id).length} products
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 hover:bg-red-200 active:scale-90 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ==================== ADD/EDIT PRODUCT MODAL ==================== */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-t-3xl max-h-[90vh] flex flex-col animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-red-600 to-red-500 text-white rounded-t-3xl">
              <h2 className="text-lg font-bold">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={resetProductForm} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitProduct} className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
                {imagePreview ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(null); }}
                      className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50">
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500 font-medium">Tap to upload image</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 outline-none transition-colors"
                  placeholder="e.g., Well Milled Rice"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price (₱) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 outline-none transition-colors"
                  placeholder="0"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                <select
                  value={productForm.category_id}
                  onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 outline-none transition-colors bg-white"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Flavor Options - Only show for French Fries (category_id: 2) */}
              {parseInt(productForm.category_id) === 2 && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Flavor Options (for Fries)</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={flavorInput}
                    onChange={(e) => setFlavorInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFlavor())}
                    className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-yellow-500 outline-none"
                    placeholder="e.g., BBQ"
                  />
                  <button
                    type="button"
                    onClick={addFlavor}
                    className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-xl font-bold"
                  >
                    Add
                  </button>
                </div>
                {productForm.flavor_options.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {productForm.flavor_options.map(flavor => (
                      <span
                        key={flavor}
                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium flex items-center gap-1"
                      >
                        {flavor}
                        <button type="button" onClick={() => removeFlavor(flavor)} className="hover:text-red-600">
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 outline-none resize-none"
                  rows={2}
                  placeholder="Optional description"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {submitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="w-5 h-5" /> {editingProduct ? 'Update Product' : 'Add Product'}</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== ADD CATEGORY MODAL ==================== */}
      {showCategoryForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-bounce-in">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4">
              <h2 className="text-lg font-bold text-gray-800">Add Category</h2>
            </div>
            <form onSubmit={handleAddCategory} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 outline-none"
                  placeholder="e.g., Beverages"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Icon (emoji)</label>
                <input
                  type="text"
                  value={categoryForm.icon}
                  onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 outline-none text-center text-2xl"
                  maxLength={2}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowCategoryForm(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 font-bold"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
