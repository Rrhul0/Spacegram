import { Route, Routes } from 'react-router-dom'
import App from './App'
import FullScreen from './fullscreen'

const Index = () => {
    return (
        <Routes>
            <Route path='image'>
                <Route path=':imageId' element={<FullScreen />} />
            </Route>
            <Route path='/' element={<App />} />
        </Routes>
    )
}

export default Index
