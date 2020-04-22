<template>
  <div v-if="getPlotly != null">
    <plotly v-bind="getPlotly.attr" :data="getPlotly.data" :layout="getPlotly.layout" />
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "generic",
  components: {},
  props: {
    propId: String
  },
  data: () => ({
    getPlotly: null
  }),
  apollo: {
    // Simple query that takes in prop with
    // must have same name as query
    getPlotly: {
      query: gql`
        query GetPlotly($id: ID!) {
          getPlotly(id: $id) {
            id
            data {
              type
              x
              y
            }
            layout {
              title
            },
            attr {
              test
            }
          }
        }
      `,
      variables() {
        // Use vue reactive properties here
        return {
          id: this.propId
        };
      }
    }
  },
  computed: {},
  methods: {},
  watch: {}
};
</script>
