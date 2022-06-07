<template>
    <h1>Bienvenue sur la page des communautés</h1>
    <CommunityList/>
</template>
<script>
import CommunityList from "@/components/Community/communityList.vue";

export default {
  name: "UserView",
  components: {
    CommunityList
  },
}
</script>