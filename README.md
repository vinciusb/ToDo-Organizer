# ToDo Organizer

ToDo Organizer is a project that let the user create and organize his task. Project created using [React](https://reactjs.org/).

## App Functionalities

Here are listed some of the functionalities implemented in ToDo Organizer:
- `To-do containers:`

    - User can create a to-do container, assign a name to this container and exlude it.
    - A to-do container is a structure that allow user to group similar to-dos (related to a same matter, e.g. 'School to-dos' or 'Shoppings').

- `To-dos:`

    - A to-do is a task/item that the user need to create. 
    - Each to-do has some properties, some visible at the to-do preview and others that are shown only when the task is expanded:
    
    - `The visible at first are:`
      - The status of the to-do, that can be 'No status', 'Not started', 'In progress' and 'Completed'.
      - The task name.
      - The date when the task was created.
    
    - `Shown when expanded:` 
      - The comments of the task.
      - Sub-tasks.

    - All of these properties can be eddited inside the task expanded form!
    - A to-do status can be changed dragging (in the drag symbol in the bottom-right corner) and dropping (inside a status box) a task.
    - A to-do can be exclude clicking in the trash can symbol.
    - A task can be expanded to show more informations. To expand just hover the task with the mouse and a new section 'EXPAND TASK' will appear.
