import {
  Avatar,
  Box,
  Button,
  Grid,
  Group,
  Image,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { IconCoin } from "@tabler/icons-react";
import avatar from "../assets/images/avatar.png";
import avatar2 from "../assets/images/avatar2.png";
import { Layout } from "../components";

const PlayMultiAi = () => {
  return (
    <Layout>
      <Grid>
        <Grid.Col span={2}>
          <Stack mb="md">
            <Avatar src={avatar} size={200} mx="auto" />

            <Title order={3} ta="center">
              You
            </Title>
          </Stack>

          <Title order={4} mb="sm">
            Your pieces
          </Title>

          <Box
            style={{
              display: "grid",
              gridTemplateRows: `repeat(5, 40px)`,
              gridTemplateColumns: `repeat(5, 40px)`,
              gap: 4,
            }}
          >
            {Array.from({ length: 25 }).map(() => (
              <Image w={40} h={40} fallbackSrc="https://placehold.co/40x40" />
            ))}
          </Box>

          <Group align="center" mt="md">
            <TextInput placeholder="Your input for AI" style={{ flex: 1 }} />

            <Button>Prompt</Button>
          </Group>
        </Grid.Col>

        <Grid.Col span={8} style={{ display: "grid", placeItems: "center" }}>
          <Title order={2}>01:13</Title>

          <Group mb="md">
            <Title order={2}>Stake:</Title>

            <Group gap={4}>
              <Title order={2}>500</Title>
              <IconCoin color="#fcc419" />
            </Group>
          </Group>

          <Box
            style={{
              display: "grid",
              gridTemplateRows: `repeat(5, 100px)`,
              gridTemplateColumns: `repeat(5, 100px)`,
            }}
          >
            {Array.from({ length: 25 }).map((_, index) => (
              <Box
                key={index}
                style={{
                  border: "1px solid var(--mantine-color-blue-5)",
                }}
              >
                <Image fallbackSrc={`https://placehold.co/100x100`} />
              </Box>
            ))}
          </Box>
        </Grid.Col>

        <Grid.Col span={2}>
          <Stack mb="md">
            <Avatar src={avatar2} size={200} mx="auto" />

            <Title order={3} ta="center">
              Celine
            </Title>
          </Stack>

          <Title order={4} mb="sm" ta="end">
            Your pieces
          </Title>

          <Box
            style={{
              display: "grid",
              gridTemplateRows: `repeat(5, 40px)`,
              gridTemplateColumns: `repeat(5, 40px)`,
              gap: 4,
              justifyContent: "flex-end",
            }}
          >
            {Array.from({ length: 25 }).map(() => (
              <Image w={40} h={40} fallbackSrc="https://placehold.co/40x40" />
            ))}
          </Box>

          <Group align="center" mt="md">
            <TextInput placeholder="Your input for AI" style={{ flex: 1 }} />

            <Button>Prompt</Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Layout>
  );
};

export default PlayMultiAi;
