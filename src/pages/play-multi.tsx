import {
  Box,
  Container,
  Image,
  LoadingOverlay,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ai from "../assets/images/ai.jpeg";
import { Layout } from "../components";
import { axios } from "../lib";
import classes from "../styles/Play.module.css";

const PlayMulti = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios
        .get<{ id: number; image: string; locked: boolean; name: string }[]>(
          "/categories/",
        )
        .then((response) => response.data),
  });

  if (isLoading) {
    return (
      <LoadingOverlay
        loaderProps={{ color: "blue.5", variant: "bars" }}
        visible
      />
    );
  }

  return (
    <Layout>
      <Container size="lg">
        <SimpleGrid cols={{ base: 2, xs: 3, sm: 4, md: 5, lg: 6 }} mt="xl">
          {data?.map((item) =>
            !item.locked ? (
              <Box
                component={Link}
                to={`${item.id}`}
                key={item.id}
                className={classes.category}
                data-locked={item.locked}
              >
                <Image
                  src={`${import.meta.env.VITE_API_URL}${item.image}`}
                  w="100%"
                  h="100%"
                />

                {item.locked && (
                  <IconLock size={48} className={classes["category-lock"]} />
                )}

                <Text
                  size="xl"
                  fw={700}
                  ta="center"
                  className={classes["category-title"]}
                >
                  {item.name}
                </Text>
              </Box>
            ) : (
              <Box
                component="a"
                key={item.id}
                className={classes.category}
                data-locked={item.locked}
              >
                <Image
                  src={`${import.meta.env.VITE_API_URL}${item.image}`}
                  w="100%"
                  h="100%"
                />

                {item.locked && (
                  <IconLock size={48} className={classes["category-lock"]} />
                )}

                <Text
                  size="xl"
                  fw={700}
                  ta="center"
                  className={classes["category-title"]}
                >
                  {item.name}
                </Text>
              </Box>
            ),
          )}

          <Box
            component={Link}
            to="ai"
            className={classes.category}
            data-locked={false}
          >
            <Image src={ai} w="100%" h="100%" />

            <Text
              size="xl"
              fw={700}
              ta="center"
              className={classes["category-title"]}
            >
              AI
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default PlayMulti;
