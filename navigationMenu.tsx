import NavigationItem from "./navigationItem";
import { useAuthContext } from "@/app/context/authContext";
import { FaHome, FaSearch, FaCalendarAlt, FaCar } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';

export default function NavigationMenu() {
  const { logout } = useAuthContext();

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen flex flex-col"
      style={{ backgroundColor: '#344966' }}
      aria-label="Sidebar"
    >
      <h1 className="text-white text-2xl text-center py-4 font-extralight pt-10 pr-3" 
      style={{  }}>
        Tarkastukset
      
      </h1>
      
      <div className="flex flex-col justify-between h-full">
        <nav className="mt-10">
          <ul className="flex flex-col items-center space-y-2">
      <NavigationItem href="/console/dashboard" name="Etusivu" icon={<FaHome />} />
      <NavigationItem href="/console/search" name="Haku" icon={<FaSearch />} />
      <NavigationItem href="/console/calendar" name="Kalenteri" icon={<FaCalendarAlt />} />
      <NavigationItem href="/console/carlist" name="Autolista" icon={<FaCar />} />
      <NavigationItem href="/console/logindesign" name="login page design only" icon={<FaCar />} />
      
          </ul>
        </nav>
        <div className="mb-4 w-full">
        <button 
  className="flex items-center justify-center w-auto px-6 py-2 mx-auto text-#3e74c6 bg-white rounded-full ring-1 ring-#2e5dba hover:bg-#5168a7 focus:outline-none focus:ring focus:ring-#2e5dba focus:ring-offset-2 transition duration-150"
          >
            <FaSignOutAlt className="mr-2" style={{ color: '#344966' }} />
            <span style={{ color: '#344966' }}>Kirjaudu Ulos</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
