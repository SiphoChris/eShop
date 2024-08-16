<template>
  <nav>
    <img src="../assets/logo.png" alt="logo" />
    <ul>
      <li><a href="">Products</a></li>
      <li><a href="">Users</a></li>
      <li><a href="">More</a></li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style src="../../public/style.css">
</style>
<style scoped>

nav, ul{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
}
nav {
  height: 6rem;
  padding: 1rem 3rem;
  background-color: #2951c9;
}
ul {
  display: flex;
  justify-content: space-between;
  list-style: none;
}

li>a{
    color: aliceblue;
    font-size: 1.35rem;
    text-decoration: none;
}
img{
    height: 3.3rem;
}
</style>
