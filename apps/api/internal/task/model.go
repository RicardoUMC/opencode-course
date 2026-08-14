package task

type Status string

const (
	StatusTodo       Status = "todo"
	StatusInProgress Status = "in_progress"
	StatusDone       Status = "done"
)

type Task struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Assignee    string `json:"assignee"`
	Status      Status `json:"status"`
	DueDate     string `json:"dueDate"`
}

type CreateTaskRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Assignee    string `json:"assignee"`
	DueDate     string `json:"dueDate"`
}

type ChangeStatusRequest struct {
	Status Status `json:"status"`
}

type Summary struct {
	Todo       int `json:"todo"`
	InProgress int `json:"inProgress"`
	Done       int `json:"done"`
}
