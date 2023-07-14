module.exports = mongoose => {
    const Users = mongoose.model(
      "users",
      mongoose.Schema(
        {
          name: String,
          email: String,
          password: String,
          role: String
        },
        { timestamps: true }
      )
    );
    return Users;
  };

