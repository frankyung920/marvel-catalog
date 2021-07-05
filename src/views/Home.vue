<template>
  <div class="container-fluid p-5">
    <h1 class="justify-content-center pb-5">Coding Challenge - Marvel API - v1 </h1>
    <h2 class="justify-content-center pb-5">Characters List</h2>
      <template v-if="!loading">
    <CustomTable :headers="headers">
        <tr v-for="(character, i) in characterList" :key="character.id">
          <td>{{ (i+1) + limit * ( current - 1) }}</td>
          <td>{{character.id}}</td>
          <td>{{character.name}}</td>
          <td>
            <button @click="onClickView(character.id, character.thumbnail)">View</button>
          </td>
        </tr>
    </CustomTable>
    </template>
    <template v-if="loading">
      <h4 class="justify-content-center">Loading...</h4>
    </template>
    <template v-if="!loading">
      <Paginator />
    </template>
  </div>
</template>

<script>
import CustomTable from "../components/CustomTable";
import Paginator from "../components/Paginator";
import { _getCharacters } from "../service";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    CustomTable,
    Paginator
  },
  computed: {
    ...mapGetters(["total", "limit", "offset", "current"])
  },
  data() {
    return {
      headers: ["#", "ID", "Name", "View"],
      characterList: [],
      loading: false
    };
  },
  created() {
    this.getCharacters();
  },
  methods: {
    onPaginationUpdate() {
      this.getCharacters();
    },
    getCharacters() {
      this.loading = true;
      _getCharacters({
        limit: this.limit,
        offset: this.offset
      })
        .then(res => {
          this.characterList = res.data.data.results;
          this.$store.dispatch("setTotal", res.data.data.total);
        })
        .catch(e => {
          alert(e.response.data.message);
        }).finally(() => {
          this.loading = false;
        });
    },
    onClickView(id) {
      this.$router.push({ name: "Character", params: { characterId: id } });
    }
  }
};
</script>
