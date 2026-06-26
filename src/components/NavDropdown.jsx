import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import './nav-dropdown.css'

export default function NavDropdown() {
  const [openMenu, setOpenMenu] = useState(null)

  const categories = {
    men: [
      { label: 'Shirts', path: '/category/shirts' },
      { label: 'Pants', path: '/category/pants' },
    ],
    women: [
      { label: 'Dresses', path: '/category/dresses' },
      { label: 'Shoes', path: '/category/shoes' },
      { label: 'Watches', path: '/category/watches' },
    ],
  }

  return (
    <>
      {/* Men Dropdown */}
      <div
        className="nav-dropdown"
        onMouseEnter={() => setOpenMenu('men')}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <button className="nav-dropdown-trigger">
          Men
          <ChevronDown size={16} className={openMenu === 'men' ? 'expanded' : ''} />
        </button>
        {openMenu === 'men' && (
          <div className="nav-dropdown-menu">
            {categories.men.map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className="nav-dropdown-item"
                onClick={() => setOpenMenu(null)}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Women Dropdown */}
      <div
        className="nav-dropdown"
        onMouseEnter={() => setOpenMenu('women')}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <button className="nav-dropdown-trigger">
          Women
          <ChevronDown size={16} className={openMenu === 'women' ? 'expanded' : ''} />
        </button>
        {openMenu === 'women' && (
          <div className="nav-dropdown-menu">
            {categories.women.map((cat) => (
              <Link
                key={cat.path}
                to={cat.path}
                className="nav-dropdown-item"
                onClick={() => setOpenMenu(null)}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
