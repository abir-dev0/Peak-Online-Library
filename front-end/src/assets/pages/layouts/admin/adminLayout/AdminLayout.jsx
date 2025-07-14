import { useEffect } from 'react';
import { Link, Navigate, Outlet, Route, Routes} from 'react-router-dom';
import { useStateContext } from '../../../../../contexts/ContextProvider';
import { axiosClient } from '../../../../../api/axios-client';
import logo from '../../../../images/footerlogo.png';
import './admindashboard.css'
import GenerateBooks from '../GenerateBooks/ListBooks';
import GenerateUsers from '../GenerateUsers/ListUser';

export default function AdminLayout() {
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
    axiosClient.get('/admin')
      .then(({ data }) => {
        setUser(data);
      });
  }, []);

  return (
      <div className="dashboard">
        <aside className="sidebar">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <nav className="nav-links">
            <Link to="/admin/books" className="nav-link">Books</Link>
            <Link to="/admin/orders" className="nav-link">Orders</Link>
          </nav>
        </aside>
        <main className="main-content">
        <div className="main-content-header">
            <h1>Admin Dashboard </h1>
            <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
        <Routes>
             <Route path="/admin" element={<GenerateBooks />} />
            <Route path="/users" element={<GenerateUsers />} />
            {/* <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/" element={<Navigate to="/home" />} /> */}
          </Routes>
            <Outlet>
              
            </Outlet>
        </main>
      </div>
  );
}


