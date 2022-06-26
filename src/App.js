import { useState } from "react";
import InputForm from "./components/InputForm";
import FilterSelect from "./components/FilterSelect";
import RemindersList from "./components/ReminderList";
import './App.css'

function App() {
  const [reminders, setReminders] = useState();
  const [userInput, setUserInput] = useState();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const addNewReminder = (itemToAdd) => {
    if (reminders === undefined) {
      setReminders([itemToAdd]);
    } else {
      setReminders([...reminders, itemToAdd]);
    }
  };
  
  const filteredList = filterList(reminders, selectedFilter);

 

  function filterList(reminders, selectedFilter){
    if(selectedFilter === 'all') {
      return reminders;
    }else {
      let numberOfDays;

      switch(selectedFilter){
        case '2day':
          numberOfDays = 2;
          break;
        case '1week':
          numberOfDays = 7;
          break;
        case '30days':
          numberOfDays = 30;
          break;
        default:
          numberOfDays = 0;
          break;
      }

      const result = reminders.filter(reminder => {
        const todayDate = new Date().toISOString().substr(0, 10);
        const todayTime = new Date(todayDate).getTime();
        const dueTime = new Date(reminder.dueDate).getTime();
        return dueTime < (todayTime + (numberOfDays * 86400000));
      })

      return result;
    }
  }

  function setIsComplete(isComplete,index){
    const newReminders = [ ...reminders.slice(0, index),
                          {...reminders[index],isComplete}, 
                           ...reminders.slice(index+1) ];
    setReminders(newReminders);
  }

  return (
    <div>
      <InputForm
        userInput={userInput}
        setUserInput={setUserInput}
        addNewReminder={addNewReminder}
      />
      <FilterSelect
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <RemindersList reminders={filteredList} setIsComplete={setIsComplete} />
    </div>
  );
}

export default App;
