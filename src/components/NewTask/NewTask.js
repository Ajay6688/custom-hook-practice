import useHttp from '../../hooks/use-https';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  let {isLoading,error,sendRequest} =useHttp();

  const createTask = (taskText , data)=>{
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  const enterTaskHandler = async (taskText) => {

    sendRequest({
      url: 'https://test-c4de6-default-rtdb.firebaseio.com/tasks.json',
      method : 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body : {text :taskText}
    }, createTask.bind(null , taskText)); // bind function is used to re configure the function first parameter is to set the this keyword
                                          //in the to be executed function it dont matter here so its set null , second parameter will be 
  };                                      // the first argument received by the function 

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
