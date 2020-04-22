<template>
  <div v-if="getPlotly != null">
    <v-row>
      <v-col cols="4">
        <v-card elevation="0" class="mx-5">
          <v-card-title>Layout</v-card-title>
          <editor class="layout" v-model="getPlotly.layout" :show-btns="false" />
        </v-card>
        <v-card elevation="0" class="mx-5">
          <v-card-title>Data</v-card-title>
          <editor class="data" v-model="getPlotly.data" :show-btns="false" />
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-row>
          <v-card>
            <plotly v-bind="getPlotly.attr" :data="getPlotly.data" :layout="getPlotly.layout" />
          </v-card>
        </v-row>
        <v-row>
          <!-- <highlight-code lang="javascript" :code="code" /> -->
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from "graphql-tag";
import editor from "vue-json-editor";

export default {
  name: "generic",
  components: {
    editor
  },
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
              z
            }
            layout {
              title
            }
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
  methods: {
    vector2Matrix(idx) {
      var cpy = this.getPlotly.data[0].z;
      var z = [];

      const c = this.getPlotly.data[0].x.length;
      const r = this.getPlotly.data[0].y.length;
      while (cpy.length) {
        z.push(cpy.splice(0, c));
      }

      this.getPlotly.data[0].z = z;
    }
  },
  watch: {
    getPlotly() {
      if (this.getPlotly.data[0].type === "surface") {
        this.vector2Matrix();
      }
    }
  }
};
</script>
