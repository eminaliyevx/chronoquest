import { Box, Container, Image, SimpleGrid, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import slugify from "slugify";
import crossword from "../assets/images/crossword.jpg";
import eraInquiry from "../assets/images/history.jpg";
import puzzles from "../assets/images/puzzles.jpg";
import treasureHunting from "../assets/images/treasure-hunting.webp";
import { Layout } from "../components";
import classes from "../styles/Play.module.css";

const GAMES = [
  {
    title: "Crossword",
    image: crossword,
  },
  {
    title: "Treasure Hunting",
    image: treasureHunting,
  },
  {
    title: "Puzzles",
    image: puzzles,
  },
  {
    title: "Era Inquiry",
    image: eraInquiry,
  },
];

const PlaySingleCategory = () => {
  return (
    <Layout>
      <Container size="lg">
        <Title>Choose a game</Title>

        <SimpleGrid cols={{ base: 2, xs: 3, sm: 4, md: 5, lg: 6 }} mt="xl">
          {GAMES.map((game, index) => (
            <Box
              component={Link}
              to={slugify(game.title, { lower: true })}
              key={index}
              className={classes.game}
            >
              <Image src={game.image} w="100%" h="100%" />
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default PlaySingleCategory;
