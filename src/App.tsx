import { Notifications } from "./components/commons/Notification";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <Notifications />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
