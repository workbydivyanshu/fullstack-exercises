import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { vi } from 'vitest'

test('<BlogForm /> calls event handler with right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const userEventSession = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('enter title')
  const authorInput = screen.getByPlaceholderText('enter author')
  const urlInput = screen.getByPlaceholderText('enter url')
  const submitButton = screen.getByText('create')

  await userEventSession.type(titleInput, 'Testing forms with react testing library')
  await userEventSession.type(authorInput, 'Test Author Name')
  await userEventSession.type(urlInput, 'http://example.com/test')
  await userEventSession.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing forms with react testing library')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author Name')
  expect(createBlog.mock.calls[0][0].url).toBe('http://example.com/test')
})
