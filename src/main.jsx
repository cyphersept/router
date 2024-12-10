import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Contact from "./routes/contact";
import ErrorPage from "./error-page";
import EditContact from "./routes/edit";
import Index from "./routes";
import { loader as rootLoader, action as rootAction } from "./routes/root";
import {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";

import { action as editAction } from "./routes/edit";
import { action as deleteAction } from "./routes/delete";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/delete",
            element: <EditContact />,
            action: deleteAction,
            errorElement: (
              <div>Oops! There was an error while deleteing your contact.</div>
            ),
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
