import EventItem from "./EventItem";
import classes from "./event-list.module.css";
const EventList = (props) => {
  const { item } = props;
  return (
    <div>
      <ul className={classes.list}>
        {item.map((item, indx) => (
          <EventItem
            key={indx}
            id={item.id}
            title={item.title}
            image={item.image}
            location={item.location}
            date={item.date}
          />
        ))}
      </ul>
    </div>
  );
};

export default EventList;
