<template>
  <div class="successBox">
    <h3>Success</h3>
    <p>Event has been created.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    if (this.$route.params) {
      console.log('Date of form:')
      console.log(this.$route.params.formData);
    }
  },
};
</script>

<style scoped>
.successBox {
  text-align: left;
  margin: auto;
  width: 700px;
  height: 100px;
  padding-left: 50px;
  margin-top: 30px;
  display: inline-block;
  background-color: rgb(222, 243, 224);
  border: 1px solid lightgray;
}
h3 {
  color: rgb(116, 187, 116);
}
</style>