<template>
  <div>
    <h1>{{ message }}</h1>
    <div>
      <h2>File Management System</h2>
      <pre>{{ externalData }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      externalData: ''
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:3000/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.message = data;
    } catch (error) {
      console.error('Fetch error:', error);
    }

    try {
      const response = await fetch('http://localhost:3000/external');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.externalData = data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
};
</script>
