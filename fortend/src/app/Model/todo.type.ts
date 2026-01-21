

type status = 'pending' | 'inProgress' | 'completed'
type priority = 'low' | 'medium' | 'high'     

export type Todo = {
        "id": number,
        "user_id": number,
        "title": string,
        "description": string,
        "status": status,
        "priority": priority,
        "due_date": Date | null ,
        "createdAt": Date,
        "updatedAt": Date
}

export type CreateTodo = Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>


export type UpdateTodo = {
    id: number
} & Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>