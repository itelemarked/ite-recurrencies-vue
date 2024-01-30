import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc, type Unsubscribe } from "firebase/firestore";
import { ref, watch } from "vue";
import type { User } from "../../Auth/interfaces/user";
import type { Todo } from "../interface/Todo";
import { useAuth } from "../../Auth/use/useAuth";
import { db } from "../../Firebase/firebase";


const user = useAuth().user

export const todos = ref<Todo[]>([])

let todoListener: Unsubscribe

watch(user, (newUser) => {
  if (todoListener !== undefined) todoListener()
  if (user === null || user === undefined) return;

  const query = collection(db, `users/${user.value?.uid}/todos`);
  todoListener = onSnapshot(query, (queryItems) => {
    const newTodos = queryItems.docs.map(doc => {
      const id = doc.id
      const data = doc.data()
      return {id, ...data}
    }) as Todo[]
    todos.value = newTodos
  })
})


export async function addTodo(todo: Omit<Todo, 'id'>) {
  if(user === null || user === undefined) return;

  const data = { ...todo }
  const docRef = doc(collection(db, `users/${user.value?.uid}/todos`));
  await setDoc(docRef, data);
}


export async function deleteTodo(todoId: string) {
  if(user === null || user === undefined) return;

  await deleteDoc(doc(db, `users/${user.value?.uid}/todos`, todoId));
}