<template>
  <div class="loading-screen">
    <img src="static/images/fisherman.jpg" class="fisherman">
    <h1 class="phrase"> A little bait catches large fish </h1>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .loading-screen {
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 1s ease-in-out;
  }
  .fisherman {
    display: inline-block;
    width: 80%;
    margin-bottom: 40px;
  }
  .phrase {
    font-family: 'Montserrat Alternates Regular';
    font-size: 20px;
    font-weight: 400;
    color: black;
  }
</style>