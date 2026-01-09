import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { vi } from 'vitest';

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      username: 'testuser',
      name: 'Test User',
    },
  };

  const user = {
    username: 'testuser',
    name: 'Test User',
  };

  test('renders title and author, but does not render URL or likes by default', () => {
    render(
      <Blog
        blog={blog}
        updateBlog={() => {}}
        removeBlog={() => {}}
        user={user}
      />
    );

    const titleAuthor = screen.getByText(
      'Component testing is done with react-testing-library Test Author'
    );
    expect(titleAuthor).toBeDefined();

    const details = screen.queryByText('http://testurl.com');
    expect(details).toBeNull();

    const likes = screen.queryByText('likes 5');
    expect(likes).toBeNull();
  });

  test('URL and likes are shown when the view button is clicked', async () => {
    render(
      <Blog
        blog={blog}
        updateBlog={() => {}}
        removeBlog={() => {}}
        user={user}
      />
    );

    const userEventSession = userEvent.setup();
    const button = screen.getByText('view');
    await userEventSession.click(button);

    const url = screen.getByText('http://testurl.com');
    expect(url).toBeDefined();

    const likes = screen.getByText('likes 5');
    expect(likes).toBeDefined();
  });

  test('like button is clicked twice, event handler is called twice', async () => {
    const mockHandler = vi.fn();

    render(
      <Blog
        blog={blog}
        updateBlog={mockHandler}
        removeBlog={() => {}}
        user={user}
      />
    );

    const userEventSession = userEvent.setup();
    const viewButton = screen.getByText('view');
    await userEventSession.click(viewButton);

    const likeButton = screen.getByText('like');
    await userEventSession.click(likeButton);
    await userEventSession.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
