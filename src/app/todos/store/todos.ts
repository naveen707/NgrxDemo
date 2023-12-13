export interface Todos {
    id?: number,
    taskDetails?: string,
    taskTitle?: string,
    priority?: string,
    assignedBy?: number,
    assignedTo?: number,
    dateCompleted?: Date,
    dateDue?: Date,
    dateEnd?: Date,
    active?: boolean,
    status?: string,
    dateCreated?: Date,
    comments?: string
}
