import {Navigate, createBrowserRouter} from 'react-router-dom';
import Login from '../assets/pages/login/Login';
import NotFound from '../assets/pages/notfound/notfound';
import ReaderLayout from '../assets/pages/layouts/reader/readerLayout';
import Contact from '../assets/pages/contact/contact';
import SignUp from '../assets/pages/signup/signup';
import GuestLayout from '../assets/pages/layouts/guestlayout';
import Home from '../assets/pages/home/home';
import Shop from '../assets/pages/shop/shop';
import BookDetails from '../assets/pages/bookDetails/bookDetails';
import AdminLayout from '../assets/pages/layouts/admin/adminLayout/AdminLayout';
import ListBooks from '../assets/pages/layouts/admin/GenerateBooks/ListBooks';
import CreateBook from '../assets/pages/layouts/admin/GenerateBooks/CreateBook';
import EditBook from '../assets/pages/layouts/admin/GenerateBooks/EditBook';
import ListUser from '../assets/pages/layouts/admin/GenerateUsers/ListUser';
import Cart from '../assets/pages/cart/cart';
import Checkout from '../assets/pages/checkout/checkout';
import ListOrder from '../assets/pages/layouts/admin/GenerateOrders/ListOrder';
import EditOrder from '../assets/pages/layouts/admin/GenerateOrders/EditOrder';


export const router=createBrowserRouter([
    {
                    path:'/admin/*',
                    element:<AdminLayout/>,
                    // element:(
                    //     <ProtectedRoute roles={['admin']}>
                    //         <AdminLayout/>
                    //     </ProtectedRoute>
                    // ),
                    children:[
                        {
                            path:'',
                            element:<Navigate to='/admin'/>
                        },
                        {
                            path:'books',
                            element:<ListBooks/>
                        },
                        {
                            path:'create-book',
                            element:<CreateBook/>
                        },
                        {
                            path:'edit-book/:id',
                            element:<EditBook/>
                        },
                        {
                            path:'users',
                            element:<ListUser/>
                        },
                        {
                            path:'orders',
                            element:<ListOrder/>
                        },{
                            path:'edit-order/:id',
                            element:<EditOrder/>
                        }
        
                    ]
                
    },
    {
        path:'/reader',
        element:<ReaderLayout/>,
        // element:(
        //     <ProtectedRoute roles={['user']}>
        //         <ReaderLayout/>
        //     </ProtectedRoute>
        // ),
        children:[
            // {
            //     path: '',
            //     element: <Navigate to='/reader' />
            // },
            {
                path:'home', 
                element:<Home/>
            },
            {
                path:'contact',
                element:<Contact/>
            },
            {
                path:'shop',
                element:<Shop/>
            },
            {
                path:'shop/:id', 
                element: <BookDetails />
            },
            {
                path:'cart',
                element:<Cart/>
            },
            {
                path:'checkout',
                element:<Checkout/>
            }
            
        ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[
            {
                path:'home', 
                element:<Home/>
            },
            {
                path:'login',
                element:<Login/>,
            },
            {
                path:'signup',
                element:<SignUp/>
            },
            {
                path:'contact',
                element:<Contact/>
            },
            {
                path:'shop',
                element:<Shop/>
            },
            {
                path:'shop/:id', 
                element: <BookDetails />
            },
            // {
            //     path:'/admin',
            //     element:<AdminLayout/>
            // },
            // {
            //     path:'/edit-book/:id',
            //     element:<EditBook/>
            // }
        ]
    },
    {
        path:'*',
        element:<NotFound/>,
    },
    
])
