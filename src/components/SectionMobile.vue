<script>
export default{
  name:'SectionMobile',

  data(){
      return{
        
          
      }
  },
}
</script>

<template>
    <div class="mobile-section ">
        <div class="img">
            <!-- onda di sfondo -->
            <img src="/public/img/wave.png" alt="" class="wave">
            <img src="/public/img/Light-iPhone-Shadow.png" alt="" class="iphone-bg">
            <img src="/public/img/Iphone.png" alt="" class="iphone">
        </div>

        <div class="text">
            <h2>Installa l'App</h2>
            <p>Non è mai stato così facile ordinare cibo. Cerca gli sconti migliori e ti perderai in un mondo di cibo delizioso.</p>
            <div class="buttons">
                <a href="">
                    <img src="/public/img/playstore.png" alt="" class="android"> 
                </a>
                <a href="">
                    <img src="/public/img/appstore.png" alt="" class="apple">
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.mobile-section {
position: relative;

    .img {
        .wave {
            width: 100%;
            object-fit: cover;
        }
    
        .iphone-bg {
            position: absolute;
            top: 52%;
            left: 20%;
            max-width: 200px;
        }
    
        .iphone {
            position: absolute;
            top: 41%;
            left: 28.5%;
            max-width: 200px;
        }
    }

    .text {
        position: absolute;
        top: 25%;
        right: 30%;
        max-width: 300px;
        cursor: default;

        h2 {
            margin-bottom: 15px;
            font-size: 40px;
            font-weight: bold;
            color: #FFA103;
        }

        p {
            margin-bottom: 15px;
            font-size: 16px;
            color: #827E7E;
        }

        .buttons {
            display: flex;
            align-items: center;
            gap: 15px;

            img {
                width: 120px;
                height: 37px;
                border-radius: 10px;
                transition: 0.2s;

                &:hover {
                    transform: scale(110%);
                }
            }
        }
    }
}
</style>