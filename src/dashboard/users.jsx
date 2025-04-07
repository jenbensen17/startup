import React from "react";

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
          } else if (event.type === DashboardEvent.Post) {
            message = `started a new game`;
          } else if (event.type === DashboardEvent.Post) {
            message = "your mom";
          }
    
          messageArray.push(
            <div key={i} className='event'>
              <span className={'player-event'}>{event.from.split('@')[0]}</span>
              {message}
            </div>
          );
        }
        return messageArray;
      }
    
      return (
        <div className='players'>
          <span className='player-name'>{userName}</span>
          <div id='player-messages'>{createMessageArray()}</div>
        </div>
      );
}