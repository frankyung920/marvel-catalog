<template>
    <CustomTable :headers="headers">
        <template v-if="stories">
            <template v-if="stories.available && stories.available >0">
                <tr v-for="item in stories.items" :key="item.name">
                    <td>{{item.name}}</td>
                </tr>
            </template>
            <template v-else>
                <div>No Story</div>
            </template>
        </template>
        <template v-else>
            <div>No Story</div>
        </template>
    </CustomTable>
</template>

<script>
import CustomTable from "./CustomTable";
export default {
  name: "Stories",
  components:{
    CustomTable
  },
  props:["stories"],
  data(){
      return {
          headers: ["Stories"]
      }
  }
}
</script>