<template>
  <v-card>{{hello}}</v-card>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "generic",
  components: {},
  data() {
    return {
      hello: ""
    };
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    hello: gql`
      {
        hello
      }
    `
  },
  computed: {},
  methods: {},
  watch: {}
};
</script>
