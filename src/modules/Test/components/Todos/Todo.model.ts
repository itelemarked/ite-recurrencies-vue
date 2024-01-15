// export type Todo = { id: number; name: string; completed: boolean }


// export class Todo {
//   constructor(
//     public id: number,
//     public name: string,
//     public completed: boolean
//   ) {}

//   private _someMethod() {}
// }

interface TodoConstructor {
  id: number, name: string, completed: boolean
}

export interface Todo {
  id: number,
  name: string, 
  completed: boolean,
  someMethod: () => void,
}

export function createTodo({id, name, completed}: TodoConstructor): Todo {
  function someMethod() {}

  return {
    id,
    name, 
    completed,
    someMethod
  }
}
