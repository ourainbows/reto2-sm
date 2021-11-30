package com.sartenmang.sartenmango.repositorios;

import com.sartenmang.sartenmango.entidades.Cookware;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CookwareCrudRepository extends MongoRepository <Cookware,String>{
}
