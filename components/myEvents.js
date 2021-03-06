import {
  useDisclosure,
  SimpleGrid,
  Box,
  Container,
  VStack,
  Heading,
} from "@chakra-ui/react";
import SportEvent from "./SportEvent";
import styles from "./layout.module.css";
import Link from 'next/link';

import { getEventsForUser } from "../helpers/selectors";


export default function EventFeed(props) {
  const event1 = {
    imageUrl: "https://pbs.twimg.com/media/CpMM9Z3UAAA_RPg.jpg",
    signedUp: 3,
    spotsRemaining: 2,
    title: "Spikeball at Jericho",
    description:
      "Summer is upon us! Let's get out there and play some spike ball people, looking for chill vibes, bring your friends.",
    new: true,
  };

  const event2 = {
    imageUrl:
      "https://crs4rec.com/wp-content/uploads/2018/09/moody-park-gallery-014.jpg?x65263",
    signedUp: 6,
    spotsRemaining: 2,
    title: "Basketball at Moody Park",
    description: "Looking for more for a pickup game at the Moody Park courts",
    new: false,
    date: 'March 29',
  };

  const event3 = {
    imageUrl:
      "https://604now.com/wp-content/uploads/2015/06/english-bay-beach-1280x720.jpg",
    signedUp: 1,
    spotsRemaining: 7,
    title: "Attention beach volleyballers",
    description: "I'll bring the net and balls, you bring the stoke!",
    new: false,
  };

  const myEvents = getEventsForUser(state, props.user_id)

  const myEventsReact = myEvents.map(event => (
    <SportEvent key={event.id} onClose={onClose} event={event} />
  ));

  const { isOpen, onClose, onToggle } = useDisclosure();
  return (
    <>
      <Container maxW="container.md">
        <Box rounded="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <VStack
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            w="full"
            h="full"
            p={10}
            spacing={10}
          >
            <SportEvent onClose={onClose} event={event1}></SportEvent>
            
            <SportEvent onClose={onClose} event={event2}></SportEvent>

            <SportEvent onClose={onClose} event={event3}></SportEvent>

            {/* {myEventsReact} */}
          </VStack>
        </Box>
       
      </Container>
    </>
  );
}
