package com.sartenmang.sartenmango.repositorios;


import java.util.List;
import java.util.Optional;

import com.sartenmang.sartenmango.entidades.User;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    
    @Autowired
    private UserCrudRepository userRepositorio;
    
    /**
     * GET
     * 
     * @return
     */
    public List<User> getUsers() {
        return (List<User>) userRepositorio.findAll();
    }

    /**
     * GET BY ID
     * 
     * @param idUsuario
     * @return
     */
    public Optional<User> getUserPorId(Integer idUser) {
        return userRepositorio.findById(idUser);
    }

    /**
     * CREATE - UPDATE
     * 
     * @param idUser
     * @return
     */
    public User guardarUser(User user) {
        return userRepositorio.save(user);
    }

    /**
     * DELETE
     * 
     * @param user
     */
    public void boorarUser(User user) {
        userRepositorio.delete(user);
    }

    public void borrarUserId(Integer userid) {
        userRepositorio.deleteById(userid);
    }

    /**
     * EMAIL EXIST
     * @param email
     * @return
     */
    public boolean existeEmail(String email) {
        Optional<User> usuario = userRepositorio.findByEmail(email);
        return !usuario.isEmpty();
    }
    /**
     * USER EXIST
     * @param email
     * @param password
     * @return
     */
    public Optional<User> autenticarUsuario(String email, String password) {
        return userRepositorio.findByEmailAndPassword(email, password);
    }


    public Optional<User> lastUserId(){
        return userRepositorio.findTopByOrderByIdDesc();
    }
}
