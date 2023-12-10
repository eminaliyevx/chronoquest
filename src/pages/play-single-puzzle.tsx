import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  LoadingOverlay,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DragEvent, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../components";
import { axios } from "../lib";

const PlaySinglePuzzle = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const currentTile = useRef<HTMLImageElement>();
  const otherTile = useRef<HTMLImageElement>();

  const params = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["puzzle", params.categoryId, params.puzzleId],
    queryFn: () =>
      axios
        .get(`/categories/${params.categoryId}/puzzles/`)
        .then((response) => response.data),
  });

  const { mutate } = useMutation({
    mutationFn: () => {
      const pieces = document.querySelectorAll(
        "[data-piece]",
      ) as NodeListOf<HTMLImageElement>;

      let result = Array.from({ length: 5 }, () => Array(5).fill(null));

      [...pieces].forEach((piece) => {
        const element = puzzleImages.find(
          (puzzleImage: any) => puzzleImage.image === piece.src,
        );

        if (element) {
          const row = piece.dataset.row;
          const col = piece.dataset.col;

          if (row && col) {
            result[+row][+col] = +element.id;
          }
        }
      });

      return axios.post("/puzzles/submit/", {
        puzzle: +params.puzzleId!,
        result,
      });
    },
    onSuccess: () => {
      notifications.show({
        message: "Congratulations 🎉. Redirecting in 5...",
      });

      setTimeout(() => {
        navigate(`/play/single/${params.categoryId}/puzzles`);
        queryClient.invalidateQueries({ queryKey: ["puzzles"] });
      }, 5000);
    },
    onError: () => {
      notifications.show({
        message: "Incorrect solution",
        icon: <IconX size={20} />,
        color: "red",
      });
    },
  });

  const puzzle = useMemo(() => {
    return data?.puzzles.find((item: any) => item.id == params.puzzleId);
  }, [data, params.puzzleId]);

  const puzzleImages = useMemo(() => {
    return data?.puzzles
      .find((item: any) => item.id == params.puzzleId)
      .images.map((e: any) => ({
        id: e.id,
        image: `${import.meta.env.VITE_API_URL}${e.image}`,
      }));
  }, [data, params.puzzleId]);

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
        <Flex justify="space-between" align="center" mb="xl">
          <Title>Play puzzle</Title>

          <Button
            type="button"
            variant="filled"
            size="md"
            color="blue.5"
            radius="xl"
            px="xl"
            onClick={() => mutate()}
          >
            Finish
          </Button>
        </Flex>

        <Box
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(2, 1fr)`,
            gap: 16,
          }}
        >
          <Box
            mb="xl"
            style={{
              display: "grid",
              gridTemplateRows: `repeat(${puzzle.row}, ${puzzle?.images[0].height}px)`,
              gridTemplateColumns: `repeat(${puzzle.column}, ${puzzle?.images[0].width}px)`,
            }}
          >
            {puzzle?.images.map((item: any, index: number) => (
              <Box
                key={`result-${index}`}
                w={item.width}
                h={item.height}
                bg="dark.4"
                style={{
                  border: "1px solid var(--mantine-color-blue-5)",
                }}
              >
                <Image
                  w={item.width}
                  h={item.height}
                  fallbackSrc={`https://placehold.co/${item.width}x${item.height}`}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDragDrop}
                  onDragEnd={handleDragEnd}
                  data-piece
                  data-row={Math.floor(index / 5)}
                  data-col={index % 5}
                />
              </Box>
            ))}
          </Box>

          <Flex wrap="wrap" gap={16}>
            {puzzle.images.map((item: any) => (
              <Image
                key={item.id}
                src={`${import.meta.env.VITE_API_URL}${item.image}`}
                w={item.image.width}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDragDrop}
                onDragEnd={handleDragEnd}
              />
            ))}
          </Flex>
        </Box>
      </Container>
    </Layout>
  );
};

export default PlaySinglePuzzle;
