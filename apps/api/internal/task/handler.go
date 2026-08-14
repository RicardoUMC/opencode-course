package task

import (
	"encoding/json"
	"net/http"
	"time"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (h *Handler) ListTasks(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, h.service.ListTasks())
}

func (h *Handler) CreateTask(w http.ResponseWriter, r *http.Request) {
	var request CreateTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"message": "invalid JSON payload"})
		return
	}

	writeJSON(w, http.StatusCreated, h.service.CreateTask(request))
}

func (h *Handler) ChangeStatus(w http.ResponseWriter, r *http.Request) {
	var request ChangeStatusRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"message": "invalid JSON payload"})
		return
	}

	updated, ok := h.service.ChangeStatus(r.URL.Query().Get("id"), request.Status)
	if !ok {
		writeJSON(w, http.StatusNotFound, map[string]string{"message": "task not found"})
		return
	}

	writeJSON(w, http.StatusOK, updated)
}

func (h *Handler) Summary(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, h.service.Summary())
}

func (h *Handler) Overdue(w http.ResponseWriter, r *http.Request) {
	today := r.URL.Query().Get("today")
	if today == "" {
		today = time.Now().Format("2006-01-02")
	}

	writeJSON(w, http.StatusOK, h.service.Overdue(today))
}

func writeJSON(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(value)
}
