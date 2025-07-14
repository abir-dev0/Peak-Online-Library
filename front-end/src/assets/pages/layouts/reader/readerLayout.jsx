import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet} from 'react-router-dom';
import { useStateContext } from '../../../../contexts/ContextProvider';
import { axiosClient } from '../../../../api/axios-client';
import logo from '../../../images/footerlogo.png';
// import './readerLayout.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faBars, faTimes, faPhone, faAt, faMapMarkerAlt, faCartShopping } from "@fortawesome/free-solid-svg-icons";


export default function ReaderLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  
  if (!token ) {
    return <Navigate to='/login' />;
  }

  const onLogout = (e) => {
    e.preventDefault();
    axiosClient.post('/logout')
      .then(() => {
        setUser({});
        setToken(null);
      });
  };

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className='p-3 bg-gray-100 shadow-lg'>
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-0 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <img className="h-14  w-auto" src={logo} alt="Peak" />
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}>
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">

            <Link to={'home'} className='text-black'>Home</Link>
            <Link to={'shop'} className='text-black'>Shop</Link>
            <Link to={'contact'} className='text-black'>Contact</Link>

          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-9">
          <Link to={'cart'} >
            <FontAwesomeIcon icon={faCartShopping}  size='lg' />
            </Link>
            <Link onClick={onLogout} className="text-sm  leading-6 text-black">
              Log Out <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-10 bg-gray-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <img className="h-12 w-auto" src={logo} alt="Peak" />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <FontAwesomeIcon icon={faTimes} className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link to={'home'} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Home</Link>
                  <Link to={'shop'} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Shop</Link>
                  <Link to={'contact'} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Contact</Link>

                </div>
                <div className="py-6">
                <Link to={'cart'} >
                  <FontAwesomeIcon icon={faCartShopping} size='lg'  />
                </Link>
                  <Link onClick={onLogout} className="-mx-3 block rounded-lg px-3 py-2.5 text-base  leading-7 text-gray-900 hover:bg-gray-50">Log Out</Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <main className='m-0 p-0'>
        <Outlet />
      </main>
      <footer>
        {/*----------footer---------*/}
        <div className="bg-gray-100 py-24 sm:py-31">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              <div className="mx-auto flex max-w-xs flex-col gap-y-6">
                <dt className="text-base leading-10 ">
                  <span>Uncover the unseen at Peak</span>
                  <div className="social-media">
                    <a href="#" className="insta-icon"><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="#" className="fb-icon"><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href="#" className="wtsp-icon"><FontAwesomeIcon icon={faWhatsapp} /></a>
                  </div>
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  <img className="h-14 w-auto" src={logo} alt="Peak" />
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-10 ">
                  <ul className="list-links">
                    <li className="nav-item">
                      <Link to='shop'>Shop Now</Link>
                    </li>
                    <li className="nav-item">
                      <Link to='contact'>Contact Us</Link>
                    </li>
                  </ul>
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                  Quick links
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-10 ">
                  <ul className="list">
                    <li>
                      <span><FontAwesomeIcon icon={faAt} /></span>
                      <a href="#" className="contact-email">peak@gmail.com</a>
                    </li>
                    <li>
                      <span><FontAwesomeIcon icon={faPhone} /></span>
                      <a href='#' className="contact-tele">+212 695-576492</a>
                    </li>
                    <li>
                      <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                      <span>Address, 123 Street</span>
                    </li>
                  </ul>
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                  Contact Us
                </dd>
              </div>
            </dl>
          </div>
          <hr></hr>
          <p>&copy; 2024 Peak. All rights reserved</p>
        </div>
      </footer>
    </>
  );

  // return (
  //     <div className="dashboard">
  //       <aside className="sidebar">
  //         <div className="logo-container">
  //           <img src={logo} alt="Logo" className="logo" />
  //         </div>
  //         <nav className="nav-links">
  //           <Link to="/home" className="nav-link">Home</Link>
  //           <Link to="/dashboard" className="nav-link">Dashboard</Link>
  //           <Link to="/profile" className="nav-link">Profile</Link>
  //           <Link to="/settings" className="nav-link">Settings</Link>
  //         </nav>
  //       </aside>
  //       <main className="main-content">
  //       <div className="main-content-header">
  //           <h1>Hello </h1>
  //           <button className="logout-button" onClick={onLogout}>Logout</button>
  //         </div>
  //           <a href="/home" ></a>
  //           <a href="/dashboard"  ></a>
  //           <a href="/profile"></a>
  //           <a href="/settings"></a>
  //           <a href="/" ></a>
  //           <Outlet>
              
  //           </Outlet>
  //       </main>
  //     </div>
  // );
}


