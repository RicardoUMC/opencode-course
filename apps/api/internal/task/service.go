package task

import "time"

type Service struct {
	repository Repository
}

func NewService(repository Repository) *Service {
	return &Service{repository: repository}
}

func (s *Service) ListTasks() []Task {
	return s.repository.List()
}

func (s *Service) CreateTask(request CreateTaskRequest) Task {
	task := Task{
		ID:          "task-" + time.Now().Format("150405"),
		Title:       request.Title,
		Description: request.Description,
		Assignee:    request.Assignee,
		Status:      StatusTodo,
		DueDate:     request.DueDate,
	}

	return s.repository.Save(task)
}

func (s *Service) ChangeStatus(id string, status Status) (Task, bool) {
	return s.repository.UpdateStatus(id, status)
}

func (s *Service) Summary() Summary {
	summary := Summary{}

	for _, item := range s.repository.List() {
		switch item.Status {
		case StatusTodo:
			summary.Todo++
		case StatusInProgress:
			summary.InProgress++
		case StatusDone:
			summary.Done++
		}
	}

	return summary
}

func (s *Service) Overdue(today string) []Task {
	overdue := []Task{}

	for _, item := range s.repository.List() {
		if item.DueDate < today && item.Status != StatusDone {
			overdue = append(overdue, item)
		}
	}

	return overdue
}
