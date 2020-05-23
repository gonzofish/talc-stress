module.exports = {
  dateFormat: "M/d/yyyy hh:mm a",
  pages: {
    directory: "templates",
    templates: [
      {
        sortBy: ["publish_date"],
        template: "index.html",
        type: "listing",
      },
      {
        template: "post.html",
        type: "post",
      },
    ],
  },
  published: "posts",
};
