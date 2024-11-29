package com.example.crudapp.controller;

import com.example.crudapp.model.Entry;
import com.example.crudapp.repository.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entries")
@CrossOrigin(origins = "*") // Replace * with specific origin if needed
public class EntryController {

    @Autowired
    private EntryRepository entryRepository;

    // Fetch All Entries
    @GetMapping
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }

    // Add New Entry
    @PostMapping
    public ResponseEntity<Entry> addEntry(@RequestBody Entry entry) {
        if (entry.getAmount() == null || entry.getDescription() == null) {
            return ResponseEntity.badRequest().body(null);
        }
        Entry savedEntry = entryRepository.save(entry);
        return ResponseEntity.ok(savedEntry);
    }

    // Delete Entry by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        if (!entryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Health Check Endpoint
    @GetMapping("/health")
    public String healthCheck() {
        return "<html><body style='font-family: Arial, sans-serif; text-align: center; margin-top: 20px;'>" +
                "<h1 style='color: green;'>Server is healthy</h1></body></html>";
    }
}
