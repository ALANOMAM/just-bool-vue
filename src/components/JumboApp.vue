<script>
export default {
    name: 'JumboApp',
}
</script>

<template>
    <section class="jumbo-section">
        <div class="container position-relative d-flex align-items-center h-100">
            <div class="d-flex justify-content-between align-items-center">
                <!-- Titoli a sinistra -->
                <div class="text-section p-3 rounded-4">
                    <h1 class="fw-normal">Hai Fame?</h1>
                    <h2 class="fs-3 text-white fw-normal">Con un click, senza stress, il tuo pasto è un success</h2>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
section {
    width: 100%;
    height: 620px;
    overflow: hidden;
    background: url('/img/Jumboy.jpg') no-repeat center center;
    background-size: cover;

    h1 {
        font-size: 100px;
        color: white;
    }

    .text-section {
        width: 100%;
        height: 100%;
        background-color: #F17228; 
        z-index: 1;
    }

    h2 {
        color: black;
        font-size: 18px;
    }

    .img-bowl {
        position: absolute;
        right: 0px;
        bottom: -180px;

        img {
            width: 500px;
            height: auto;
            filter: drop-shadow(-100px 0px 40px rgba(0, 0, 0, 0.5));
        }
    }
}

/* Media Query per schermi piccoli */
@media (max-width: 1200px) {
    .img-bowl {
        display: none;
    }
    .jumbo-section {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .text-section {
        width: 100%;
        height: 100%;
        background-color: #F17228; 
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
</style>