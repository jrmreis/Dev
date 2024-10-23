//package br.com.thcs.spark.controller;
//
//import br.com.thcs.spark.model.User;
//import br.com.thcs.spark.repository.UserRepository;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/users")
//public class UserController {
//
//    private UserRepository repository;
//
//    UserController(UserRepository userRepository) {
//        this.repository = userRepository;
//    }
//
//    @GetMapping
//    public List findAll(){
//        return repository.findAll();
//    }
//
//    @PostMapping
//    public User create(@RequestBody User user){
//        return repository.save(user);
//    }
//
//    @GetMapping(path = {"/{id}"})
//    public ResponseEntity findById(@PathVariable long id){
//        return repository.findById(id)
//                .map(record -> ResponseEntity.ok().body(record))
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//
//    @PutMapping(value="/{id}")
//    public ResponseEntity update(@PathVariable("id") long id, @RequestBody User user) {
//        return repository.findById(id)
//                .map(record -> {
//                    record.setUsername(user.getUsername());
//                    record.setPassword(user.getPassword());
//                    record.setRole(user.getRole());
//                    User updated = repository.save(record);
//                    return ResponseEntity.ok().body(updated);
//                }).orElse(ResponseEntity.notFound().build());
//    }
//
//    @DeleteMapping(path ={"/{id}"})
//    public ResponseEntity <?> delete(@PathVariable long id) {
//        return repository.findById(id)
//                .map(record -> {
//                    repository.deleteById(id);
//                    return ResponseEntity.ok().build();
//                }).orElse(ResponseEntity.notFound().build());
//    }
//
//}
