import AthleticShoes from '../assets/AthleticShoes.png'
import EssentialWatch from '../assets/Essentialwatch.png'
import HeadPhones from '../assets/Headphones.png'
import TShirt from '../assets/T-Shirt.png'
import GlassCarafe from '../assets/GlassCarafe.png'

export const products= [
    {
        id:1,
        img:HeadPhones,
        name:"Precison Audio S-01",
        price:'#299.00',
        description: 'Noise-cancelling fleagshio with acoustic architectural precision',
        badge: 'In Transit',
    badgeColor: 'teal',
    bgColor: '#1a1a2e',
    imageAlt: 'Precision Audio Headphones S-01',
    category: 'IN TRANSIT',
    originalPrice: null,

    },
     {
        id:2,
        img:EssentialWatch,
        name:"Metropolitan Chrono",
        category: 'NEW STOCK',
        price:'#145.000',
        originalPrice: null,
    description: 'The premium chronograph timepiece with sapphire crystal and automatic movement.',
    badge: 'New Stock',
    badgeColor: 'green',
    bgColor: '#111827',
    imageAlt: 'Metropolitan Chrono Watch',
  
    },
     {
        id:3,
        img:AthleticShoes,
        name:"Veloce Runner V2",
        category: 'ONLINE',
        price:'#180.00',
        originalPrice: '220.00',
    description: 'Performance sport sneakers. Optimal fit for street and track.',
    badge: null,
    bgColor: '#fef3c7',
    imageAlt: 'Veloce Runner V2 Shoes',
    },
     {
        id:4,
        img:TShirt,
        name:"The Organic Essential Tee",
        category: 'CURATED PICK',
        price:'#45.00',
       originalPrice: '60.00',
    description: 'Permanently sourced, wrinkle-resistant, and traceable from sleeve to shelf.',
    badge: 'Curated Pick',
    badgeColor: 'teal',
    bgColor: '#f9fafb',
    imageAlt: 'Organic Essential Tee White',
    },
     {
        id:5,
        img:GlassCarafe,
        name:"Nordic Glassware Set",
        category: 'CURATED',
        price:'#32.500',
         originalPrice: '100.00',
    description: 'Minimal Scandinavian design. Dishwasher safe. The complete home of glass.',
    badge: null,
    bgColor: '#1a1a2e',
    imageAlt: 'Nordic Glassware Set',
    }
]

export const sidebarCategories = [
  { label: 'All', count: 24 },
  { label: 'Quoted', count: 8 },
  { label: 'Tracked', count: 12 },
  { label: 'Settled', count: 4 },
]

