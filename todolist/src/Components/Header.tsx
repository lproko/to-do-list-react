import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import TaskModal from "./TaskModal";
import { fetchTasks } from "../api";
import { useQuery } from "@tanstack/react-query";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { reset } = useForm();

  const { refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });
  const handleModalOpen = () => {
    reset();
    onOpen();
  };

  return (
    <Flex height="30vh" flexDirection="column">
      <Flex
        height="20vh"
        alignItems="center"
        width="100%"
        justifyContent="center"
      >
        <Text className="heading__title">To-Do List</Text>
      </Flex>
      <Flex justifyContent="center">
        <Flex pt="2rem">
          <Button colorScheme="blue" onClick={handleModalOpen}>
            Add New Task +
          </Button>
        </Flex>
      </Flex>

      <TaskModal
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
        edit={false}
        id=""
      />
    </Flex>
  );
}

export default Header;
