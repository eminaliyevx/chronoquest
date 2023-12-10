import {
  Anchor,
  Box,
  Button,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeModal, openModal } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Register } from ".";
import { axios } from "../lib";
import { useAuthStore } from "../store";

const Login = () => {
  const { setAccessToken } = useAuthStore();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (data: typeof form.values) => {
    setLoading(true);

    try {
      const {
        data: {
          tokens: { access },
        },
      } = await axios.post<{
        username: string;
        tokens: { access: string; refresh: string };
      }>("/accounts/login/", data);

      setAccessToken(access);

      closeModal("login");
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Invalid username or password",
        icon: <IconX size={20} />,
        color: "red",
      });

      form.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        placeholder="Username"
        size="md"
        color="pink"
        mb="md"
        {...form.getInputProps("username")}
      />

      <PasswordInput
        placeholder="Password"
        size="md"
        mb="md"
        {...form.getInputProps("password")}
      />

      <Button
        id="login"
        type="submit"
        size="md"
        color="blue.5"
        fullWidth
        mb="md"
        loading={loading}
      >
        Login
      </Button>

      <Text ta="center">
        Still not embarked?{" "}
        <Anchor
          onClick={() => {
            closeModal("login");
            openModal({
              modalId: "register",
              title: "Register",
              centered: true,
              children: <Register />,
            });
          }}
        >
          Register
        </Anchor>
      </Text>
    </Box>
  );
};

export default Login;
