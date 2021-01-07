<template>
  <div v-if="hasMessage" id="message" class="errorMessage">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
  data() {
    return {
      hasMessage: false,
    };
  },
  watch: {
    message: function (val) {
      if (val !== undefined && val !== "") this.hasMessage = true;
      else this.hasMessage = false;
    },
  },
};
</script>

<style scoped>
.errorMessage {
  display: inline-block;
  width: 150px;
  height: 25px;
  position: relative;
  color: white;
  background-color: rgb(209, 91, 91);
  text-align: center;
  vertical-align: middle;
  line-height: 25px;
  margin-top: 2px;
  font-size: 10px;
}
.errorMessage:before {
  content: "";
  position: absolute;
  top: 50%;
  margin-top: -10px;
  left: -15px;
  border: solid 10px transparent;
  border-right-color: rgb(209, 91, 91);
  z-index: 1;
}
</style>