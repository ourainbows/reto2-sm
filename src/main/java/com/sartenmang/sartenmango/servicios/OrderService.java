package com.sartenmang.sartenmango.servicios;

import java.util.List;
import java.util.Optional;

import com.sartenmang.sartenmango.entidades.Order;
import com.sartenmang.sartenmango.repositorios.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAll() {
        return orderRepository.getAll();
    }

    public Optional<Order> getOrder(Integer id) {
        return orderRepository.getOrder(id);
    }

    public Order create(Order order) {

        // Obtenemos el mayor id existente
        Optional<Order> orderIdMaximo = orderRepository.lastOrderId();

        // Si recibimos un id nulo crearemos uno nuevo basandonos en el id mas alto
        if (order.getId() == null) {
            // valida el maximo id generado, en caso de que no haya creara uno a partir de 1
            if (orderIdMaximo.isEmpty()) {
                order.setId(1);
                // en caso de que si tengamos usuarios existentes le sumamos uno al mayor para
                // nuestro nuevo dato
            } else {
                order.setId(orderIdMaximo.get().getId() + 1);
            }
        }

        Optional<Order> e = orderRepository.getOrder(order.getId());
        if (e.isEmpty()) {
            return orderRepository.create(order);
        } else {
            return order;
        }
    }
    
    public Order update(Order order) {
        if (order.getId() != null) {
            Optional<Order> orderDb = orderRepository.getOrder(order.getId());
            if (!orderDb.isEmpty()) {
                if (order.getStatus() != null) {
                    orderDb.get().setStatus(order.getStatus());
                }
                orderRepository.update(orderDb.get());
                return orderDb.get();
            } else {
                return order;
            }
        } else {
            return order;
        }
    }

    public boolean delete(Integer id) {
        Boolean aBoolean = getOrder(id).map(order -> {
            orderRepository.delete(order);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
    //Ordenes de pedido asociados a los asesores de una zona
    public List<Order> findByZone(String zona) {
        return orderRepository.findByZone(zona);
    }


    public List<Order> ordersSalesManByID(Integer id) {
        return orderRepository.ordersSalesManByID(id);
    }

    // Reto 4: Ordenes de un asesor x Estado
    public List<Order> ordersSalesManByState(String state, Integer id) {
        return orderRepository.ordersSalesManByState(state, id);
    }

    // Reto 4: Ordenes de un asesor x fecha
    public List<Order> ordersSalesManByDate(String dateStr, Integer id) {
        return orderRepository.ordersSalesManByDate(dateStr, id);
    }

}
