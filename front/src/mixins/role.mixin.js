import { mapGetters, mapState } from "vuex";

export default {
  created: function () {
    console.log("mixin hook called");
    this.canModerate();
  },
  methods: {
    canModerate(moderators) {
      if (this.isAuthenticated) {
        if (this.isCommunityModerator(moderators) === true) return true;
        return false;
      }
      return false;
    },
    canAdmin(ownerId) {
      if (this.isAuthenticated) {
        if (ownerId === this.authData.id || this.isSuperAdmin === true) return true;
        return false;
      }
      return false;
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isSuperAdmin"]),
    ...mapGetters({
      isCommunityModerator: "isCommunityModerator",
    }),
    ...mapState({
      authData: "user",
    }),
  },
};
