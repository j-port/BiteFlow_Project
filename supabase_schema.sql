-- =============================================
-- BITEFLOW DATABASE SCHEMA FOR SUPABASE
-- Run this in the Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. CATEGORIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(10) DEFAULT '🍽️',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, icon, sort_order) VALUES
    ('Rice', '🍚', 1),
    ('French Fries', '🍟', 2),
    ('Ice Cream', '🍦', 3),
    ('Desserts', '🍰', 4)
ON CONFLICT (name) DO NOTHING;

-- =============================================
-- 2. PRODUCTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    image_url TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    flavor_options TEXT[], -- For items like fries with flavor choices
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster category lookups
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);

-- =============================================
-- 3. ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending',
    customer_name VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for date-based queries (analytics)
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- =============================================
-- 4. ORDER_ITEMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    flavor VARCHAR(50), -- Selected flavor for items like fries
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- =============================================
-- 5. INSERT SAMPLE PRODUCTS
-- =============================================

-- Rice Products
INSERT INTO products (name, price, category_id, description) 
SELECT 'Well Milled', 41, id, 'Quality well-milled rice' FROM categories WHERE name = 'Rice';

INSERT INTO products (name, price, category_id, description) 
SELECT 'Polotan', 58, id, 'Premium polotan rice' FROM categories WHERE name = 'Rice';

INSERT INTO products (name, price, category_id, description) 
SELECT 'Premium', 45, id, 'Premium grade rice' FROM categories WHERE name = 'Rice';

INSERT INTO products (name, price, category_id, description) 
SELECT 'Laon', 36, id, 'Aged laon rice' FROM categories WHERE name = 'Rice';

-- French Fries Products (with flavor options)
INSERT INTO products (name, price, category_id, description, flavor_options) 
SELECT 'Small Fries', 10, id, 'Crispy small fries', ARRAY['Plain', 'BBQ', 'Cheese', 'Sour Cream'] FROM categories WHERE name = 'French Fries';

INSERT INTO products (name, price, category_id, description, flavor_options) 
SELECT 'Medium Fries', 20, id, 'Crispy medium fries', ARRAY['Plain', 'BBQ', 'Cheese', 'Sour Cream'] FROM categories WHERE name = 'French Fries';

INSERT INTO products (name, price, category_id, description, flavor_options) 
SELECT 'Large Fries', 30, id, 'Crispy large fries', ARRAY['Plain', 'BBQ', 'Cheese', 'Sour Cream'] FROM categories WHERE name = 'French Fries';

-- Ice Cream Products (Aice brand)
INSERT INTO products (name, price, category_id, description) 
SELECT 'Milk Stick', 8, id, 'Aice Milk Stick' FROM categories WHERE name = 'Ice Cream';

INSERT INTO products (name, price, category_id, description) 
SELECT 'Choco Malt', 10, id, 'Aice Choco Malt' FROM categories WHERE name = 'Ice Cream';

INSERT INTO products (name, price, category_id, description) 
SELECT 'Strawberry Crisp', 12, id, 'Aice Strawberry Crisp' FROM categories WHERE name = 'Ice Cream';

INSERT INTO products (name, price, category_id, description) 
SELECT 'Mango Slush', 15, id, 'Aice Mango Slush' FROM categories WHERE name = 'Ice Cream';

INSERT INTO products (name, price, category_id, description) 
SELECT 'Chocolate Cone', 20, id, 'Aice Chocolate Cone' FROM categories WHERE name = 'Ice Cream';

INSERT INTO products (name, price, category_id, description) 
SELECT 'Vanilla Cup', 25, id, 'Aice Vanilla Cup' FROM categories WHERE name = 'Ice Cream';

INSERT INTO products (name, price, category_id, description) 
SELECT 'Sundae Mix', 35, id, 'Aice Sundae Mix' FROM categories WHERE name = 'Ice Cream';

INSERT INTO products (name, price, category_id, description) 
SELECT 'Ice Cream Cake', 170, id, 'Aice Ice Cream Cake' FROM categories WHERE name = 'Ice Cream';

-- Desserts Products
INSERT INTO products (name, price, category_id, description) 
SELECT 'Mallows w/ Toppings', 10, id, 'Sweet mallows with assorted toppings' FROM categories WHERE name = 'Desserts';

INSERT INTO products (name, price, category_id, description) 
SELECT 'Fingerstick w/ Toppings', 10, id, 'Crispy fingersticks with toppings' FROM categories WHERE name = 'Desserts';

-- =============================================
-- 6. STORAGE BUCKET SETUP (Run in Supabase Dashboard)
-- =============================================
-- Go to Storage > Create new bucket
-- Name: product-images
-- Public: Yes (enable public access)
-- File size limit: 5MB
-- Allowed MIME types: image/jpeg, image/png, image/webp, image/gif

-- Storage Policy for public read access:
-- CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
-- CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
-- CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE USING (bucket_id = 'product-images');

-- =============================================
-- 7. ROW LEVEL SECURITY (Optional but recommended)
-- =============================================
-- Enable RLS on tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access to categories and products
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);

-- Allow public insert on orders (for kiosk)
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read orders" ON orders FOR SELECT USING (true);

-- Allow public operations on order_items
CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read order_items" ON order_items FOR SELECT USING (true);

-- =============================================
-- 8. USEFUL VIEWS FOR ANALYTICS
-- =============================================

-- View for most bought products
CREATE OR REPLACE VIEW most_bought_products AS
SELECT 
    p.id,
    p.name,
    p.price,
    p.image_url,
    c.name as category_name,
    COALESCE(SUM(oi.quantity), 0) as total_sold,
    COALESCE(SUM(oi.subtotal), 0) as total_revenue
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name, p.price, p.image_url, c.name
ORDER BY total_sold DESC;

-- View for daily sales
CREATE OR REPLACE VIEW daily_sales AS
SELECT 
    DATE(created_at) as sale_date,
    COUNT(*) as order_count,
    SUM(total_amount) as daily_revenue
FROM orders
GROUP BY DATE(created_at)
ORDER BY sale_date DESC;

-- =============================================
-- END OF SCHEMA
-- =============================================
