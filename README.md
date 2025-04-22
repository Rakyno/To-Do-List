#To-DO-List
This is a simple and not so effiecient To-Do list
The header is just a h1 that says todo thats why i didn't create another component just for the header.
The sort selector helps you choose how to sort the list either by date or Name or even completion satatus.
then we can see the list that has been fetched from "jsonplaceholder.typicode.com/todos" using axios.GET
we limited the fetched data to the first 5 post to make our list smaller because we don't have pagination.
we also use loacal state to add new to-do's that have the default date of today but you also get to pick your-
due date with calander that opens when you click on the calander logo thingy all of this ofcousre are on the Add todo from component.
We can use the checkbox behind each to do to determine completion 
We added loading animation to EVERYTHING(but we shouldnt have cuz it makes our SPA slower ) and plus its really cool and reusable so I made it a component
Also if you have deleted all the task(maybe you have done all of them! kudos!!) then our list displays a message that you have no task for now

The TO-do list(c0mponent) renders the todo-items(components)






# To-Do-List