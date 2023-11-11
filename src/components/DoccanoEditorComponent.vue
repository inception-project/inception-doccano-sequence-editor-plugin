<template>
  <div id="editor">
    <v-annotator
      :rtl="rtl"
      :text="data.text"
      :entities="entities"
      :entity-labels="entityLabels"
      :relations="relations"
      :relation-labels="relationLabels"
      :allow-overlapping="allowOverlapping"
      :grapheme-mode="graphemeMode"
      @add:entity="createSpanAnnotation"
      @click:entity="selectSpan"
      @click:relation="selectArc"
      @contextmenu:entity="deleteSpan"
      @contextmenu:relation="deleteArc"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VAnnotator from "v-annotator";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

export default Vue.extend({
  components: {
    VAnnotator,
  },

  props: {
    diam: {
      type: Object,
      required: true,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    rtl: {
      type: Boolean,
      default: false,
    },
    relations: {
      type: Array,
      default: () => [],
    },
    relationLabels: {
      type: Array,
      default: () => [],
    },
    allowOverlapping: {
      type: Boolean,
      default: true,
      required: false,
    },
    graphemeMode: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      data: [],
    };
  },

  computed: {
    entities(): [] {
      if (!this.data || !this.data.entities) {
        return [];
      }

      return this.data.entities.map(e => {
        return {
          id: e[0],
          prob: 0.0,
          label: e[0],
          startOffset: e[2][0][0],
          endOffset: e[2][0][1],
          user: 1,
          document: 1,
        };
      });
    },

    entityLabels(): [] {
      if (!this.data || !this.data.entities) {
        return [];
      }

      return this.data.entities.map(e => {
        return {
          id: e[0],
          text: (e.length > 3 && e[3].l) || "(no label)",
          prefixKey: null,
          suffixKey: null,
          color: e.length > 3 && e[3].c,
          textColor: "#000000",
        };
      });
    },
  },

  mounted(): void {
    this.diam.loadAnnotations("Brat").then((data) => (this.data = data));
  },

  methods: {
    createSpanAnnotation(e: any, startOffset: number, endOffset: number) {
      console.info(`handleAddEvent: ${startOffset} - ${endOffset}`);
      this.diam.createSpanAnnotation([[startOffset, endOffset]], "");
    },

    selectSpan(e: any, entityId: number) {
      console.info(`handleEntityClickEvent: ${entityId}`);
      this.diam.selectAnnotation(entityId);
    },

    deleteSpan(entity: any) {
      console.info(
        `deleteEntity: ${entity} - Not yet supported - delete via sidebar`
      );
    },

    selectArc() {
      console.info("updateRelation");
    },

    deleteArc(relation: any) {
      this.$emit("contextmenu:relation", relation.id);
    },
  },
});
</script>

<style>
#editor {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
