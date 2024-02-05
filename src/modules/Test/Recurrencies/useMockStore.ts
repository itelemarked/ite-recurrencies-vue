import type { Recurrency } from "@/modules/Recurrencies/models/Recurrency"


// interface MockDatas {
//   users: {
//     [key:string]: {
//       recurrencies: Recurrency[]
//     }
//   }
// }


const MOCK = {
  users: {
    'abcde': {
      recurrencies: [
        {
          id: 'abc',
          title: 'abc',
          period: {
            nb: 2,
            unit: 'days'
          },
          lastEvent: '2023-01-01'
        }
      ]
    }
  }
}


function getMock<T>(path: string[]): Readonly<T> | null {
  let source = MOCK
  
  for(let i = 0; i < path.length; i++) {
    source = (source as {[key:string]: any})[path[i]]
    if (source === undefined) return null
  }
  
  return source as unknown as Readonly<T>
}


function setMock<T>(path: string[], obj: any) {
  let source = MOCK
  
  for(let i = 0; i < path.length; i++) {
    source = (source as {[key:string]: any})[path[i]]
    if (source === undefined) return
  }
  
  for (const key in obj) {
    (source as {[key:string]: any})[key] = obj[key]
  }
}


function updateMock<T>(path: string[], obj: {[key: string]: any}) {
  let source = MOCK
  
  for(let i = 0; i < path.length; i++) {
    source = (source as {[key:string]: any})[path[i]]
    if (source === undefined) return
  }
  
  for (const key in obj) {
    (source as {[key:string]: any})[key] = obj[key]
  }
}



export function TEST() {

 
}