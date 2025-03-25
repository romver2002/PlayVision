<template>
  <div class="card">
    <img :src="background" alt="Background" class="card-background" />
    <div class="card-content">
      <img :src="team" alt="Team Logo" class="team-logo" />
      <h2>{{ name }}</h2>
      <p>Age: {{ age }}</p>
      <p>Position: {{ position }}</p>
      <p>Country: {{ country }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 300px;
}
.card-background {
  width: 100%;
  height: auto;
}
.card-content {
  padding: 16px;
}
.team-logo {
  width: 50px;
  height: auto;
}
</style>