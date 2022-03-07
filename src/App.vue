<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}

ul,
ol,
li {
  list-style: none;
}

a {
  text-decoration: none;
}

button {
  border: none;
  background-color: transparent;
  outline: none;
}

input {
  border: none;
  outline: none;
}
</style>
