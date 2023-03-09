import React, {  useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from  '../src/hooks/use-https';

function App() {
  const [tasks, setTasks] = useState([]);

  const leadTask = (data)=>{
    const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
  };

  let {isLoading , error , sendRequest : fetchTasks} = useHttp();

  useEffect(() => {
    fetchTasks( {url : 'https://test-c4de6-default-rtdb.firebaseio.com/tasks.json'} , leadTask);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
