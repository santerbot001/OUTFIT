// Placeholder imagery uses picsum seeds so the build is self-contained (no asset shipping).
const img = (seed) => `https://picsum.photos/seed/${seed}/800/1000`

export const CATEGORIES = [
  { slug: 'shirts', label: "Men's Shirts", cover: 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F7967847b2acf4d5a9769d31187fb2e6e?format=webp&width=800&height=1200' },
  { slug: 'pants', label: "Men's Pants", cover: img('outfit-pants-hero') },
  { slug: 'dresses', label: "Sale", cover: img('outfit-dresses-hero') },
  { slug: 'women-dresses', label: "Women's Dresses", cover: 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F429f00ab51014a38b58506a362beb64f?format=webp&width=800&height=1200' },
  { slug: 'shoes', label: 'Shoes', cover: 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F8a9c2dc5ae2e41fc9b616c24152d0686?format=webp&width=800&height=1200' },
  { slug: 'watches', label: 'Watches', cover: 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F0c7f2b6240f54d449d7a6367fcf77477?format=webp&width=800&height=1200' },
]

const mk = (id, name, brand, category, price, original, rating, colors, sizes, collection, gender = 'unisex') => ({
  id, name, brand, category, price, original, rating, gender,
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

const shirtsImg = 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F9025c0174a6544bc99736c677ca2d55e?format=webp&width=800&height=1200'
const dressImg1 = 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F7342b4aff6f1468781395187b1a8156d?format=webp&width=800&height=1200'
const dressImg2 = 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F922c9fe6402a4cc3b0695d0f6df3fc34?format=webp&width=800&height=1200'
const watchImg1 = 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F8399294c79214c6bad3f0c0f16e6d801?format=webp&width=800&height=1200'
const watchImg2 = 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2Fa8d981edf0224f6faf7e69cb8fe49e9c?format=webp&width=800&height=1200'
const watchImg3 = 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2Fd29e88bb2c264386a5fefd0932385e72?format=webp&width=800&height=1200'
const shoeImg1 = 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2Fffd3ab09a2d545bbb961ba9e5f854920?format=webp&width=800&height=1200'
const shoeImg2 = 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2Fbaf524073afd4ff58f2a2760bbdde679?format=webp&width=800&height=1200'
const shoeImg3 = 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F90557b2b573f473e8f04514cb815763f?format=webp&width=800&height=1200'
const pantsImg1 = 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F13d3b6ff527947a397b4b03a3790e6ed?format=webp&width=800&height=1200'
const pantsImg2 = 'https://cdn.builder.io/api/v1/image/assets%2Fd804a884d1294eac9363b52e819be07b%2F20f56da543f24224bc0660e47ecd1f77?format=webp&width=800&height=1200'

export const PRODUCTS = [
  {...mk(1, 'Classic Leather Oxford', 'OUTFIT', 'shoes', 4500, 6000, 4.8, ['Black', 'Brown'], Sshoe, 'Formal', 'men'), image: shoeImg1, gallery: [shoeImg1, shoeImg1, shoeImg1, shoeImg1]},
  {...mk(2, 'Premium Running Sneaker', 'OUTFIT', 'shoes', 3800, 5500, 4.7, ['White', 'Navy', 'Black'], Sshoe, 'Sports', 'men'), image: shoeImg2, gallery: [shoeImg2, shoeImg2, shoeImg2, shoeImg2]},
  {...mk(3, 'Casual Canvas Low-Top', 'OUTFIT', 'shoes', 2200, 3500, 4.6, ['Beige', 'White', 'Olive'], Sshoe, 'Casual', 'women'), image: shoeImg3, gallery: [shoeImg3, shoeImg3, shoeImg3, shoeImg3]},
  {...mk(4, 'Elegant Analog Watch', 'OUTFIT', 'watches', 8999, 12000, 4.9, ['Black', 'Silver'], ['One Size'], 'Luxury', 'men'), image: watchImg1, gallery: [watchImg1, watchImg1, watchImg1, watchImg1]},
  {...mk(5, 'Minimalist Steel Watch', 'OUTFIT', 'watches', 5499, 8000, 4.8, ['Silver'], ['One Size'], 'Modern', 'women'), image: watchImg2, gallery: [watchImg2, watchImg2, watchImg2, watchImg2]},
  {...mk(6, 'Classic Leather Watch', 'OUTFIT', 'watches', 3999, 6500, 4.7, ['Brown', 'Black'], ['One Size'], 'Classic', 'unisex'), image: watchImg3, gallery: [watchImg3, watchImg3, watchImg3, watchImg3]},
  {...mk(7, 'Premium Cotton Shirt', 'OUTFIT', 'shirts', 1899, 3000, 4.7, C, Sapp, 'Basics', 'men'), image: shirtsImg, gallery: [shirtsImg, shirtsImg, shirtsImg, shirtsImg]},
  {...mk(8, 'Oxford Button-Down', 'OUTFIT', 'shirts', 2499, 4000, 4.8, C, Sapp, 'Formal', 'men'), image: shirtsImg, gallery: [shirtsImg, shirtsImg, shirtsImg, shirtsImg]},
  {...mk(9, 'Slim Fit Chinos', 'OUTFIT', 'pants', 2299, 3500, 4.6, ['Black', 'Beige', 'Navy'], Sapp, 'Casual', 'men'), image: pantsImg1, gallery: [pantsImg1, pantsImg1, pantsImg1, pantsImg1]},
  {...mk(10, 'Classic Denim Jeans', 'OUTFIT', 'pants', 2899, 4500, 4.7, ['Black', 'Blue'], Sapp, 'Casual', 'men'), image: pantsImg2, gallery: [pantsImg2, pantsImg2, pantsImg2, pantsImg2]},
  {...mk(11, 'Elegant Midi Dress', 'OUTFIT', 'dresses', 3899, 6000, 4.9, ['Black', 'Navy', 'Beige'], Sapp, 'Formal', 'women'), image: dressImg1, gallery: [dressImg1, dressImg1, dressImg1, dressImg1]},
  {...mk(12, 'Casual Linen Dress', 'OUTFIT', 'dresses', 2699, 4200, 4.7, ['White', 'Beige', 'Olive'], Sapp, 'Casual', 'women'), image: dressImg2, gallery: [dressImg2, dressImg2, dressImg2, dressImg2]},
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
