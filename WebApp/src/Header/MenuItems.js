import {FaTools, FaUsers, FaUserCircle} from "react-icons/fa";

// File containing all menu items in the header including their:
// Icon, title, url (for the route) and the name of the class
export const MenuItems = [
    {
        icon: <FaTools/>,
        title: 'Tools',
        url: '/App',
        cName: 'nav-links'
    },
    {
        icon: <FaUsers />,
        title: 'Profile',
        url: '/User',
        cName: 'nav-links'
    },
    {
        icon: <FaUserCircle />,
        title: 'Favourites',
        url: '/Profile',
        cName: 'nav-links'
    }
]
