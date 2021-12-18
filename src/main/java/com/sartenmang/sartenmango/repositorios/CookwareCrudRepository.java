package com.sartenmang.sartenmango.repositorios;

import java.util.List;

import com.sartenmang.sartenmango.entidades.Cookware;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface CookwareCrudRepository extends MongoRepository <Cookware,String>{
    @Query("{'description':{'$regex':'?0','$options':'i'}}")
    public List<Cookware> findByDescriptionLike(String description);
    
    public List<Cookware> findByPriceLessThanEqual(double precio);
}
