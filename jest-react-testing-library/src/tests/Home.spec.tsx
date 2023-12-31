import { render /* screen */ } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Home } from '../pages'
import { BrowserRouter } from 'react-router-dom'

/* global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
 */
const renderComponent = () => {
  const queryClient = new QueryClient()
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </QueryClientProvider>,
  )
  return { queryClient }
}

describe('Home page', () => {
  it('', async () => {
    renderComponent()
  })
})
