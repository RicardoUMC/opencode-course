package main

import (
	"log"
	"net/http"
	"strings"

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
	if err := http.ListenAndServe(":8080", withCORS(mux)); err != nil {
		log.Fatal(err)
	}
}

func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if isAllowedDevOrigin(origin) {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		}

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func isAllowedDevOrigin(origin string) bool {
	return strings.HasPrefix(origin, "http://localhost:") ||
		strings.HasPrefix(origin, "http://127.0.0.1:")
}
