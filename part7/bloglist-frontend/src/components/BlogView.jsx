import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { useState } from 'react'

const BlogView = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blog = useSelector(state => 
    state.blogs.find(b => b.id === id)
  )
  const user = useSelector(state => state.user)

  if (!blog) {
    return null
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
    dispatch(notify(`You liked '${blog.title}'`))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      dispatch(notify(`Blog '${blog.title}' removed`))
      navigate('/')
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog.id, comment))
    dispatch(notify(`Comment added`))
    setComment('')
  }

  const showRemove = user && blog.user && user.username === blog.user.username

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user ? blog.user.name : 'unknown'}</div>
      {showRemove && (
        <button onClick={handleRemove} style={{ marginTop: '10px' }}>
          remove
        </button>
      )}
      
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments && blog.comments.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
