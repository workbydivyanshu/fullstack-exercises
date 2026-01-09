import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(notify('Logged out successfully'))
  }

  const padding = {
    paddingRight: 5
  }

  const navStyle = {
    backgroundColor: '#e0e0e0',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={navStyle}>
      <Link to="/" style={padding}>blogs</Link>
      <Link to="/users" style={padding}>users</Link>
      {user && (
        <span>
          <em>{user.name} logged in</em>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
            logout
          </button>
        </span>
      )}
    </div>
  )
}

export default Navigation
