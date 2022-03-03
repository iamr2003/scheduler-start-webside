import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
//eventually figure out a different place to put the wasm pkg(I'd like it to be outside of src)
import init,{greet, Schedule} from './pkg/schedule_start.js'


init().then(()=>{
});

//lol I'll need to learn way more CSS

//this is the way? was having issue with hooks on imported wasm classes
//grr that import isn't working
// let schedule = Schedule.new(10);

//some dummy events
let runningEvent = {
  name:"Running",
  priority:1,
  time_start:1,
  time_end:10
}

let sleepingEvent = {
  name:"Sleeping",
  priority:2,
  time_start:11,
  time_end:35
}

//can eventually bundle priorities in an event
function Event(props){
  return (
    //need to figure out how to make this styling standard not px based
    <div className="Event-box" style={{height:(props.e.time_end -props.e.time_start)*20}}>
      <p><strong>{props.e.name}</strong></p> 
      <p>priority: {props.e.priority}</p>
      <p>From {props.e.time_start} - {props.e.time_end}</p>
    </div>
  )
}

//probably bloated
function EventList(props){
  return (
    props.events.map((event)=>
      <Event e={event}/>
    )
  )
}


function addEventAndCheck(){
  schedule.add_event_raw(1,10);
  console.log(schedule.toJSONString());
}

function App() {
  const [count, setCount] = useState(0);
  //I don't think I even need setter, since it'll modify itself
  // const [sched,setSched] = useState(Schedule.new(300)); 

  return (
    <div className="App">
      <header className="App-header">
        {/* <Event e={runningEvent} />
        <Event e={sleepingEvent}/> */}
        <EventList events={[runningEvent,sleepingEvent]}/>
        {/* <button onClick={()=>addEventAndCheck(sched)}>Click for message via wasm</button> */}
      </header>
    </div>
  )
}

export default App
