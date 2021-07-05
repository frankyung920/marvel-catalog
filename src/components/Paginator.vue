<template>
  <div class="d-flex align-items-center justify-content-between p-3 m-1">
    <div class="d-flex align-items-center">
      <div class="small pr-3">Records per page</div>
      <div class="m-2">
        <select size="sm" :value="limit" @change="handleRecordPerPage($event)">
          <template v-for="l in limits">
            <option :key="l" :value="l">{{ l }}</option>
          </template>
        </select>
      </div>
    </div>

    <div class="d-flex align-items-center">
      <button :disabled="current === 1" class="btn btn-light btn-sm ml-1 mr-1" @click="handlePrev">
        <div>PREV</div>
      </button>
      <div class="ml-1 mr-1 small">
        {{ current }} of
        {{ totalPage }}
      </div>
      <button
        :disabled="current === totalPage"
        class="btn btn-light btn-sm ml-1 mr-1"
        @click="handleNext"
      >
        <div>NEXT</div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Paginator",
  props: {},
  computed: {
    ...mapGetters(["limit", "limits", "current", "total"]),
    totalPage: function() {
      return Math.ceil(this.total / this.limit);
    }
  },
  data() {
    return {
      pageNumber: this.$store.getters["current"]
    };
  },
  methods: {
    handleRecordPerPage(event) {
      this.$store.dispatch("updateLimit", Number(event.target.value));
      this.$store.dispatch("updateCurrent", 1);
      this.$store.dispatch("resetOffset");
      this.pageNumber = 1;
      this.handleGo();
    },
    handleNext() {
      if (this.current >= this.total) return;
      this.pageNumber = this.current + 1;
      this.$store.dispatch("updateOffset", this.limit * this.pageNumber);
      this.handleGo();
    },
    handleGo() {
      if (this.pageNumber > this.total) return;
      if (this.pageNumber <= 0) return;
      this.$store.dispatch("updateCurrent", Number(this.pageNumber));
      this.$parent.onPaginationUpdate();
    },
    handlePrev() {
      if (this.current <= 0) return;
      this.pageNumber = this.current - 1;
      this.$store.dispatch("updateOffset", -this.limit * this.pageNumber);
      this.handleGo();
    }
  }
};
</script>
