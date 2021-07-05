<template>
    <CustomTable :headers="headers">
        <template v-if="events">
            <template v-if="events.available && events.available >0">
                <tr v-for="item in events.items" :key="item.name">
                    <td>{{item.name}}</td>
                </tr>
            </template>
            <template v-else>
                <div>No Event</div>
            </template>
        </template>
        <template v-else>
            <div>No Event</div>
        </template>
    </CustomTable>
</template>

<script>
import CustomTable from "./CustomTable";
export default {
  name: "Events",
  components:{
    CustomTable
  },
  props:["events"],
  data(){
      return {
          headers: ["Events"]
      }
  }
}
</script>