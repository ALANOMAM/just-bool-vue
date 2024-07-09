<script>

import {store} from '../store.js'

export default {
    
    name:'PaymentStatus',

    data() {
        return {
            paymentStatus: {
                paymentSuccess: store.paymentSuccess,
                transactionId: null,
                errorMessage: null,
                customerEmail: null,
                customerPhone: null,
                customerAddress: null
            },

            store,

            loading: true,
        };
    },

    mounted() {
        // const paymentStatus = JSON.parse(localStorage.getItem('paymentStatus'));
        // if (paymentStatus) {
        //     this.paymentStatus = paymentStatus;
        // }

        this.loading = false;
    },

    methods: {
        goBack() {
            this.$router.go(-2);
        }
    },

    // computed: {
    //     paymentSuccess() {
    //         return this.paymentStatus.paymentSuccess;
    //     },
    //     transactionId() {
    //         return this.paymentStatus.transactionId;
    //     },
    //     errorMessage() {
    //         return this.paymentStatus.errorMessage;
    //     },
    //     customerEmail() {
    //         return this.paymentStatus.customerEmail;
    //     },
    //     customerPhone() {
    //         return this.paymentStatus.customerPhone;
    //     },
    //     customerAddress() {
    //         return this.paymentStatus.customerAddress;
    //     }
    // }
};
</script>

<template>

<section class="jumbo-section">
    <div class="container position-relative d-flex align-items-center h-100">
        <div class="d-flex justify-content-between align-items-center">
            <!-- Titoli a sinistra -->
            <div class="text-section p-3 rounded-4">
                <h1 class="fw-normal">Allora avevi fame!</h1>
                <h2 class="fs-3 text-white fw-normal">Con un click, senza stress, il tuo pasto è un success</h2>
            </div>
        </div>
    </div>
</section>

<div class="payment-box ">
    <a @click="goBack" class="back"><i class="fa-solid fa-arrow-left"></i>Torna al Ristorante</a>

    <!-- Loader -->
    <div v-if="loading" class="loader-box">
        <span class="loader"></span>
    </div>

    <div v-else>
        <div v-if="paymentStatus.paymentSuccess" class="d-flex flex-column align-items-center justify-content-center payment-success my-5">
            <i class="fa-solid fa-circle-check pb-2"></i>
            <div class="text-center my-5">
                <h1>Pagamento Avvenuto con Successo!</h1>
                <p class="fs-5">
                    Grazie {{ store.paymentDetails?.full_name }} per aver ordinato su JustBool!
                    <br>
                    Una mail con i dati del tuo ordine è stata inoltrata al tuo indirizzo di posta.
                </p>
            </div>
            <div class="payment-info my-4">
                <h3>ID della transazione: <span>{{ store.paymentDetails?.transactionId }}</span></h3>
                <h3>Email: <span>{{ store.paymentDetails?.email }}</span></h3>
                <h3>Tel: <span>{{ store.paymentDetails?.phone }}</span></h3>
                <h3>Indirizzo: <span>{{ store.paymentDetails?.address }}</span></h3>
            </div>
        </div>

        <div v-else class="d-flex flex-column align-items-center justify-content-center payment-failed my-5">
            <i class="fa-solid fa-circle-xmark text-danger fs-1"></i>
            <h1 class="text-center my-4 text-danger">Pagamento Fallito</h1>
            <p class="text-center fs-5">
                Siamo spiacenti, ma il tuo pagamento non è stato completato con successo. <br> Ti invitiamo a verificare i dati inseriti e a tentare nuovamente. <br>
                Se riscontri ancora problemi, prova a utilizzare un altro metodo di pagamento o contattaci per ricevere assistenza.
            </p>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>

section {
    width: 100%;
    height: 150px;
    overflow: hidden;
    background: url('/img/Jumboy.jpg') no-repeat center center;
    background-size: cover;

    h1 {
        font-size: 70px;
        color: white;
    }

    .text-section {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6); 
        z-index: 1;
    }

    h2 {
        color: black;
        font-size: 18px;
    }
    
}



.payment-box {
    position: relative;
    .back {
        position: absolute;
        top: -20px;
        left: 15px;
        color: #eb6b3e;
        text-decoration: none;
        transition: 0.1s;

        &:hover {
            cursor: pointer;
            color: #ffab24;
        }
    }

    /* loader */
    .loader-box {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.826);
        z-index: 9999;
    }
    .loader {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateY(-50%);
        width:70px;
        height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    .loader:after {
        content: "";
        position: absolute;
        inset: 0;
        padding: 3px 6px;
        border-top: 1px solid #bbb6aa;
        border-bottom: 2px solid #bbb6aa;
        background: linear-gradient(#eb6b3e 0 0) bottom no-repeat content-box,#e4e0d7;
        mix-blend-mode: darken;
        animation: l1 1.7s infinite linear;
    }
    .loader:before {
        content: "";
        position: absolute;
        inset: -30px calc(50% - 2px) 6px;
        background: #612329;
        transform-origin: bottom;
        transform: rotate(8deg);
    }
    @keyframes l1 {
        0%   {background-size: 100% 100%}
        100% {background-size: 100% 0%}
    }
    
    .payment-success {
        
        h1 {
            color: #1fae24;
            font-weight: 700;
        }

        span {
            font-size: 25px;
            font-weight: 700;
            color: #1fae24;
        }
    
        i {
            color: #1fae24;
            font-size: 70px;
        }
        
        .payment-info {

            flex-direction: column;
            padding: 40px;
            border-radius: 40px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            margin-bottom: 30px;

            h3 {
                font-size: 25px;
                text-transform: uppercase;
                color: #eb6b3e;
                
                span {
                    font-size: 20px;
                    color: black
                }
            }

        }
    }
    
    .payment-failed {
        
        h1 {
            color: #1fae24;
            font-weight: 700;
        }

        span {
            font-size: 25px;
            font-weight: 700;
            color: #1fae24;
        }
    
        i {
            color: #1fae24;
            font-size: 90px;
        }
    }
}

/* Media Query per schermi piccoli */
@media (max-width: 1200px) {
 
    .jumbo-section {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .text-section {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6); 
        z-index: 1;
    }

    .container {
        display: none;
    }

    .jumbo-section h1 {
        font-size: 60px;
    }

    .jumbo-section h2 {
        color: white;
    }

}


@media (max-width: 767px) {

    .payment-info {
    //border: 1px solid blue;
        flex-direction: column;
        padding: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

        &:hover{
            box-shadow: 0 4px 8px 0 rgba(255, 179, 14, 0.2), 0 6px 20px 0 rgba(255, 179, 14, 0.19);
        }   

    }
}

</style>