import { TemplateCard } from '../components/template-card/template-card.component';

export const TEMPLATES: TemplateCard[] = [
  // Restaurant Templates
  {
    id: 'restaurant-1',
    name: 'Fine Dining Experience',
    description: 'Elegant restaurant template with sophisticated design for upscale dining establishments',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    colors: ['#2c3e50', '#e74c3c', '#ecf0f1'],
    verticalId: 'restaurant',
    subCategory: 'Fine Dining'
  },
  {
    id: 'restaurant-2',
    name: 'Casual Café',
    description: 'Warm and inviting template perfect for coffee shops and casual dining',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
    colors: ['#8b4513', '#d2691e', '#f4a460'],
    verticalId: 'restaurant',
    subCategory: 'Café'
  },
  {
    id: 'restaurant-3',
    name: 'Fast Food Delight',
    description: 'Dynamic and energetic template for quick service restaurants',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    colors: ['#ff6b35', '#f7931e', '#ffd700'],
    verticalId: 'restaurant',
    subCategory: 'Fast Food'
  },

  // E-commerce Templates
  {
    id: 'ecommerce-1',
    name: 'Fashion Boutique',
    description: 'Stylish template for fashion and clothing stores',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    colors: ['#9b59b6', '#e91e63', '#f8bbd9'],
    verticalId: 'ecommerce',
    subCategory: 'Fashion'
  },
  {
    id: 'ecommerce-2',
    name: 'Tech Store',
    description: 'Modern template for electronics and technology stores',
    imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    colors: ['#34495e', '#3498db', '#2ecc71'],
    verticalId: 'ecommerce',
    subCategory: 'Electronics'
  },
  {
    id: 'ecommerce-3',
    name: 'Home & Garden',
    description: 'Cozy template for home improvement and garden stores',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    colors: ['#27ae60', '#8fbc8f', '#f39c12'],
    verticalId: 'ecommerce',
    subCategory: 'Home & Garden'
  },

  // Fashion Templates
  {
    id: 'fashion-1',
    name: 'Women\'s Collection',
    description: 'Elegant template showcasing women\'s fashion and accessories',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop',
    colors: ['#e91e63', '#9c27b0', '#ff9800'],
    verticalId: 'fashion',
    subCategory: 'Women\'s Clothing'
  },
  {
    id: 'fashion-2',
    name: 'Men\'s Style',
    description: 'Sophisticated template for men\'s fashion and grooming',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    colors: ['#2c3e50', '#34495e', '#7f8c8d'],
    verticalId: 'fashion',
    subCategory: 'Men\'s Clothing'
  },

  // Travel Templates
  {
    id: 'travel-1',
    name: 'Luxury Hotels',
    description: 'Premium template for luxury hotels and resorts',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    colors: ['#1abc9c', '#16a085', '#f39c12'],
    verticalId: 'travel',
    subCategory: 'Hotels'
  },
  {
    id: 'travel-2',
    name: 'Adventure Travel',
    description: 'Dynamic template for adventure and outdoor travel experiences',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
    colors: ['#e67e22', '#d35400', '#f39c12'],
    verticalId: 'travel',
    subCategory: 'Vacation Packages'
  },

  // Healthcare Templates
  {
    id: 'healthcare-1',
    name: 'Medical Center',
    description: 'Professional template for hospitals and medical centers',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    colors: ['#3498db', '#2980b9', '#ecf0f1'],
    verticalId: 'healthcare',
    subCategory: 'Hospitals'
  },
  {
    id: 'healthcare-2',
    name: 'Wellness Clinic',
    description: 'Calming template for wellness and alternative medicine clinics',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
    colors: ['#27ae60', '#2ecc71', '#a8e6cf'],
    verticalId: 'healthcare',
    subCategory: 'Clinics'
  }
];
