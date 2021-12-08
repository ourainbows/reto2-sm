package com.sartenmang.sartenmango.repositorios;

import java.util.Optional;

import com.sartenmang.sartenmango.entidades.User;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserCrudRepository extends MongoRepository<User, Integer>{
    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndPassword(String email, String password);

    //Seleccionar el usuario con el id maximo
    Optional<User> findTopByOrderByIdDesc();
}
