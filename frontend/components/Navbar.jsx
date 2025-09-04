import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
    const location = useLocation()
    const isDetailPage = location.pathname.startsWith("/getOne/")
    const isCongratsPage = location.pathname.startsWith("/pay/congrats")
  return (
      <div className={`${(isDetailPage || isCongratsPage) ?'shadow-sm' :''}`}>
          <nav className="relative z-10 flex justify-between items-center lg:!px-10 !py-6 lg:!mx-20 !mx-10">
              <Link to='/' className="flex items-center cursor-pointer gap-2">
                  <img src="/assets/icons/logo.svg" alt="logo" />
                  <h1 className="!text-2xl font-bold">Tourvisto</h1>
              </Link>
              <span className="flex items-center gap-4">
                  <label  className={`font-semibold ${(isDetailPage ||isCongratsPage) ? 'text-black': 'text-white'} lg:block hidden `}>Krishanveer Singh</label>
                  <img src="/assets/images/michael.webp" alt="logo"  className="!size-8 rounded-full border-white"/>
              </span>
          </nav>
    </div>
  )
}

export default Navbar