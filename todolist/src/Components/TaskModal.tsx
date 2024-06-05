import {
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { createTask, fetchTasksbyId, updateTask } from "../api";
import { useState, forwardRef, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
interface FormProps {
  title: string;
  category: string;
  assignee: string;
  priority: number;
  description: string;
  completed: Date;
  status: number;
}
interface TaskModalProps {
  isOpen: boolean;
  edit: boolean;
  id: string;
  onClose: () => void;
  refetch: () => void;
}

function TaskModal({ isOpen, onClose, refetch, edit, id }: TaskModalProps) {
  const [lastDate, setLastDate] = useState(new Date());

  const toast = useToast();

  const customDateInput = ({ value, onClick, onChange }: any, ref: any) => (
    <Input
      autoComplete="off"
      background="white"
      value={value}
      ref={ref}
      onClick={onClick}
      onChange={onChange}
    />
  );

  customDateInput.displayName = "DateInput";

  const CustomInput = forwardRef(customDateInput);
  const {
    isPending,
    data,
    refetch: refetchEdit,
  } = useQuery({
    queryKey: ["edit-tasks", id],
    queryFn: () => fetchTasksbyId(id),
  });
  const [assignee, setAssignee] = useState(edit ? data?.assignee : "");
  const [category, setCategory] = useState(edit ? data?.category : "");
  const [priority, setPriority] = useState(edit ? data?.priority : "");
  const [status, setStatus] = useState(edit ? data?.status : "");

  const { handleSubmit, register, setValue, reset } = useForm<FormProps>();

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
    setValue("category", e.target.value);
  };
  const handleAssigneChange = (e: any) => {
    setAssignee(e.target.value);
    setValue("assignee", e.target.value);
  };
  const handlePriorityChange = (e: any) => {
    setPriority(e.target.value);
    setValue("priority", e.target.value);
  };
  const handleDateChange = (date: Date) => {
    setValue("completed", date);
    setLastDate(date);
  };
  const handleStatusChange = (e: any) => {
    setValue("status", e.target.value);
    setStatus(e.target.value);
  };
  const onSubmit = async (submitted: FormProps) => {
    if (!edit) {
      const create = await createTask({
        title: submitted.title,
        description: submitted.description,
        category: submitted.category,
        assignee: submitted.assignee,
        priority: submitted.priority,
        completed: submitted.completed,
        status: "0",
      });
      if (create) {
        toast({
          title: "Task Created Succesfully",
          description: `Task ${create.title} created`,
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: "Task Created Failed",
          description: `Task ${create.title} could not be created`,
          status: "error",
          isClosable: true,
        });
      }
    } else {
      const update = await updateTask(id, {
        title: submitted.title ?? data?.title,
        description: submitted.description ?? data?.description,
        category: submitted.category ?? category,
        assignee: submitted.assignee ?? assignee,
        priority: submitted.priority ?? priority,
        completed: submitted.completed ?? lastDate,
        status: submitted.status ?? data?.status,
      });
      if (update) {
        toast({
          title: "Task Updated Succesfully",
          description: `Task ${update.title} updated`,
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: "Task Updated Failed",
          description: `Task ${update.title} could not be updated`,
          status: "error",
          isClosable: true,
        });
      }
    }

    refetch();
    refetchEdit();
    reset();
    onClose();
  };
  useEffect(() => {
    setAssignee(edit && !isPending ? data?.assignee : "");
    setCategory(edit && !isPending ? data?.category : "");
    setPriority(edit && !isPending ? data?.priority : "");
    setLastDate(edit && !isPending ? new Date(data?.completed) : new Date());
    setStatus(data?.status);
  }, [data, isOpen]);

  const handleModalClose = () => {
    reset();
    refetchEdit();
    setLastDate(new Date());
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Task</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Flex direction="column" gap="0.5rem">
              <FormControl>
                <FormLabel>Please fill in all the information</FormLabel>
                <Text mt=".5rem" mb=".5rem">
                  Title
                </Text>
                <Input
                  id="name"
                  placeholder="Task name"
                  defaultValue={edit ? data?.title : ""}
                  {...register("title", {
                    required: "This is required",
                  })}
                />
                <Text mt=".5rem" mb=".5rem">
                  Description
                </Text>
                <Input
                  id="name"
                  type="text"
                  placeholder="Describe the task"
                  defaultValue={edit ? data?.description : ""}
                  {...register("description", {
                    required: "This is required",
                  })}
                />
                <Flex justifyContent="space-between" gap=".5rem">
                  <Box>
                    <Text mt=".5rem" mb=".5rem">
                      Category
                    </Text>
                    <Select
                      placeholder="Select Category"
                      value={category}
                      onChange={(e) => handleCategoryChange(e)}
                    >
                      <option value="Developer Team">Developer Team</option>
                      <option value="Hr team">Hr team</option>
                    </Select>
                  </Box>
                  <Box>
                    <Text mt=".5rem" mb=".5rem">
                      Assignee
                    </Text>
                    <Select
                      placeholder="Assign Task"
                      value={assignee}
                      onChange={(e) => handleAssigneChange(e)}
                    >
                      <option value="John 1">John 1</option>
                      <option value="John 2">John 2</option>
                      <option value="John 3">John 3</option>
                      <option value="John 4">John 4</option>
                    </Select>
                  </Box>
                </Flex>
                <Flex justifyContent="space-between" gap=".5rem">
                  <Box>
                    {" "}
                    <Text mt=".5rem" mb=".5rem">
                      Priority
                    </Text>
                    <Select
                      placeholder="Set Priority"
                      value={priority}
                      onChange={(e) => handlePriorityChange(e)}
                    >
                      <option value={0}>Low Priority</option>
                      <option value={1}>Medium Priority</option>
                      <option value={2}>High Priority</option>
                    </Select>
                  </Box>
                  <Box>
                    <Text m=".5rem">Deadline</Text>
                    <DatePicker
                      selected={lastDate}
                      onChange={(date) => handleDateChange(date!)}
                      customInput={<CustomInput />}
                    />
                  </Box>
                </Flex>
                {edit && (
                  <Flex width="100%">
                    <Box>
                      <Text mt=".5rem" mb=".5rem">
                        Status
                      </Text>
                      <Select
                        value={status}
                        onChange={(e) => handleStatusChange(e)}
                      >
                        <option value={0}>To Do</option>
                        <option value={1}>Doing</option>
                        <option value={2}>Done</option>
                      </Select>
                    </Box>
                  </Flex>
                )}
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter gap="1rem">
            <Button colorScheme="teal" type="submit">
              Submit
            </Button>
            <Button colorScheme="gray" mr={3} onClick={handleModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default TaskModal;
