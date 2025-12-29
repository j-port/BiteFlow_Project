import { supabase } from './supabaseClient'

// Predefined categories with icons
export const SEED_CATEGORIES = [
  { name: 'Rice', icon: '🍚', sort_order: 1 },
  { name: 'French Fries', icon: '🍟', sort_order: 2 },
  { name: 'Ice Cream', icon: '🍦', sort_order: 3 },
  { name: 'Desserts', icon: '🍰', sort_order: 4 }
]

// Predefined products with sample online images
export const SEED_PRODUCTS = {
  'Rice': [
    {
      name: 'Well Milled Rice',
      price: 41,
      description: 'Premium quality well milled rice, perfect for everyday meals',
      image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Polotan Rice',
      price: 58,
      description: 'High-grade Polotan rice with excellent texture',
      image_url: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Premium Rice',
      price: 45,
      description: 'Top quality premium rice for special occasions',
      image_url: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Laon Rice',
      price: 36,
      description: 'Aged Laon rice with aromatic flavor',
      image_url: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&h=400&fit=crop',
      is_available: true
    }
  ],
  'French Fries': [
    {
      name: 'French Fries - Small',
      price: 10,
      description: 'Crispy golden fries - Small serving',
      image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop',
      is_available: true,
      has_flavors: true,
      flavor_options: ['Plain', 'BBQ', 'Cheese', 'Sour Cream']
    },
    {
      name: 'French Fries - Medium',
      price: 20,
      description: 'Crispy golden fries - Medium serving',
      image_url: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=400&fit=crop',
      is_available: true,
      has_flavors: true,
      flavor_options: ['Plain', 'BBQ', 'Cheese', 'Sour Cream']
    },
    {
      name: 'French Fries - Large',
      price: 30,
      description: 'Crispy golden fries - Large serving',
      image_url: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=400&fit=crop',
      is_available: true,
      has_flavors: true,
      flavor_options: ['Plain', 'BBQ', 'Cheese', 'Sour Cream']
    }
  ],
  'Ice Cream': [
    {
      name: 'Aice Milk Stick',
      price: 8,
      description: 'Classic milk-flavored ice cream stick',
      image_url: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Aice Choco Malt',
      price: 10,
      description: 'Rich chocolate malt ice cream',
      image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Aice Strawberry Crispy',
      price: 12,
      description: 'Strawberry ice cream with crispy coating',
      image_url: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Aice Mochi',
      price: 15,
      description: 'Japanese-style mochi ice cream',
      image_url: 'https://images.unsplash.com/photo-1631206753348-db44968fd440?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Aice Cone Chocolate',
      price: 18,
      description: 'Chocolate ice cream in a crispy cone',
      image_url: 'https://images.unsplash.com/photo-1560008581-09826d1de69e?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Aice Cone Vanilla',
      price: 18,
      description: 'Classic vanilla ice cream cone',
      image_url: 'https://images.unsplash.com/photo-1566454419290-57a64afe1e5b?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Aice Honeydew',
      price: 12,
      description: 'Refreshing honeydew melon ice cream',
      image_url: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Aice Watermelon',
      price: 10,
      description: 'Cool watermelon flavored ice bar',
      image_url: 'https://images.unsplash.com/photo-1633933358116-a27b902fad35?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Aice Duet Cookies',
      price: 20,
      description: 'Cookies and cream duo ice cream',
      image_url: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Aice Family Pack',
      price: 170,
      description: 'Large family-sized ice cream tub',
      image_url: 'https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=400&h=400&fit=crop',
      is_available: true
    }
  ],
  'Desserts': [
    {
      name: 'Mallows w/ Toppings',
      price: 10,
      description: 'Soft marshmallows with delicious toppings',
      image_url: 'https://images.unsplash.com/photo-1587536849024-daaa4a417b16?w=400&h=400&fit=crop',
      is_available: true
    },
    {
      name: 'Fingerstick w/ Toppings',
      price: 10,
      description: 'Crispy finger sticks with sweet toppings',
      image_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop',
      is_available: true
    }
  ]
}

// Flavor options for French Fries
export const FRIES_FLAVORS = ['Plain', 'BBQ', 'Cheese', 'Sour Cream']

/**
 * Seed the database with initial categories and products
 * WARNING: This will clear existing data!
 */
export const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...')

    // First, delete existing data (order matters due to foreign keys)
    console.log('🗑️ Clearing existing data...')
    await supabase.from('order_items').delete().neq('id', 0)
    await supabase.from('orders').delete().neq('id', 0)
    await supabase.from('products').delete().neq('id', 0)
    await supabase.from('categories').delete().neq('id', 0)

    // Insert categories
    console.log('📁 Creating categories...')
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .insert(SEED_CATEGORIES)
      .select()

    if (catError) throw catError
    console.log(`✅ Created ${categories.length} categories`)

    // Create a map of category names to IDs
    const categoryMap = {}
    categories.forEach(cat => {
      categoryMap[cat.name] = cat.id
    })

    // Insert products for each category
    console.log('🍔 Creating products...')
    let totalProducts = 0

    for (const [categoryName, products] of Object.entries(SEED_PRODUCTS)) {
      const categoryId = categoryMap[categoryName]
      if (!categoryId) {
        console.warn(`⚠️ Category "${categoryName}" not found, skipping products`)
        continue
      }

      const productsWithCategory = products.map(p => ({
        ...p,
        category_id: categoryId
      }))

      const { data: insertedProducts, error: prodError } = await supabase
        .from('products')
        .insert(productsWithCategory)
        .select()

      if (prodError) throw prodError
      totalProducts += insertedProducts.length
      console.log(`  ✅ ${categoryName}: ${insertedProducts.length} products`)
    }

    console.log(`\n🎉 Database seeded successfully!`)
    console.log(`   📁 ${categories.length} categories`)
    console.log(`   🍔 ${totalProducts} products`)

    return { success: true, categories: categories.length, products: totalProducts }
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    return { success: false, error }
  }
}

/**
 * Check if database has been seeded
 */
export const isDatabaseSeeded = async () => {
  try {
    const { data: categories } = await supabase
      .from('categories')
      .select('id')
      .limit(1)
    
    const { data: products } = await supabase
      .from('products')
      .select('id')
      .limit(1)

    return (categories?.length > 0) && (products?.length > 0)
  } catch {
    return false
  }
}
