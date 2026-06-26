// Placeholder imagery uses picsum seeds so the build is self-contained (no asset shipping).
const img = (seed) => `https://picsum.photos/seed/${seed}/800/1000`

export const CATEGORIES = [
  { slug: 'shirts', label: "Men's Shirts", cover: img('outfit-shirts') },
  { slug: 'pants', label: "Men's Pants", cover: img('outfit-pants') },
  { slug: 'dresses', label: "Women's Dresses", cover: img('outfit-dresses') },
  { slug: 'shoes', label: 'Shoes', cover: img('outfit-shoes') },
  { slug: 'watches', label: 'Watches', cover: img('outfit-watches') },
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
  mk(1,'Tailored Oxford Shirt','Linea','shirts',2499,3299,4.6,C,Sapp,'New Arrivals'),
  mk(2,'Linen Resort Shirt','Atlas','shirts',2199,2899,4.4,C,Sapp,'Trending Now'),
  mk(3,'Brushed Flannel Shirt','Linea','shirts',2799,3599,4.7,C,Sapp,'Best Sellers'),
  mk(4,'Slim Chino Trousers','Atlas','pants',2999,3799,4.5,C,Sapp,'Best Sellers'),
  mk(5,'Pleated Wool Trousers','Maison','pants',3899,4999,4.8,C,Sapp,'Premium Collection'),
  mk(6,'Tapered Denim','Atlas','pants',3299,3999,4.3,C,Sapp,'New Arrivals'),
  mk(7,'Silk Slip Dress','Maison','dresses',4299,5499,4.9,C,Sapp,'Limited Edition'),
  mk(8,'Linen Midi Dress','Atlas','dresses',3499,4299,4.5,C,Sapp,'Trending Now'),
  mk(9,'Pleated Maxi Dress','Maison','dresses',4899,6299,4.8,C,Sapp,'Premium Collection'),
  mk(10,'Leather Derby Shoes','Haltmann','shoes',5999,7499,4.7,['Black','Brown'],Sshoe,'Best Sellers'),
  mk(11,'Minimal Sneakers','Atlas','shoes',4499,5499,4.6,['White','Black'],Sshoe,'New Arrivals'),
  mk(12,'Suede Loafers','Maison','shoes',5499,6999,4.8,['Beige','Navy'],Sshoe,'Premium Collection'),
  mk(13,'Automatic Steel Watch','Haltmann','watches',12999,15999,4.9,['Silver','Gold'],[],'Limited Edition'),
  mk(14,'Minimalist Quartz Watch','Linea','watches',6999,8499,4.6,['Black','Silver'],[],'Trending Now'),
  mk(15,'Chronograph Watch','Haltmann','watches',14999,18999,4.8,['Black','Silver'],[],'Premium Collection'),
  mk(16,'Cuban Collar Shirt','Atlas','shirts',2399,2999,4.4,C,Sapp,'New Arrivals'),
  mk(17,'Cropped Wide Trousers','Maison','pants',3599,4499,4.7,C,Sapp,'Trending Now'),
  mk(18,'Wrap Mini Dress','Linea','dresses',3299,3999,4.5,C,Sapp,'Best Sellers'),
  mk(19,'Canvas High-Tops','Atlas','shoes',3999,4999,4.3,['White','Black'],Sshoe,'New Arrivals'),
  mk(20,'Skeleton Dial Watch','Haltmann','watches',16999,20999,4.9,['Gold','Silver'],[],'Limited Edition'),
]

export const byCategory = (slug) => PRODUCTS.filter(p => p.category === slug)
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
