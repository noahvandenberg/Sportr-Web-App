// test doc for chakra

import { Collapse, Box, Button, VStack, Heading, useDisclosure } from "@chakra-ui/react";
import AttendeeList from "./AttendeeList";

const Attendees = (props) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  console.log('logging props from attendees list', props.event[0].user_owner)
  return (
    <>
      <Button
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
        variant={"link"}
        onClick={onToggle}
      >
        {props.event[0].user_owner} signed up &bull; {props.event.spotsRemaining}{" "}
        spots remaining
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          pl="20px"
          pr="20px"
          py="10px"
          pb="25px"
          color="black"
          mt="4"
          bg="gray.50"
          rounded="md"
          shadow="md"
          mr={2}
          onClick={onToggle}
        >
          <AttendeeList data={props.event}></AttendeeList>
        </Box>
      </Collapse>
    </>
  );
};

export default Attendees;
