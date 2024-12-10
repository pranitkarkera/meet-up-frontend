import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import TechConference from './pages/TechConference.jsx';
import DesignWorkshop from './pages/DesignWorkshop.jsx';
import MarketingSeminar from './pages/MarketingSeminar.jsx';
import MusicConcert from './pages/MusicConcert.jsx';
import CryptoWebinar from './pages/CryptoWebinar.jsx';
import PhotographyWorkshop from './pages/PhotographyWorkshop.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/event/6731f507e73572fb18536014",
    element: <TechConference />,
  },
  {
    path: "/event/6731f507e73572fb18536015",
    element: <DesignWorkshop />,
  },
  {
    path: "/event/6731f507e73572fb18536016",
    element: <MarketingSeminar />,
  },
  {
    path: "/event/6731f507e73572fb18536017",
    element: <MusicConcert />,
  },
  {
    path: "/event/6731f507e73572fb18536018",
    element: <CryptoWebinar />,
  },
  {
    path: "/event/6731f507e73572fb18536019",
    element: <PhotographyWorkshop />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
