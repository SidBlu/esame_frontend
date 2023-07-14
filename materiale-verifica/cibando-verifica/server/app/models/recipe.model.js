module.exports = mongoose => {
    const Recipe = mongoose.model(
      "recipe",
      mongoose.Schema(
        {
          title: String,
          description: String,
          image: String,
          published: Boolean,
          difficulty: Number,
          note: {type: String, required: false}
        },
        { timestamps: true },
        ).index({title :'text', description: 'text'})
    );
    return Recipe;
  };
