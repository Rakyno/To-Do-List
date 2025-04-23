# To-DO-List

This is a simple and not so effiecien responsive Todo List application built with React.js that interacts with JSONPlaceholder mock API. The app implements full CRUD functionality with optimistic UI updates, allowing users to:

Create new todo items
Mark todos as complete/incomplete
Edit existing todos
Delete todos
View todos with due dates

The sort selector helps you choose how to sort the list either by date or Name or even completion satatus.
then we can see the list that has been fetched from "jsonplaceholder.typicode.com/todos" using axios.GET
we limited the fetched data to the first 5 post to make our list smaller because we don't have pagination.
we also use loacal state to add new to-do's that have the default date of today but you also get to pick your-
due date with calander that opens when you click on the calander logo thingy all of this ofcousre are on the Add todo from component.

We can use the checkbox behind each to do to determine completion.
We added loading animation to EVERYTHING(but we shouldnt have cuz it makes our SPA slower ) and plus its really cool and reusable so I made it a component
Also if you have deleted all the task(maybe you have done all of them! kudos!!) then our list displays a message that you have no task for now

The To-do list(component) renders the todo-items(component)

The installed independencies include :

React-icons for icons , React-Datepicker for our calanders , Tailwindcss for styling , axios for API fetching and vite as our webtool

We implemented a component-based architecture with a fairly clear separation of concerns:

App.jsx: Main container with state management
AddTodoForm : where we handle new todo tasks
TodoList: Manages todo items display
TodoItem: Container for individual todos

We could have coded this alot cleaner by making the each CRUD function a component so that our App.jsx looked alot cleaner and more readable:

AddTodo: Handles new todo creation
ToggleTodo: Handles completion status
UpdateTodo: Manages editing functionality
DeleteTodo: Handling data deletion

and to add some key features:

Real-time updates: Optimistic UI provides instant feedback
Error handling: Graceful fallbacks for failed API calls
Loading states: Visual indicators during async operations
Responsive design: Works on all device sizes
Modern UI: Clean interface with Tailwind CSS styling
