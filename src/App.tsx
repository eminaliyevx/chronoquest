import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthGuard } from "./guards";
import { User } from "./interfaces";
import { axios } from "./lib";
import {
  CategoryPuzzles,
  Home,
  Play,
  PlayMulti,
  PlayMultiAi,
  PlaySingle,
  PlaySingleCategory,
  PlaySinglePuzzle,
} from "./pages";
import { useAuthStore } from "./store";
import theme from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/play",
    element: (
      <AuthGuard>
        <Play />
      </AuthGuard>
    ),
  },
  {
    path: "/play/single",
    element: (
      <AuthGuard>
        <PlaySingle />
      </AuthGuard>
    ),
  },
  {
    path: "/play/single/:categoryId",
    element: (
      <AuthGuard>
        <PlaySingleCategory />
      </AuthGuard>
    ),
  },
  {
    path: "/play/single/:categoryId/puzzles",
    element: (
      <AuthGuard>
        <CategoryPuzzles />
      </AuthGuard>
    ),
  },
  {
    path: "/play/single/:categoryId/puzzles/:puzzleId",
    element: (
      <AuthGuard>
        <PlaySinglePuzzle />
      </AuthGuard>
    ),
  },
  {
    path: "/play/multi",
    element: (
      <AuthGuard>
        <PlayMulti />
      </AuthGuard>
    ),
  },
  {
    path: "/play/multi/ai",
    element: (
      <AuthGuard>
        <PlayMultiAi />
      </AuthGuard>
    ),
  },
  { path: "*", element: <Navigate to="/" /> },
]);

const App = () => {
  const { accessToken, setUser } = useAuthStore();

  useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      axios.get<User>("/accounts/profile").then((response) => response.data),
    enabled: !!accessToken,
    onSuccess: (user) => {
      setUser(user);
    },
    onError: () => {
      setUser(null);
    },
  });

  useEffect(() => {
    if (!accessToken) {
      setUser(null);
    }
  }, [accessToken]);

  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Notifications position="top-right" />

      <ModalsProvider>
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  );
};

export default App;
