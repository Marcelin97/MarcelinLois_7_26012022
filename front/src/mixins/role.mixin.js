import { mapGetters, mapState } from "vuex";

export default {
  created: function () {
    console.log("mixin hook called");
  },
  methods: {
    // TODO: Who can do this C.R.U.D : admin  and creator only
    canAdmin(creatorId) {
      if (this.isAuthenticated) {
        if (creatorId === this.authData.id || this.isSuperAdmin === true ||
          this.authData.isAdmin === true) return true;
        return false;
      }
      return false;
    },
    // TODO: who can do this C.R.U.D : admin and creator and moderator
    canModerate(communityId) {
      if (this.isAuthenticated) {
        if (this.isCreator(communityId) === true)
        return true;
        return false;
      }
      return false;
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isSuperAdmin"]),
    ...mapGetters({
      userIsModerator: "isModerator",
    }),
    ...mapState({
      authData: "user",
    }),
  },
};
