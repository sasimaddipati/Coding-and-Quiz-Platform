import './App.css';
import Display from './components/display/Display'
import Login from './components/login/Login'
import Home from './components/home/Home'
import Register from './components/register/Register'
import Create from './components/create/Create';
import Skillspace from './components/skillspace/Skillspace';
import Classzone from './components/classzone/Classzone';
import Displayquiz from './components/displayquiz/Displayquiz'
import Displaycode from './components/displaycode/Displaycode'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Createquiz from './components/createquiz/Createquiz';
import Createcontest from './components/createcontest/Createcontest';
import Unassigned from './components/unassigned/Unassigned';
import Upcoming from './components/upcoming/Upcoming'
import Codeeditor from './components/codeeditor/Codeeditor'
import Joinedzone from './components/joinzone/Joinzone'
import Createzone from './components/createzone/Createzone';
import Completed from './components/completed/Completed';
import Skillattempt from './components/skillattempt/Skillattempt'
import Editquiz from './components/editquiz/Editquiz';
import Joindetails from './components/joindetails/Joindetails'
import QuizAttempt from './components/attemptquiz/QuizAttempt';
import Skillspacequiz from './components/skillspacequiz/Skillspacequiz';
import Skillspacecode from './components/skillspacecode/Skillspacecode'
import Analysis from './components/analysis/Analysis';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Display />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login/>,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'skillspace',
        element: <Skillspace />,
         children:[
            {
               path:'',
               element:<Codeeditor/>
            },{
              path:'skillspacequiz',
              element:<Skillspacequiz />
            },
            {
              path:'codeeditor',
              element:<Codeeditor/>
           },{
            path:'skillspacecode',
            element:<Skillspacecode />
         }
         ]
      },
      {
        path: 'classzone',
        element: <Classzone />,
        children:[
          {
            path:'',
            element:<Createzone />
          },
          {
            path:'createzone',
            element:<Createzone />
          },
          {
             path:'joinedzone',
             element:<Joinedzone/>
          }
        ]
      },
    ],
  },
  {
    path:'joindetails',
    element:<Joindetails/>
     
  },
  {
    path: 'create',
    element: <Create />,
    children: [
      {
        path: 'createquiz',
        element: <Createquiz />
      },
      {
        path: 'createcontest',
        element: <Createcontest />,
      },
      {
        path: 'unassigned',
        element: <Unassigned />,
       
      },
      {
        path: '',
        element: <Upcoming />,
      },
      {
         path:'completed',
         element:<Completed/>
      },
      {
        path:'editquiz',
        element:<Editquiz />
      }
    ],
  },
  {
    path:'editquiz',
    element:<Editquiz />
  },
  {
     path:'quizattempt',
     element:<QuizAttempt/>
  },{
     path:'analysis',
     element:<Analysis/>
  },{
    path:'skillattempt',
    element:<Skillattempt />
 }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
