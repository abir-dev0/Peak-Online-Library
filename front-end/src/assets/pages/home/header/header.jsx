import { Link } from 'react-router-dom';
import './header.css';

export default function Header() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className='h1'>Enter the Realm of Infinite Stories</h1>
          <p>Peak-Your Portal to Inspiration</p>
          <Link to='/shop'><button className="header-btn" >Shop Now</button></Link>                                  
        </div>
        <div className="col">
          
        </div>
      </div>
    </div>
  )
}
