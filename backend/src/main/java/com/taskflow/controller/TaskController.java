package com.taskflow.controller;

import com.taskflow.entity.Task;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.repository.TaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskRepository taskRepository;
    private final com.taskflow.repository.UserRepository userRepository;
    private final com.taskflow.repository.CategoryRepository categoryRepository;

    public TaskController(TaskRepository taskRepository, com.taskflow.repository.UserRepository userRepository, com.taskflow.repository.CategoryRepository categoryRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<Task> list() {
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public Task get(@PathVariable Long id) {
        return taskRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found"));
    }

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody Task task) {
        // Attach managed references if ids provided
        if (task.getUser() != null && task.getUser().getId() != null) {
            task.setUser(userRepository.getReferenceById(task.getUser().getId()));
        }
        if (task.getCategory() != null && task.getCategory().getId() != null) {
            task.setCategory(categoryRepository.getReferenceById(task.getCategory().getId()));
        }
        Task saved = taskRepository.save(task);
        return ResponseEntity.created(URI.create("/api/tasks/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @RequestBody Task in) {
        return taskRepository.findById(id).map(t -> {
            t.setTitle(in.getTitle());
            t.setDescription(in.getDescription());
            t.setPriority(in.getPriority());
            t.setStatus(in.getStatus());
            t.setDueDate(in.getDueDate());
            t.setEstimatedMinutes(in.getEstimatedMinutes());
            t.setIsPinned(in.getIsPinned());
            return taskRepository.save(t);
        }).orElseThrow(() -> new ResourceNotFoundException("Task not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
