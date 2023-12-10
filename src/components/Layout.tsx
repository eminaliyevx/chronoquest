import {
  AppShell,
  Button,
  Flex,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCoin } from "@tabler/icons-react";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Login } from ".";
import logo from "../assets/images/logo.png";
import { useAuthStore } from "../store";

const Layout = ({ children }: PropsWithChildren) => {
  const { user } = useAuthStore();

  const openLoginModal = () => {
    modals.open({
      modalId: "login",
      title: "Login",
      centered: true,
      children: <Login />,
    });
  };

  return (
    <AppShell header={{ height: 100 }} padding="md">
      <AppShell.Header withBorder={false} px="md">
        <Flex h="100%" justify="space-between" align="center">
          <Link to="/">
            <Image src={logo} w={100} />
          </Link>

          {!user && (
            <Button
              variant="outline"
              size="md"
              color="blue.5"
              radius="xl"
              px="xl"
              onClick={openLoginModal}
            >
              Login
            </Button>
          )}

          {user && (
            <Stack gap="xs">
              <Text>
                Hello,{" "}
                <Text component="span" fw={700}>
                  {user.username}
                </Text>
              </Text>

              <Group gap="xs" justify="flex-end">
                <IconCoin color="#fcc419" />
                <Text fw={700}>1000</Text>
              </Group>
            </Stack>
          )}
        </Flex>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
