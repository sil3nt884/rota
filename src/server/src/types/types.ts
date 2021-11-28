type state = 'not done' | 'done'

export type Task = {
    id : string;
    title : string,
    assigneeID? : string
    description : string
    state : state
    image?: Buffer
}


export type Assignee = {
    id : string;
    name : string
}
