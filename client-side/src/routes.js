import React from "react";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';

const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Employee = React.lazy(() => import('./views/Employee'))
const Login = React.lazy(() => import('./views/Login'))
const Register = React.lazy(() => import('./views/Register'))
const Notes = React.lazy(() => import('./views/Notes'))
const Kanban = React.lazy(() => import('./views/Kanban'))
const Color = React.lazy(() => import('./views/Color'))

const ShowListing = React.lazy(() => import('./components/ShowListing')) 
import CreateListing from './components/CreateListing';
import ShowSingleListing from './components/ShowSingleListing';
import EditListing from './components/EditListing';
import FilterListing from './components/FilterListing';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Register from './components/auth/Register';
const routes = [
    { id: 0, icon: <SpaceDashboardOutlinedIcon />, path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { id: 1, icon: <PeopleOutlinedIcon />, path: '/employee', name: 'Employees', element: Employee },
    { id: 2, icon: <PeopleOutlinedIcon />, path: '/login', name: 'Login', element: Login },
    { id: 3, icon: <PeopleOutlinedIcon />, path: '/register', name: 'Register', element: Register },
    { id: 4, icon: <PeopleOutlinedIcon />, path: '/notes', name: 'Sticky Notes', element: Notes },
    { id: 5, icon: <PeopleOutlinedIcon />, path: '/kanban', name: 'Kanban', element: Kanban },
    { id: 6, icon: <PeopleOutlinedIcon />, path: '/colors', name: 'Colors', element: Color }
]

export default routes