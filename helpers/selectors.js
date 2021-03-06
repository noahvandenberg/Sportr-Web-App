export function getEventsForUser(state, user_id) {
  const { events, users, users_events } = state;

  // Get all users_events pertaining to the user_id1
  const eventRelations = users_events.filter(relationObj => relationObj.user_id === Number(user_id) && relationObj.value === true);

  // Grab all the event ids from those user events
  const eventIds = eventRelations.map(relationObj => relationObj.event_id);

  // Grab all events that match event ids in eventIds
  const usersEvents = events.filter(event => eventIds.includes(event.id))

  const sortedUsersEvents = usersEvents.sort( ( a, b ) => a.datetime > b.datetime ? -1 : 1)

  const gtgUsersEvents = sortedUsersEvents.filter(event =>  Date.now() < Date.parse(event.datetime) + (8.64e+7/2) )

  return gtgUsersEvents
}

export function getUsersForEvent(state, event_id) {
  const { events, users, users_events } = state;

  // Get all users_events pertaining to the event_id2
  const eventRelations = users_events.filter(relationObj => relationObj.event_id === event_id);

  // Grab all the event ids from those user events
  const userIds = eventRelations.map(relationObj => relationObj.user_id);

  // Grab all events that match event ids in eventIds
  const eventsUsers = users.filter(user => userIds.includes(user.id))

  return eventsUsers
}

export function getSignedUpUserCountForEvent(state, event_id) {
  const { events, users, users_events } = state;

  // Get all users_events pertaining to the event_id3
  const eventRelations = users_events.filter(relationObj => relationObj.event_id === event_id);

  // Grab all the event ids from those user events
  const userIds = eventRelations.map(relationObj => relationObj.user_id);

  // Grab all events that match event ids in eventIds
  const eventsUsers = users.filter(user => userIds.includes(user.id))

  const count = eventsUsers.length

  return count
}

export function getPotentialEventsForUser(state, user_id) {
  // console.log('PING','GETTING POTENTIAL EVENTS', state)
  const { events, users, users_events } = state;

  // ++ NEED TO ADD RANGE PREFERENCE
  // ++ NEED TO FILTER EVENTS FOR CAPACITY
  // ++ NEED TO FILTER FOR USERS SPORTS

  // Grab user object for signed in user
  const user = users[0] ? users.find(user => user.id == Number(user_id)) : null

  const responedCheck = (event) => {

    const userUsersEvents = users_events.filter(user_event => user_event.user_id == user_id)
    const eventIdsOfUserUsersEvents = userUsersEvents.map( user_event => user_event.event_id)

    if (eventIdsOfUserUsersEvents.includes(event.id)) {
      return false
    }

    return true
  }

  // returns false when a user should not see an event due to gender prefrences
  const sameGenderCheck = (event) => {

    const eventOwner = users.find(user => user.id == event.user_owner)

    // filter out events that are same gender and you are not the same gender as the event owner
    if (event.same_gender && user.gender !== eventOwner.gender) {
      return false
    }

    // return true in all other cases
    return true
  }

  // returns false when a user is outside a +/- 5 year age gap
  const similarAgeCheck = (event) => {

    const getUsersAge = (user) => Math.floor((Date.now() - Date.parse(user.birth_date))/3.154e+10)
    const plusMinusFive = (x , y) => (x - y) < 5 && (y - x)  > -5 && (x - y) > -5 && (y - x)  < 5 ? true : false

    const eventOwner = users.find(user => user.id == event.user_owner)

    const userAge = getUsersAge(user)
    const eventOwnerAge = getUsersAge(eventOwner)

    // Filter out events the require a similar age that a user does not meet
    if (event.similar_age && !plusMinusFive(userAge, eventOwnerAge)) {
      return false
    }

    return true
  }

  const sportCheck = (event) => {

    const user = users.find(user => user.id == user_id)

    const userSportsArray = Object.keys(user.sports).filter(sport => user.sports[sport] === true)

    // console.log(' POTENTIAL', userSportsArray.includes(event.sport))


    return userSportsArray.includes(event.sport) ? true : false
    
  }

  const capacityCheck = (event) => {

    const userEventsForEvent = users_events.filter(user_event => user_event.event_id === event.id).length

    const eventCapacity = event.capacity_limit;

    // console.log(' POTENTIAL', userEventsForEvent)

    return userEventsForEvent < eventCapacity ? true : false
  }

  const oldEventCheck = (event) => {
    
    // console.log('DATE', Date.parse(event.datetime), Date.now(), Date.now() < Date.parse(event.datetime))

    return Date.now() < Date.parse(event.datetime) ? true : false
  }
  

  // Filter out events that don't match a users preferences
  const potentialEvents = users[0] ? events.filter( event => oldEventCheck(event) && capacityCheck(event) && sportCheck(event) && responedCheck(event) && sameGenderCheck(event) && similarAgeCheck(event)) : [] //

  const sortedPotentialEvents = potentialEvents.sort(( a, b ) => a.datetime > b.datetime ? -1 : 1 )

  // console.log('SORTED', sortedPotentialEvents)

  return sortedPotentialEvents
}

export function getUserDataForProfile(state, user_id) {

  const { users, events, users_events } = state ? state : ''

  const userData = state ? ( users[0] ? users.filter( user => user.id === user_id) : [] ) : ''

  return userData
}