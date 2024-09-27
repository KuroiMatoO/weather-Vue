<script>
export default {
	data(){
		return{
			city: ""
		}
	},
	// methods: {
	// 	getLocation(){
	// 		axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
	// 			.then(res => (this.locationData = res))
	// 	}
	// }
}
</script>

<template>
  <div class="location_change_wrapper">
    <div id="location_header">
      Search Locations
    </div>
    <div id="location_body">
      <div id="location_search">
        <input type="search">
        <button
          id="detect_location"
          title="Detect Location via GPS"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
          ><path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z" /></svg>
        </button>
      </div>
      <div id="location_list">
        <div class="tip" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.location_change_wrapper{
    width: 40vw;
    height: 60vh;
    background: #3c7580;
    position: absolute;
}
</style>