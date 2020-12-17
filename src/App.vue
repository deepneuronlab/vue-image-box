<template>
  <div>
    <router-view> </router-view>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.form-group {
  margin-bottom: 8px;
  label {
    display: block;
    font-weight: 500;
    font-size: 14px;
  }
  .form-control {
    border: 1px solid #b4b4b4;
    border-radius: 4px;
    height: 44px;
    width: 100%;
    padding: 0 8px;
    font-size: 16px;
  }
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}

.full-width {
  width: 100%;
}
</style>
