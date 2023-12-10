import { Box, Button, Container, Title } from "@mantine/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components";
import "../styles/global.css";

const animateBackground = () => {
  const colors = ["#339af0", "#ff6b6b", "#51cf66", "#fcc419"];
  const dotsCount = 50;
  const dots = [];

  for (let i = 0; i < dotsCount; i++) {
    let dot = document.createElement("div");
    dot.classList.add("dot");
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];
    dot.style.left = `${Math.floor(Math.random() * 100)}vw`;
    dot.style.top = `${Math.floor(Math.random() * 100)}vh`;
    dot.style.transform = `scale(${Math.random()})`;
    dot.style.width = dot.style.height = `${Math.random()}rem`;

    dots.push(dot);
    document.querySelector("main")!.append(dot);
  }

  dots.forEach((element, index) => {
    let to = {
      x: Math.random() * (index % 2 === 0 ? -11 : 11),
      y: Math.random() * 12,
    };

    element.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: `translate(${to.x}rem, ${to.y}rem)` },
      ],
      {
        duration: (Math.random() + 1) * 2000,
        direction: "alternate",
        fill: "both",
        iterations: Infinity,
        easing: "ease-in-out",
      },
    );
  });
};

const Home = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    animateBackground();

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <Layout>
      <Container size="lg">
        <Box
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <Title size={64} mb="xl" ta="center">
            CHRONO
            <Title component="span" c="blue.5" size={64} ta="center">
              QUEST
            </Title>
          </Title>

          <Button
            component={Link}
            to="play"
            color="blue.5"
            size="xl"
            style={{ textTransform: "uppercase" }}
          >
            Play Now
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
