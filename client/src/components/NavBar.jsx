import {Routes, Route} from 'react-router'
import {Link} from 'react-router-dom'
import Home from './Home'
import Tasks from './Tasks'
import Photos from './Photos'
import Posts from './Posts'
import Users from './Users'

const NavBar =()=>{
return(
    <>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/tasks'>Tasks</Link></li>
          <li><Link to='/posts'>Posts</Link></li>
          <li><Link to='/photos'>Photos</Link></li>
          <li><Link to='/users'>Users</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/photos' element={<Photos/>}/>
        <Route path='/users' element={<Users/>}/>
      </Routes>

    </>
)
}

export default NavBar