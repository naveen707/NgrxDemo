import { Todos } from "./store/todos";


const mockTodo1: Todos = {
  id: 101,
  taskTitle: 'Title 1',
  taskDetails: 'Title 1 details',
  status:'Pending'
};

const mockTodo2: Todos = {
    id: 102,
    taskTitle: 'Title 2',
    taskDetails: 'Title 2 details',
    status:'Pending'
};

const mockTodo3: Todos = {
    id: 103,
    taskTitle: 'Title 3',
    taskDetails: 'Title 3 details',
    status:'Pending'
};

const mockTodoArray: Todos[] = [mockTodo1, mockTodo2, mockTodo3];

export { mockTodo1, mockTodo2, mockTodo3, mockTodoArray };