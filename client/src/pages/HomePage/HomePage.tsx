import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Fade,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTasksData } from "./hooks/use-tasks-data";
import { CreateTask } from "./componenets/CreateTask/CreateTask";
import { DeleteIcon } from "@chakra-ui/icons";

export const HomePage = () => {
  const tasksData = useTasksData();

  console.log("tasks data: ", tasksData);

  return (
    <Container maxW={"1024"} position={"relative"} minHeight={"100vh"}>
      <Button
        onClick={() => {
          localStorage.removeItem("token");
          // Using full reload on purpose to clear all possible memory data
          window.location.href = "/auth/login";
        }}
      >
        Log out
      </Button>
      <Fade in={tasksData.loading}>
        <Box position={"absolute"} top={"50%"} left={"50%"} transform={"translate(-50%, -50%)"} zIndex={10}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Box>
      </Fade>
      <Fade in={tasksData.hasBeenLoaded}>
        <Box mb={3}>
          <CreateTask form={tasksData.createForm} loading={tasksData.createTaskLoading} />
        </Box>
        <Heading as="h3" size="lg">
          My Tasks
        </Heading>
        <Divider my={3} />
        {tasksData.data.count === 0 && (
          <Box textAlign={"center"} mt={12}>
            <Text fontSize="xl">You don't have any tasks yet</Text>
          </Box>
        )}
        <VStack align="stretch">
          {tasksData.data.entities.map((task) => (
            <Card key={task._id}>
              <CardHeader>
                <Flex>
                  <Box>{task.title}</Box>
                  <Box w={"10px"} />
                  <Box ml={"auto"}>
                    <Button colorScheme={"red"} onClick={() => tasksData.remove(task._id)}>
                      <DeleteIcon />
                    </Button>
                  </Box>
                </Flex>
              </CardHeader>
            </Card>
          ))}
        </VStack>
      </Fade>
    </Container>
  );
};
