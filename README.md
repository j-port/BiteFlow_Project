# 🍔 BiteFlow: Mobile-First Food Kiosk & Management System

BiteFlow is a modern, responsive self-service kiosk system inspired by the McDonald's ordering experience. Built with React and Supabase, it allows users to browse menus by category (Rice, Fries, Ice Cream, Desserts) and place orders directly from their mobile web browser.

## ✨ Features

### 🛒 Customer Kiosk
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Category Navigation**: Horizontal scrolling category tabs
- **Product Grid**: Beautiful 2-column product layout with images
- **Flavor Selection**: Special flavor picker for French Fries (Plain, BBQ, Cheese, Sour Cream)
- **Real-Time Cart**: Dynamic cart with quantity adjustment
- **Order Placement**: Instant order submission to admin dashboard

### 📊 Admin Dashboard
- **Order Management**: Track orders through statuses (pending → preparing → completed)
- **Sales Analytics**: 
  - Today/Week/Month revenue tracking
  - Most bought products
  - Category sales breakdown
- **Product Management**: Add, edit, delete products with image upload
- **Category Management**: Organize menu categories with custom emojis
- **Real-Time Updates**: Auto-refresh orders every 3 seconds

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3.4
- **Backend**: Supabase (PostgreSQL + Storage)
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation

### Prerequisites
- Node.js 20.18+ 
- npm or yarn
- Supabase account

### 1. Clone the Repository
```bash
git clone https://github.com/j-port/BiteFlow_Project.git
cd BiteFlow_Project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your **Project URL** and **Anon/Public Key** from Settings > API

#### Run Database Schema
1. Open Supabase SQL Editor
2. Copy and paste contents from `supabase-schema.sql`
3. Click "Run" to create tables

#### Seed Initial Data (Optional)
1. In SQL Editor, run `seed-database.sql` 
2. This adds 4 categories and 18 products

#### Create Storage Bucket
1. Go to Storage in Supabase Dashboard
2. Create new bucket: `product-images`
3. Make it **Public**

### 4. Configure Environment Variables
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📱 Usage

### Customer View
- **URL**: `http://localhost:5173/`
- Browse products by category
- Add items to cart
- Select flavors for French Fries
- Place orders

### Admin Dashboard
- **URL**: `http://localhost:5173/admin`
- Manage incoming orders
- View sales analytics
- Add/edit products and categories

## 📂 Project Structure

```
biteflow/
├── src/
│   ├── components/
│   │   ├── KioskView.jsx       # Customer kiosk interface
│   │   └── AdminDashboard.jsx  # Admin management panel
│   ├── supabaseClient.js       # Supabase configuration & helpers
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx               # React entry point
│   └── index.css              # Tailwind CSS imports
├── supabase-schema.sql        # Database schema
├── seed-database.sql          # Sample data (optional)
├── .env                       # Environment variables (create this)
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies
```

## 🗄️ Database Schema

### Tables
- **categories**: Product categories with icons
- **products**: Menu items with prices, images, flavors
- **orders**: Customer orders with status tracking
- **order_items**: Individual items in each order

### Storage
- **product-images**: Public bucket for product photos

## 🎨 Customization

### Change Categories
1. Go to Admin Dashboard > Categories tab
2. Add/edit categories with custom emojis

### Update Products
1. Admin Dashboard > Products tab
2. Add products with images
3. Set prices and assign categories
4. Enable flavors for French Fries only

### Modify Flavor Options
Edit `KioskView.jsx` line 60:
```javascript
const FLAVOR_OPTIONS = ['Plain', 'BBQ', 'Cheese', 'Sour Cream']
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your GitHub repository
2. Set environment variables in hosting dashboard
3. Deploy from `main` branch

### Environment Variables for Production
```
VITE_SUPABASE_URL=your_production_url
VITE_SUPABASE_ANON_KEY=your_production_key
```

## 🔐 Security Notes

- Never commit `.env` file (already in `.gitignore`)
- Use Row Level Security (RLS) policies in Supabase
- Consider adding authentication for admin dashboard in production
- Enable CORS only for your domain

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**J-Port**
- GitHub: [@j-port](https://github.com/j-port)

## 🙏 Acknowledgments

- Inspired by McDonald's self-service kiosks
- Icons by [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)
- Built with [Supabase](https://supabase.com/)

---

**Made with ❤️ for food businesses**
