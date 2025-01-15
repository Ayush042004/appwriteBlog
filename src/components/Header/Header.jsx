import React  from 'react';
import { Container, Logo , LogoutBtn } from '../index';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Header() {
    {/* status access kare ha hum use slector redux se  */}
    const authStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()
    {/* esi navigation jabhi lete ha toh array bnaya jata ha uspe loop kara jata ha*/}

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
          }, 
          {
            name: "Login", // jab user not authenticated ha 
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",  // jab user not authenticted ha 
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
        <header className='shadow bg-gray-500 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white'>
            <Container>
                <nav className='flex items-center justify-between flex-wrap py-4 '>
                    <div className='mr-4 flex items-center'> 
                        <Link to='/'>
                        <Logo width='70px'/>
                        </Link>
                    </div>
                  

                    <ul className='flex ml-auto items-center  space-x-4'>
                        {navItems.map((item)=> item.active ? (
                            <li key={item.name}>
                              <button
                onClick={() => navigate(item.slug)}
                className=' px-6 py-2  text-white duration-200 hover:bg-blue-100 hover:text-black rounded-full shadow-md'
                >{item.name}</button>
                            </li>
                        ): null
                    )}

                    {authStatus && (  // agr autheticated ho toh logout button 
                        <li>
                            <LogoutBtn/>
                        </li>
                    )}
                    
                    </ul>
                </nav>
            </Container>
        </header>
    )
}
export default Header