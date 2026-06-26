// Placeholder imagery uses picsum seeds so the build is self-contained (no asset shipping).
const img = (seed) => `https://picsum.photos/seed/${seed}/800/1000`

export const CATEGORIES = [
  { slug: 'shirts', label: "Men's Shirts", cover: img('outfit-shirts-hero') },
  { slug: 'pants', label: "Men's Pants", cover: img('outfit-pants-hero') },
  { slug: 'dresses', label: "Sale", cover: img('outfit-dresses-hero') },
  { slug: 'women-dresses', label: "Women's Dresses", cover: img('outfit-dresses-hero') },
  { slug: 'shoes', label: 'Shoes', cover: img('outfit-shoes-hero') },
  { slug: 'watches', label: 'Watches', cover: img('outfit-watches-hero') },
]

const mk = (id, name, brand, category, price, original, rating, colors, sizes, collection) => ({
  id, name, brand, category, price, original, rating,
  reviews: 20 + (id * 7) % 180,
  discount: original ? Math.round((1 - price / original) * 100) : 0,
  colors, sizes, collection,
  image: img('outfit-' + id), gallery: [img('outfit-'+id), img('outfit-'+id+'-b'), img('outfit-'+id+'-c'), img('outfit-'+id+'-d')],
  stock: 3 + (id * 5) % 40,
  description: `Crafted from premium materials with a refined silhouette, the ${name} balances modern minimalism with everyday versatility.`,
  specs: [['Material','Premium cotton blend'],['Fit','Regular'],['Origin','Imported'],['SKU','OUT-'+String(id).padStart(4,'0')]],
  care: ['Machine wash cold','Do not bleach','Iron low heat','Dry flat'],
})

const C = ['Black','White','Beige','Navy','Olive']
const Sapp = ['S','M','L','XL']
const Sshoe = ['7','8','9','10','11']

export const PRODUCTS = [
  mk(1, 'Classic Leather Oxford', 'OUTFIT', 'shoes', 4500, 6000, 4.8, ['Black', 'Brown'], Sshoe, 'Formal'),
  mk(2, 'Premium Running Sneaker', 'OUTFIT', 'shoes', 3800, 5500, 4.7, ['White', 'Navy', 'Black'], Sshoe, 'Sports'),
  mk(3, 'Casual Canvas Low-Top', 'OUTFIT', 'shoes', 2200, 3500, 4.6, ['Beige', 'White', 'Olive'], Sshoe, 'Casual'),
  mk(4, 'Elegant Analog Watch', 'OUTFIT', 'watches', 8999, 12000, 4.9, ['Black', 'Silver'], ['One Size'], 'Luxury'),
  mk(5, 'Minimalist Steel Watch', 'OUTFIT', 'watches', 5499, 8000, 4.8, ['Silver'], ['One Size'], 'Modern'),
  mk(6, 'Classic Leather Watch', 'OUTFIT', 'watches', 3999, 6500, 4.7, ['Brown', 'Black'], ['One Size'], 'Classic'),
  mk(7, 'Premium Cotton Shirt', 'OUTFIT', 'shirts', 1899, 3000, 4.7, C, Sapp, 'Basics'),
  mk(8, 'Oxford Button-Down', 'OUTFIT', 'shirts', 2499, 4000, 4.8, C, Sapp, 'Formal'),
  mk(9, 'Slim Fit Chinos', 'OUTFIT', 'pants', 2299, 3500, 4.6, ['Black', 'Beige', 'Navy'], Sapp, 'Casual'),
  mk(10, 'Classic Denim Jeans', 'OUTFIT', 'pants', 2899, 4500, 4.7, ['Black', 'Blue'], Sapp, 'Casual'),
  mk(11, 'Elegant Midi Dress', 'OUTFIT', 'dresses', 3899, 6000, 4.9, ['Black', 'Navy', 'Beige'], Sapp, 'Formal'),
  mk(12, 'Casual Linen Dress', 'OUTFIT', 'dresses', 2699, 4200, 4.7, ['White', 'Beige', 'Olive'], Sapp, 'Casual'),
]

export const byCategory = (slug) => {
  const category = slug === 'women-dresses' ? 'dresses' : slug
  return PRODUCTS.filter(p => p.category === category)
}
export const byCollection = (name) => PRODUCTS.filter(p => p.collection === name)
export const getProduct = (id) => PRODUCTS.find(p => p.id === Number(id))
export const related = (p) => PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4)

export const REVIEWS = [
  { name:'Aarav Mehta', photo:'https://i.pravatar.cc/120?img=11', rating:5, text:'The fabric quality is exceptional. Easily the most refined shirt I own.' },
  { name:'Sofia Rossi', photo:'https://i.pravatar.cc/120?img=32', rating:5, text:'Beautiful packaging and the dress fits like it was tailored for me.' },
  { name:'Liam Carter', photo:'https://i.pravatar.cc/120?img=15', rating:4, text:'Premium feel throughout. Fast delivery and easy returns.' },
  { name:'Maya Singh', photo:'https://i.pravatar.cc/120?img=45', rating:5, text:'OUTFIT has become my go-to for minimalist luxury basics.' },
]

export const GALLERY = Array.from({length:6}, (_,i)=>`https://picsum.photos/seed/outfit-gram-${i}/500/500`)
