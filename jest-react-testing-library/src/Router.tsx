import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from './pages'
import { DefaultLayout } from './layouts/DefaultLayout'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
