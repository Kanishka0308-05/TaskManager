package com.taskflow.controller;

import com.taskflow.entity.Category;
import com.taskflow.exception.ResourceNotFoundException;
import com.taskflow.repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;
    private final com.taskflow.repository.UserRepository userRepository;

    public CategoryController(CategoryRepository categoryRepository, com.taskflow.repository.UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Category> list() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Category get(@PathVariable Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }

    @PostMapping
    public ResponseEntity<Category> create(@RequestBody Category category) {
        // If client provided user with id, attach managed reference
        if (category.getUser() != null && category.getUser().getId() != null) {
            category.setUser(userRepository.getReferenceById(category.getUser().getId()));
        }
        Category saved = categoryRepository.save(category);
        return ResponseEntity.created(URI.create("/api/categories/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable Long id, @RequestBody Category in) {
        return categoryRepository.findById(id).map(c -> {
            c.setName(in.getName());
            c.setColorHex(in.getColorHex());
            c.setIsDefault(in.getIsDefault());
            return categoryRepository.save(c);
        }).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
