import { VerticalOption } from '../components/vertical-selector/vertical-selector.component';

export const VERTICALS: VerticalOption[] = [
  { 
    id: 'restaurant', 
    name: 'Restaurant',
    subCategories: ['Dining Out', 'Café', 'Fast Food', 'Fine Dining', 'Food Delivery']
  },
  { 
    id: 'ecommerce', 
    name: 'E-Commerce',
    subCategories: ['Fashion', 'Electronics', 'Home & Garden', 'Beauty', 'Sports']
  },
  { 
    id: 'fashion', 
    name: 'Fashion',
    subCategories: ['Women\'s Clothing', 'Men\'s Clothing', 'Accessories', 'Shoes', 'Jewelry']
  },
  { 
    id: 'travel', 
    name: 'Travel',
    subCategories: ['Hotels', 'Flights', 'Vacation Packages', 'Car Rentals', 'Travel Insurance']
  },
  { 
    id: 'healthcare', 
    name: 'Healthcare',
    subCategories: ['Hospitals', 'Clinics', 'Pharmacies', 'Dental Care', 'Mental Health']
  },
  { 
    id: 'education', 
    name: 'Education',
    subCategories: ['Universities', 'Schools', 'Online Courses', 'Tutoring', 'Training Centers']
  },
  { 
    id: 'automotive', 
    name: 'Automotive',
    subCategories: ['Car Dealerships', 'Auto Services', 'Car Parts', 'Motorcycles', 'Commercial Vehicles']
  },
  { 
    id: 'realestate', 
    name: 'Real Estate',
    subCategories: ['Residential', 'Commercial', 'Rentals', 'Property Management', 'Real Estate Agents']
  }
];
