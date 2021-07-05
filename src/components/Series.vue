<template>
    <CustomTable :headers="headers">
        <template v-if="series">
            <template v-if="series.available && series.available >0">
                <tr v-for="item in series.items" :key="item.name">
                    <td>{{item.name}}</td>
                </tr>
            </template>
            <template v-else>
                <div>No Series</div>
            </template>
        </template>
        <template v-else>
            <div>No Series</div>
        </template>
    </CustomTable>
</template>

<script>
import CustomTable from "./CustomTable";
export default {
  name: "Series",
  components:{
    CustomTable
  },
  props:["series"],
  data(){
      return {
          headers: ["Series"]
      }
  }
}
</script>