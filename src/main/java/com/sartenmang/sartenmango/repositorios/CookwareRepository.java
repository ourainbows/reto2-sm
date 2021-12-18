package com.sartenmang.sartenmango.repositorios;

import java.util.List;
import java.util.Optional;

import com.sartenmang.sartenmango.entidades.Cookware;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class CookwareRepository{
    @Autowired
    public CookwareCrudRepository cRepository;

    public List<Cookware> getTools() {
        return (List<Cookware>) cRepository.findAll();
    }

    public Optional<Cookware> getTool(String reference) {
        return cRepository.findById(reference);
    }

    public Cookware createTool(Cookware cookware) {
        return cRepository.save(cookware);
    }
    
    public Cookware updateTool(Cookware cookware) {
        return cRepository.save(cookware);
    }

    public void deleteTool(String reference) {
        cRepository.deleteById(reference);
    }
    
    public List<Cookware> gadgetsByPrice(double precio) {
        return cRepository.findByPriceLessThanEqual(precio);
    }

    // Reto 5
    public List<Cookware> findByDescriptionLike(String description) {
        return cRepository.findByDescriptionLike(description);
    }
}
