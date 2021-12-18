package com.sartenmang.sartenmango.api;


import java.util.List;
import java.util.Optional;

import com.sartenmang.sartenmango.entidades.Cookware;
import com.sartenmang.sartenmango.servicios.CookwareService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/cookware")
public class CookwareController {
    @Autowired
    private CookwareService cService;

    @GetMapping("/all")
    public List<Cookware> getAll() {
        return cService.getTools();
    }

    @GetMapping("/{reference}")
    public Optional<Cookware> utensilio(@PathVariable("reference") String reference) {
        return cService.getTool(reference);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Cookware registrar(@RequestBody Cookware cookware) {
        return cService.createTool(cookware);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Cookware actualizar(@RequestBody Cookware cookware) {
        return cService.updateTool(cookware);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void borrar(@PathVariable("id") String idCookware){
        cService.deleteTool(idCookware);
    }

    @GetMapping("/price/{price}")
    public List<Cookware> gadgetsByPrice(@PathVariable("price") double precio) {
        return cService.gadgetsByPrice(precio);
    }

    @GetMapping("/description/{description}")
    public List<Cookware> findByDescriptionLike(@PathVariable("description") String description) {
        return cService.findByDescriptionLike(description);
    }
}
