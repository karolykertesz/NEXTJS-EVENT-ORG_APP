// import firebase from "./helpers/firebase";
import FirebaseClient from "./helpers/firebase";
FirebaseClient();
import firebase from "firebase";
const db = firebase.firestore();

export const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Programming for everyone",
    description:
      "Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
    location: "Somestreet 25, 12345 San Somewhereo",
    date: "2021-05-12",
    image: "images/coding-event.jpg",
    isFeatured: false,
  },
  {
    id: "e2",
    title: "Networking for introverts",
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: "New Wall Street 5, 98765 New Work",
    date: "2021-05-30",
    image: "images/introvert-event.jpg",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Networking for extroverts",
    description:
      "You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.",
    location: "My Street 12, 10115 Broke City",
    date: "2022-04-10",
    image: "images/extrovert-event.jpg",
    isFeatured: true,
  },
];

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export async function getAllEvents() {
  const allEv = [];
  try {
    const col = await db
      .collection("events")
      .orderBy("year", "asc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((i) => {
          allEv.push({
            id: i.id,
            ...i.data(),
          });
        });
      });
  } catch (err) {
    console.log(err);
  }
  return allEv;
}

export async function getAllAStartUp() {
  const arr = [];
  try {
    const ref = await db
      .collection("startup")
      .get()
      .then((snapshot) => {
        snapshot.forEach((i) => {
          arr.push({
            id: i.id,
            ...i.data(),
          });
        });
      });
  } catch (err) {
    console.log(err);
  }
  return arr;
}
export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function findDate(year, month) {
  const arr = [];
  try {
    const ref = await db
      .collection("events")
      .where("year", "==", year)
      .where("month", "==", month)
      .get()
      .then((snapshot) => {
        snapshot.forEach((i) => {
          arr.push({
            id: i.id,
            ...i.data(),
          });
        });
      });
  } catch (err) {
    throw new err();
  }
  return arr;
}

export const getKeys = async () => {
  const keys = [];
  try {
    const k = await db.collection("user_add_events").onSnapshot((snapshot) => {
      const ids = snapshot.docs.forEach((i) => {
        keys.push(i.id);
      });
    });
  } catch (err) {
    console.log(err);
  }
  return keys;
};

export const user_events_data = async () => {
  const docref = db.collection("user_add_events").get();
  const dockArray = (await docref).docs.map((item) => ({
    id: item.id,
    start: item.data().starts.toMillis(),
    end: item.data().ends.toMillis(),
    category: item.data().category,
    added_by: item.data().added_by,
    location: item.data().location,
    attendies: item.data().attendies,
    premium: item.data().premium,
  }));
  return dockArray;
};

export const findById = async (id) => {
  let ren = {};
  try {
    let t = await db
      .collection("user_add_events")
      .doc(id)
      .get()
      .then((item) => {
        ren = {
          id: item.id,
          start: item.data().starts.toMillis(),
          end: item.data().ends.toMillis(),
          category: item.data().category,
          added_by: item.data().added_by,
          location: item.data().location,
          attendies: item.data().attendies,
          premium: item.data().premium,
        };
      });
  } catch (err) {
    console.log(err);
  }
  return ren;
};

export const language = [
  "english",
  "magyar",
  "espanol",
  "deutch",
  "italiano",
  "русский",
];

export const categories = [
  "indian",
  "french",
  "german",
  "american",
  "italian",
  "vegan",
  "vegetarian",
  "create",
];

const categoryimages = [
  {
    name: "indian",
    src: "https://cdn.pixabay.com/photo/2017/09/09/12/09/india-2731812_960_720.jpg",
  },
  {
    name: "french",
    src: "https://cdn.pixabay.com/photo/2019/07/11/12/15/luxury-4330594_960_720.jpg",
  },
  {
    name: "german",
    src: "https://cdn.pixabay.com/photo/2017/10/01/12/00/herb-2805224_960_720.jpg",
  },
  {
    name: "american",
    src: "https://cdn.pixabay.com/photo/2017/02/25/15/23/barbecue-2098020_960_720.jpg",
  },
  {
    name: "vegan",
    src: "https://cdn.pixabay.com/photo/2017/07/27/17/30/tray-2546077_960_720.jpg",
  },
  {
    name: "vegetarian",
    src: "https://cdn.pixabay.com/photo/2018/04/13/17/14/vegetable-skewer-3317060_960_720.jpg",
  },
  {
    name: "italian",
    src: "https://cdn.pixabay.com/photo/2021/05/18/15/15/pasta-6263653_960_720.jpg",
  },
  {
    name: "create",
    src: "https://cdn.pixabay.com/photo/2017/11/25/17/17/sandwich-2977251_960_720.jpg",
  },
];
