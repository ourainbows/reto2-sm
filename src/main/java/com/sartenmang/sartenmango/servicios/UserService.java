package com.sartenmang.sartenmango.servicios;

import java.util.List;
import java.util.Optional;

import com.sartenmang.sartenmango.entidades.User;
import com.sartenmang.sartenmango.repositorios.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepositorio;

    public List<User> getAllUsers() {
        return userRepositorio.getUsers();
    }

    public Optional<User> getUser(Integer id) {
        return userRepositorio.getUserPorId(id);
    }

    public User saveUser(User user) {
        if (user.getId() == null) {
            return user;
        } else {
            Optional<User> e = userRepositorio.getUserPorId(user.getId());
            if (e.isEmpty()) {
                if (existeEmail(user.getEmail()) == false) {
                    return userRepositorio.guardarUser(user);
                } else {
                    return user;
                }
            } else {
                return user;
            }
        }
    }

    public User updateUser(User user) {
        if (user.getId() == null) {
            return user;
        }
        Optional<User> oUser = userRepositorio.getUserPorId(user.getId());
        if (!oUser.isEmpty()) {
            if (user.getName() != null) {
                oUser.get().setName(user.getName());
            }
            if (user.getBirthtDay() != null) {
                oUser.get().setBirthtDay(user.getBirthtDay());
            }
            if (user.getMonthBirthtDay() != null) {
                oUser.get().setMonthBirthtDay(user.getMonthBirthtDay());
            }
            if (user.getAddress() != null) {
                oUser.get().setAddress(user.getAddress());
            }
            if (user.getCellPhone() != null) {
                oUser.get().setCellPhone(user.getCellPhone());
            }
            if (user.getEmail() != null) {
                oUser.get().setEmail(user.getEmail());
            }
            if (user.getPassword() != null) {
                oUser.get().setPassword(user.getPassword());
            }
            if (user.getZone() != null) {
                oUser.get().setZone(user.getZone());
            }
            if (user.getType() != null) {
                oUser.get().setType(user.getType());
            }
            userRepositorio.guardarUser(oUser.get());
            return oUser.get();
        } else {
            return user;
        }
    }

    public void deleteUser(Integer idUser) {
        if (getUser(idUser) != null) {
            userRepositorio.borrarUserId(idUser);
        }
    }

    public boolean existeEmail(String email) {
        return userRepositorio.existeEmail(email);
    }

    public User autenticarUsuario(String email, String password) {
        Optional<User> usuario = userRepositorio.autenticarUsuario(email, password);

        if (usuario.isEmpty()) {
            return new User();
        } else {
            return usuario.get();
        }
    }
}
