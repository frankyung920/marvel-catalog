<template>
  <!-- eslint-disable vue/no-template-key -->
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CustomTable",
  props: ["headers"],
};
</script>

<style scoped></style>
