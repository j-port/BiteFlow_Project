-- =============================================
-- BiteFlow Database Seed Data
-- Run this in Supabase SQL Editor after running supabase-schema.sql
-- =============================================

-- Insert Categories
INSERT INTO categories (name, icon, sort_order) VALUES
('Rice', '🍚', 1),
('French Fries', '🍟', 2),
('Ice Cream', '🍦', 3),
('Desserts', '🍰', 4);

-- Get category IDs (we'll use these in products)
-- Rice = category 1, French Fries = category 2, Ice Cream = category 3, Desserts = category 4

-- Insert Products
INSERT INTO products (name, price, category_id, image_url, has_flavors, is_available) VALUES
-- Rice Products
('Well Milled', 41, (SELECT id FROM categories WHERE name = 'Rice'), 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', false, true),
('Polotan', 58, (SELECT id FROM categories WHERE name = 'Rice'), 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400', false, true),
('Premium', 45, (SELECT id FROM categories WHERE name = 'Rice'), 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=400', false, true),
('Laon', 36, (SELECT id FROM categories WHERE name = 'Rice'), 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=400', false, true),

-- French Fries Products (with flavors)
('Small Fries', 10, (SELECT id FROM categories WHERE name = 'French Fries'), 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', true, true),
('Medium Fries', 20, (SELECT id FROM categories WHERE name = 'French Fries'), 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400', true, true),
('Large Fries', 30, (SELECT id FROM categories WHERE name = 'French Fries'), 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400', true, true),

-- Ice Cream Products (Aice brand)
('Aice Milk Stick', 8, (SELECT id FROM categories WHERE name = 'Ice Cream'), 'https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=400', false, true),
('Aice Choco Malt', 10, (SELECT id FROM categories WHERE name = 'Ice Cream'), 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', false, true),
('Aice Strawberry Crispy', 12, (SELECT id FROM categories WHERE name = 'Ice Cream'), 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400', false, true),
('Aice Mochi', 15, (SELECT id FROM categories WHERE name = 'Ice Cream'), 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400', false, true),
('Aice Cone Chocolate', 18, (SELECT id FROM categories WHERE name = 'Ice Cream'), 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400', false, true),
('Aice Sundae Cup', 20, (SELECT id FROM categories WHERE name = 'Ice Cream'), 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400', false, true),
('Aice Sweet Corn', 10, (SELECT id FROM categories WHERE name = 'Ice Cream'), 'https://images.unsplash.com/photo-1633933358116-a27b902fad35?w=400', false, true),
('Aice Watermelon', 8, (SELECT id FROM categories WHERE name = 'Ice Cream'), 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=400', false, true),
('Aice Family Pack', 170, (SELECT id FROM categories WHERE name = 'Ice Cream'), 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=400', false, true),

-- Desserts Products
('Mallows w/ Toppings', 10, (SELECT id FROM categories WHERE name = 'Desserts'), 'https://images.unsplash.com/photo-1587536849024-daaa4a417b16?w=400', false, true),
('Fingerstick w/ Toppings', 10, (SELECT id FROM categories WHERE name = 'Desserts'), 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400', false, true);

-- Add flavor options to French Fries
UPDATE products 
SET flavor_options = ARRAY['Plain', 'BBQ', 'Cheese', 'Sour Cream']
WHERE name IN ('Small Fries', 'Medium Fries', 'Large Fries');

-- Verify the data
SELECT 'Categories inserted:' as status, COUNT(*) as count FROM categories;
SELECT 'Products inserted:' as status, COUNT(*) as count FROM products;
