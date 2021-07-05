<template>
  <div class="container-fluid p-3">
    <template v-if="!loading">
      <template v-if="name !== null">
        <button class="btn btn-light ml-1 mr-1" @click="goHome()">Home Page</button>
        <div class="row m-1 desc">Name: {{name}}</div>
        <div class="row m-1 desc">Description: {{description != '' ? description : 'N/A'}}</div>
        <div class="row d-flex justify-content-center p-5 d-none d-sm-flex">
          <img :src="imageURL" />
        </div>
        <div class="row d-flex d-block d-sm-none">
          <img :src="imageURL" />
        </div>
        <div class="row">
          <div class="col-sm">
            <Series :series="series" />
          </div>
          <div class="col-sm">
            <Stories :stories="stories" />
          </div>
          <div class="col-sm">
            <Events :events="events" />
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <h3>Loading......</h3>
    </template>
    <template v-if="!loading && name === null">
      <h3>Character Not Found</h3>
    </template>
  </div>
</template>

<script>
import { _getCharacterById } from "../service";
import Stories from "../components/Stories";
import Series from "../components/Series";
import Events from "../components/Events";

export default {
  name: "Character",
  components: {
    Stories,
    Series,
    Events
  },
  computed: {},
  data() {
    return {
      name: null,
      description: null,
      imageURL: null,
      storyList: [],
      eventList: [],
      seriesList: [],
      loading: true
    };
  },
  created() {
    this.getCharacterById();
  },
  methods: {
    goHome(){
      this.$router.push({ path: '/' })
    },
    getCharacterById() {
      this.loading = true;
      const id = this.$route.params.characterId;
      _getCharacterById(id, {})
        .then(res => {
          console.log(res);
          if (!res.data.data.results || res.data.data.results.length === 0)
            return;
          const data = res.data.data.results[0];
          const {
            name,
            description,
            stories,
            series,
            events,
            thumbnail
          } = data;
          this.name = name;
          this.description = description;
          this.stories = stories;
          this.series = series;
          this.events = events;
          if (!thumbnail) return;
          const { path, extension } = thumbnail;
          this.imageURL = path + "." + extension;
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          if (e.response.status === 404) {
            alert(e.response.data.status);
            return;
          }
          alert(e.response.data.message);
        });
    }
  }
};
</script>

<style scoped>
.desc{
  text-align: left;
}
@media only screen and (max-width: 768px) {
  img {
    max-width: 100%;
    max-height: auto;
    display: block;
    width: 100%;
    height: auto;
    padding: 10px;
  }
}
@media only screen and (min-width: 768px) {
  img {
    max-width: 800px;
    max-height: 800px;
    display: block;
    width: auto;
    height: auto;
  }
}
</style>