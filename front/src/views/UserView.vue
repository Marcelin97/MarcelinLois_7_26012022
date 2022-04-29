<template>
<section>
    <h1>Mon compte</h1>
    <ProfilView/>
</section>

</template>

<script>
import ProfilView from "@/components/Profil/ProfilView.vue"

export default {
  name: "UserView",
  components: {
    ProfilView,
  },
};
</script>
