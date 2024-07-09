<script>
export default{
    name:'FooterApp',
data(){

    return{
        email: '',
        showIcon: true
    }
},

methods: {
    checkInput: function() {
        this.showIcon = this.email === '';
    }
},

mounted() {
    this.checkInput();
},

watch: {
    email: function() {
        this.checkInput();
    }
}

}
</script>

<template>
    <div class="footer">
        <div class="container">
            <div class="row">
                <div class="left col-lg-6 col-12 ms-2 m-lg-0">
                    <div class="row">
                        <div class="col p-0">
                            <h2>Azienda</h2>
                            <ul>
                                <li><a href="" >Chi Siamo </a></li>
                                <li><a href="" >Team</a></li>
                                <li><a href="" >Lavora con Noi</a></li>
                                <li><a href="" >Blog</a></li>
                            </ul>
                        </div>
        
                        <div class="col p-0 pe-3">
                            <h2>Contatti</h2>
                            <ul>
                                <li><a href="" >Aiuto & Supporto</a></li>
                                <li><a href="" >Diventa nostro Partner</a></li>
                                <li><a href="">Diventa un Corriere</a></li>
                            </ul>
                        </div>
        
                        <div class="col p-0 pe-2">
                            <h2>Legale</h2>
                            <ul>
                                <li><a href="" >Termini & Condizioni</a></li>
                                <li><a href="" >Informativa sulla Privacy</a></li>
                                <li><a href="" >Informativa sui Cookie</a></li>
                                <li><a href="" >Rimborsi</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="right col-lg-6 col-12 d-flex justify-content-lg-end py-0 py-md-4 py-lg-0">
                    <div class="row">
                        <div class="col">
                            <h2>Follow us</h2>
                        </div>

                        <div class="col d-flex gap-3">
                            <a href=""><i class="fa-brands fa-instagram"></i></a>
                            <a href=""><i class="fa-brands fa-facebook"></i></a>
                            <a href=""><i class="fa-brands fa-x-twitter"></i></a>
                        </div>

                        <div class="col">
                            <span>Ricevi offerte esclusive nella tua casella di posta</span>
                            <form action="" class="mt-3 input-icon">
                                <i class="fa fa-envelope icon" v-show="showIcon"></i>
                                <input type="email" class="form-control" placeholder="Inserisci la tua mail" id="email-input" v-model="email">
                                <button type="submit">Iscriviti</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <hr>

            <div class="row">
                <div class="col-9 col-lg company">
                    <span>Tutti i diritti riservati <i class="fa-regular fa-copyright"></i> <strong>
                        <a class="text-decoration-none text-white link" href="https://github.com/MiriamEvardi" target="_blank">Miriam Evardi</a>, <a class="text-decoration-none text-white link" href="https://github.com/Mario-Arista" target="_blank">Mario Arista</a>, <a class="text-decoration-none text-white link" href="https://github.com/ALANOMAM" target="_blank">Alan Omam</a>, <a class="text-decoration-none text-white link" href="https://github.com/PietroAntonioNini" target="_blank">Pietro Antonio Nini</a></strong></span>   
                </div>
                <div class="col-3 col-lg made-by p-0 pe-3">
                    <span>Made with <i class="fa-solid fa-heart"></i> by <strong>Boolean</strong></span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.footer {
    position: relative;
    padding: 40px 0;
    background-color: #212121;
    z-index: 1;

    .row {
        padding-bottom: 10px;
        .left {
            h2 {
                margin-bottom: 20px;
                font-size: 20px;
                color: #DBDBDB;
                cursor: default;
            }

            ul {
                padding: 0;
                display: flex;
                flex-direction: column;
                gap: 5px;

                li {
                    list-style-type: none;
                    font-size: 15px;
                    transition: 0.5s;
                    a {
                        text-decoration: none;
                        color: #DBDBDB;
                    }

                    &:hover {
                        text-decoration: underline;
                        color: #fffcfc;       
                    }
                }
            } 
        }

        .right {
            .row {
                display: flex;
                flex-direction: column;
                gap: 15px;

                .col {
                    h2 {
                        font-size: 20px;
                        font-weight: 800;
                        text-transform: uppercase;
                        color: #A0A0A0;
                        cursor: default;
                    }

                    a {
                        font-size: 20px;
                        color: #A0A0A0;

                        transition: 0.2s;

                        &:hover {
                            transform: scale(130%);
                            color: #fffcfc;
                        }
                    }

                    span {
                        font-size: 15px;
                        font-weight: 500;
                        color: #A0A0A0;
                        cursor: default;
                    }

                    .input-icon {
                        display: flex;
                        position: relative;

                        i {
                            position: absolute;
                            left: 10px;
                            top: 13px;
                            color: #A0A0A0;
                        }

                        input {
                            width: 250px;
                            margin-right: 10px;
                            padding: 8px 8px;
                            border: none;
                            color: #A0A0A0;
                            background-color: #424242;
                            
                            &:focus {
                                box-shadow: none;
                            }
                            
                            &::placeholder {
                                padding-left: 25px;
                                font-size: 14px;
                                color: #A0A0A0;
                            }
                        }

                        button {
                            padding: 8px 20px;
                            font-size: 14px;
                            font-weight: 700;
                            color: white;
                            border: 0;
                            border-radius: 6px;
                            background: linear-gradient(to right, #F2AD3C 0%, #bc751e 100%);
                            box-shadow: 0px 3px 6px rgba(242, 173, 60, 0.5);
                        }
                    }
                } 
            }
        }
    }

    hr {
        border: 0.6px solid #A0A0A0;
    }

    .company {
        font-size: 9px;
        color: #F5F5F5;
        cursor: default;
    }

    .made-by {
        display: flex;
        justify-content: end;
        font-size: 9px;
        color: #F5F5F5;

        i {
            cursor: default;
            color: #F2AD3C;
        }
    }

}

    

@media (max-width: 576px) {
    .footer {
        padding: 20px 0;
        .row {
            .left {
                h2 {
                    margin-bottom: 18px;
                    font-size: 16px;
                }

                ul {
                    gap: 2px;
                    li {
                        font-size: 11px;
                    }
                } 
            }

            .right {
                .row {
                    gap: 2px;
                    .col {
                        h2 {
                            font-size: 16px;
                        }

                        a {
                            font-size: 16px;
                        }

                        span {
                            font-size: 13px;
                        }

                        .input-icon {
                            input {
                                width: 240px;
                            }
                        }
                    } 
                }
            }
        }

        .company {
            font-size: 6px;
        }

        .made-by {
            font-size: 6px;
        }
    }
}
</style>