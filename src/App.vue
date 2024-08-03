<script>
import LocChange from './components/LocationChange.vue'

export default {
  components: { LocChange },
  data() {
    return {
      city: "",
      time: "",
      lat: "",
      lng: "",
      temp: "",
      locChangeIsHidden: true
    }
  },
  methods: {
    
  }
}
</script>

<template>
  <div class="wrapper">
    <button class="location_change_button" @click="locChangeIsHidden = !locChangeIsHidden"></button>
    <LocChange v-if="!locChangeIsHidden"></LocChange>
  </div>
</template>

<style scoped>
  .wrapper{
    width: 95vw;
    height: 90vh;
    background: skyblue;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .location_change_button{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
</style>
