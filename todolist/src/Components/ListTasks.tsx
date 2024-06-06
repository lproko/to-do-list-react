import {
  Flex,
  Box,
  Text,
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import { deleteTasksbyId, fetchTasks } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TaskModal from "./TaskModal";

function ListTasks() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const [taskId, setTaskId] = useState("");
  const [search, setSearch] = useState("");
  const { isPending, data, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const filteredTodos = data?.filter((task: any) =>
    ["category", "assignee", "priority", "description"].some((key) =>
      task[key].toLowerCase().includes(search.toLowerCase())
    )
  );
  const [toDoTasks, setToDoTask] = useState(
    filteredTodos?.filter((task: any) => task?.status === "0")
  );
  const [doingTasks, setDoingTask] = useState(
    filteredTodos?.filter((task: any) => task?.status === "1")
  );
  const [doneTasks, setDoneTask] = useState(
    filteredTodos?.filter((task: any) => task?.status === "2")
  );
  const [deleteTask, setDeleteTask] = useState("");
  useEffect(() => {
    setToDoTask(filteredTodos?.filter((task: any) => task?.status === "0"));
    setDoingTask(filteredTodos?.filter((task: any) => task?.status === "1"));
    setDoneTask(filteredTodos?.filter((task: any) => task?.status === "2"));
  }, [data, search]);

  const handleModalOpen = (id: string) => {
    setTaskId(id);
    onOpen();
  };

  const handleDelete = async () => {
    await deleteTasksbyId(deleteTask);
    refetch();
    onCloseDelete();
  };
  return (
    <Flex flexDirection="column">
      <Flex w="100%" mt=".5rem" flexDirection="column" alignItems="center">
        <Text>Filter</Text>
        <Input
          w="20%"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          mb={4}
        />
      </Flex>

      <Flex p={7} w="100%" justifyContent="space-between">
        <Flex
          bg="grey"
          w="25%"
          justifyContent="center"
          border="1px solid gray"
          borderRadius="2px"
        >
          <Text color="white">To Do</Text>
          <Box
            ml="1rem"
            width="25px"
            textAlign="center"
            bg="white"
            borderRadius="50%"
          >
            {toDoTasks && toDoTasks?.length}
          </Box>
        </Flex>
        <Flex
          bg="purple"
          w="25%"
          justifyContent="center"
          border="1px solid gray"
          borderRadius="2px"
        >
          <Text color="white">Doing</Text>
          <Box
            ml="1rem"
            width="25px"
            textAlign="center"
            bg="white"
            borderRadius="50%"
          >
            {doingTasks && doingTasks?.length}
          </Box>
        </Flex>
        <Flex
          bg="lightgreen"
          w="25%"
          justifyContent="center"
          border="1px solid gray"
          borderRadius="2px"
        >
          <Text color="white">Done</Text>
          <Box
            ml="1rem"
            width="25px"
            textAlign="center"
            bg="white"
            borderRadius="50%"
          >
            {doneTasks && doneTasks?.length}
          </Box>
        </Flex>
      </Flex>
      <Flex p={7} height="100vh" pt={5} w="100%" justifyContent="space-between">
        <Flex
          w="25%"
          overflowX="hidden"
          overflowY="auto"
          border="1px solid gray"
          borderRadius="2px"
          flexDirection="column"
        >
          {!isPending &&
            toDoTasks &&
            toDoTasks.map((task: any) => {
              return (
                <Flex
                  key={task.id}
                  height="200px"
                  justifyContent="center"
                  w="100%"
                >
                  <Card w="90%">
                    <CardBody>
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{task.title}</Heading>
                        <Text>{task.description}</Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          onClick={() => handleModalOpen(task.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => {
                            setDeleteTask(task.id);
                            onOpenDelete();
                          }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                </Flex>
              );
            })}
        </Flex>
        <Flex
          w="25%"
          overflowX="hidden"
          overflowY="auto"
          border="1px solid gray"
          borderRadius="2px"
          flexDirection="column"
        >
          {!isPending &&
            doingTasks &&
            doingTasks.map((task: any) => {
              return (
                <Flex
                  key={task.id}
                  height="200px"
                  justifyContent="center"
                  w="100%"
                >
                  <Card w="90%">
                    <CardBody>
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{task.title}</Heading>
                        <Text>{task.description}</Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          onClick={() => handleModalOpen(task.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => {
                            setDeleteTask(task.id);
                            onOpenDelete();
                          }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                </Flex>
              );
            })}
        </Flex>
        <Flex
          w="25%"
          overflowX="hidden"
          overflowY="auto"
          border="1px solid gray"
          borderRadius="2px"
          flexDirection="column"
        >
          {!isPending &&
            doneTasks &&
            doneTasks.map((task: any) => {
              return (
                <Flex
                  key={task.id}
                  height="200px"
                  justifyContent="center"
                  w="100%"
                >
                  <Card w="90%">
                    <CardBody>
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{task.title}</Heading>
                        <Text>{task.description}</Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          onClick={() => handleModalOpen(task.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => {
                            setDeleteTask(task.id);
                            onOpenDelete();
                          }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                </Flex>
              );
            })}
        </Flex>
        <TaskModal
          isOpen={isOpen}
          onClose={onClose}
          refetch={refetch}
          edit={true}
          id={taskId}
        />
        <Modal
          isCentered
          onClose={onCloseDelete}
          isOpen={isOpenDelete}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this task</ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="ghost" onClick={onCloseDelete}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
}

export default ListTasks;
