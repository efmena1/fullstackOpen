import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './blog'

test('renders title & author', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'www.test.com',
    likes: 5,
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderCollapse: 'collapse',
  }

  const component = render(
    <Blog blog={blog} style={blogStyle} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})