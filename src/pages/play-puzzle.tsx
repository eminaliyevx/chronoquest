import { Box, Container, Flex, Image, Title } from "@mantine/core";
import { DragEvent, useRef } from "react";
import { Layout } from "../components";

const PlayPuzzle = () => {
  const currentTile = useRef<HTMLImageElement>();
  const otherTile = useRef<HTMLImageElement>();

  function handleDragStart(event: DragEvent<HTMLImageElement>) {
    currentTile.current = event.target as HTMLImageElement;
  }

  function handleDragOver(event: DragEvent<HTMLImageElement>) {
    event.preventDefault();
  }

  function handleDragEnter(event: DragEvent<HTMLImageElement>) {
    event.preventDefault();
  }

  function handleDragLeave() {}

  function handleDragDrop(event: DragEvent<HTMLImageElement>) {
    otherTile.current = event.target as HTMLImageElement;
  }

  function handleDragEnd() {
    if (currentTile.current && otherTile.current) {
      if (currentTile.current.src.includes("placehold")) {
        return;
      }

      let currentImage = currentTile.current.src;
      let otherImage = otherTile.current.src;

      currentTile.current.src = otherImage;
      otherTile.current.src = currentImage;
    }
  }

  return (
    <Layout>
      <Container size="lg">
        <Title mb="md">Play puzzle</Title>

        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 100px)",
            justifyContent: "center",
            // cursor: "pointer",
          }}
        >
          {Array.from({ length: 25 }).map((_, index) => (
            <Box
              key={`box${index}`}
              w={100}
              h={100}
              bg="dark.4"
              style={{
                border: "1px solid var(--mantine-color-blue-5)",
              }}
            >
              <Image
                w={100}
                h={100}
                fallbackSrc="https://placehold.co/100x100"
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDragDrop}
                onDragEnd={handleDragEnd}
              />
            </Box>
          ))}
        </Box>

        <Flex wrap="wrap" gap={16}>
          {Array.from({ length: 25 }).map((_, index) => (
            <Image
              key={index}
              src={`/public/${index + 1}.jpg`}
              w={100}
              h={100}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDragDrop}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Flex>
      </Container>
    </Layout>
  );
};

export default PlayPuzzle;
