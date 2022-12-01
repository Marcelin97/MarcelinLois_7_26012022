import { mapGetters, mapState } from "vuex";

export default {
  // created: function () {
  //   console.log("mixin hook called");
  // },
  methods: {
    // TODO: Who can do this C.R.U.D : admin  and creator only
    canAdmin(creatorId, userId) {
      if (this.isAuthenticated) {
        if (
          creatorId === this.authData.id ||
          this.isSuperAdmin === true ||
          this.authData.isAdmin === true ||
          userId === this.authData.id
        )
          return true;
        return false;
      }
      return false;
    },
    // TODO: who can do this C.R.U.D : admin and creator and moderator
    canModerate(creatorId, communityId) {
      if (this.isAuthenticated) {
        if (
          this.canAdmin(creatorId) === true ||
          this.isModerator(communityId) === true
        )
          return true;
        return false;
      }
      return false;
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isSuperAdmin"]),
    ...mapGetters({
      isModerator: "isModerator",
      isFollowingCommunity: "isFollowingCommunity"
    }),
    ...mapState({
      authData: "user",
    }),
  },
};
