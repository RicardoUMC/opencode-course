package main

import (
	"log"
	"net/http"

	"teamtasks/api/internal/task"
)

func main() {
	repository := task.NewMemoryRepository()
	service := task.NewService(repository)
	handler := task.NewHandler(service)

	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", handler.Health)
	mux.HandleFunc("GET /tasks", handler.ListTasks)
	mux.HandleFunc("POST /tasks", handler.CreateTask)
	mux.HandleFunc("PATCH /tasks/status", handler.ChangeStatus)
	mux.HandleFunc("GET /tasks/summary", handler.Summary)
	mux.HandleFunc("GET /tasks/overdue", handler.Overdue)

	log.Println("Team Tasks API listening on http://localhost:8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}
