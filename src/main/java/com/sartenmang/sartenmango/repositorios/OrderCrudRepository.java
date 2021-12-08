package com.sartenmang.sartenmango.repositorios;

import java.util.List;
import java.util.Optional;

import com.sartenmang.sartenmango.entidades.Order;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface OrderCrudRepository extends MongoRepository<Order, Integer>{
    
    //Me da un listado de las ordenes que pertenecen a esa zona, esto lo usamos para la vista del coordinador de zona
    @Query("{'salesMan.zone': ?0")
    List<Order> findByZone(final String zone);

    //Retornar las ordenes por estado (Pendiente, Aprobada, Rechazada)
    @Query
    List<Order> finByStatus(final String status);

    // Seleccionar la orden con el id maximo
    Optional<Order> finTopByOrderByIdDesc();
}
