const express = require('express');
const router = express.Router();

const User = require('./../models/User');
const bcrypt = require('bcrypt');

router.post('/adduser', (req, res) => {
    let { email, password ,name} = req.body;
    email = email.trim();
    password = password.trim();
    name = name.trim() 
    

    if (email == "" || password == '' || name == '' ) {
        res.json({
            status: "ÉCHOUÉ",
            message: "Champs de saisie vides !"
        });
    } else if (password.length < 8) {
        res.json({
            status: "ÉCHOUÉ",
            message: "Le mot de passe est trop court!"
        });
    } else {
        User.findOne({ email }).then(result => {
            if (result) {
                res.json({
                    status: "ÉCHOUÉ",
                    message: "Ce courriel existe déjà"
                });
            } else {
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        email,
                        password: hashedPassword ,
                        name 
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCÈS",
                            message: "Ajout d'un utilisateur réussi",
                            data: result,
                        });
                    }).catch(err => {
                        res.json({
                            status: "ÉCHOUÉ",
                            message: "Une erreur s'est produite lors de l'enregistrement du compte utilisateur"
                        });
                    });
                }).catch(err => {
                    res.json({
                        status: "ÉCHOUÉ",
                        message: "Une erreur s'est produite lors du hachage du mot de passe"
                    });
                });
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "ÉCHOUÉ",
                message: "Une erreur s'est produite lors de la vérification de l'utilisateur existant"
            });
        });
    }
});

router.post('/login', (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == '') {
        res.json({
            status: "ÉCHOUÉ",
            message: "Champs de saisie vides !"
        });
    } else {
        User.findOne({ email })
            .then(data => {
                if (data) {
                    const hashedPassword = data.password;
                    bcrypt.compare(password, hashedPassword)
                        .then(result => {
                            if (result) {
                                res.json({
                                    status: "SUCCÈS",
                                    message: "Connexion réussie",
                                    data: data,
                                })
                            } else {
                                res.json({
                                    status: "ÉCHOUÉ",
                                    message: "Mot de passe invalide saisi"
                                })
                            }
                        })
                        .catch(err => {
                            res.json({
                                status: "ÉCHOUÉ",
                                message: "Une erreur s'est produite lors de la comparaison des mots de passe"
                            })
                        })
                } else {
                    res.json({
                        status: "ÉCHOUÉ",
                        message: "Informations d'identification invalides saisies !"
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: "ÉCHOUÉ",
                    message: "Une erreur s'est produite lors de la récupération des données utilisateur"
                });
            });
    }
});





module.exports = router;
