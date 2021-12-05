type state = 'not done' | 'done'

export type Task = {
    id : string;
    title : string,
    assigneeID? : string
    description : string
    state : state
    image?: string
    created_at : string,
    last_updated_at: string
}


export type Assignee = {
    id : string;
    name : string
}
