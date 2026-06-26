export const inr = (n) => '₹' + n.toLocaleString('en-IN')
export default function Price({ price, original }) {
  return (
    <span style={{display:'inline-flex',alignItems:'baseline',gap:8}}>
      <strong style={{fontFamily:'var(--font-head)',fontSize:16}}>{inr(price)}</strong>
      {original && original > price && <span style={{color:'var(--muted)',textDecoration:'line-through',fontSize:13}}>{inr(original)}</span>}
    </span>
  )
}
