import React from "react";
import "./users.css";

import { DashboardEvent, DashboardNotifier } from "./dashboardNotifier";

export function Users(props) {
    const userName = props.userName;

    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        DashboardNotifier.addHandler(handleDashboardEvent);
        return () => {
            DashboardNotifier.removeHandler(handleDashboardEvent);
        }
    })

    function handleDashboardEvent(event) {
        setEvents([...events, event]);
    }

    function createMessageArray() {
        const messageArray = [];
        for (const [i, event] of events.entries()) {
          let message = 'unknown';
          if (event.type === DashboardEvent.Comment) {
            message = ` commented on a workout by ${event.value}`;
          } else if (event.type === DashboardEvent.Like) {
            message = ` liked a workout by ${event.value}`;
          } else if (event.type === DashboardEvent.Post) {
            message = " posted a new workout";
          }
    
          messageArray.push(
            <div className="message" key={i}>
              <span>{event.from.split('@')[0]}</span>
              {message}
            </div>
          );
        }
        return messageArray;
      }
    
      return (
        <div className="live-feed">
            <h1>LIVE FEED:</h1>
          <div>{createMessageArray()}</div>
        </div>
      );
}