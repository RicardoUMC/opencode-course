package task

type Repository interface {
	List() []Task
	Save(task Task) Task
	UpdateStatus(id string, status Status) (Task, bool)
}

type MemoryRepository struct {
	tasks []Task
}

func NewMemoryRepository() *MemoryRepository {
	return &MemoryRepository{
		tasks: []Task{
			{ID: "task-1", Title: "Prepare sprint demo", Description: "Collect the notes for the team demo", Assignee: "Ana", Status: StatusTodo, DueDate: "2026-08-20"},
			{ID: "task-2", Title: "Review API contract", Description: "Compare frontend expectations with backend payloads", Assignee: "Luis", Status: StatusInProgress, DueDate: "2026-08-12"},
			{ID: "task-3", Title: "Publish release notes", Description: "Summarize the latest fixes", Assignee: "Marta", Status: StatusDone, DueDate: "2026-08-10"},
		},
	}
}

func (r *MemoryRepository) List() []Task {
	return r.tasks
}

func (r *MemoryRepository) Save(task Task) Task {
	r.tasks = append(r.tasks, task)
	return task
}

func (r *MemoryRepository) UpdateStatus(id string, status Status) (Task, bool) {
	for index, item := range r.tasks {
		if item.ID == id {
			r.tasks[index].Status = status
			return r.tasks[index], true
		}
	}

	return Task{}, false
}
