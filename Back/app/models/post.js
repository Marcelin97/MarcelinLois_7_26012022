module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("user", {
    title: {
      type: Sequelize.STRING,
      unique: false,
      allowNull: false,
      validate: {
        len: [5, 255]
      }
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    createdBy: {
      type: Sequelize.STRING,
      ref: "User",
      required: true
    },
    imageUrl: {
      type: Sequelize.STRING,
      required: false,
      default: ""
    },
    content: {
      type: Sequelize.TEXT,
      unique: false,
      required: false,
      default: "",
      allowNull: false,
      validate: {
        len: [20, 5000]
      }
    },
    upVotes: {
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false
      //   defaultValue: 0,
    },
    downVotes: {
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false
      //   defaultValue: 0,
    },
    comments: {
      type: Sequelize.INTEGER,
      unique: false,
      allowNull: false,
      defaultValue: 0
    }
  });
  return Post;
};
