const express = require("express");
const router = express.Router();
const { allcategories } = require("./categories");

router.get("/", (req, res) => {
  // Get our url slug
  const slug_path = req.originalUrl.replace("/", "");

  // Check if link is in category
  let newCatlist = [];
  for (var i = 0; i < allcategories.length; i++) {
    newCatlist.push(allcategories[i].name);
  }

  // Get the slug and remove -
  const newSlug = slug_path.split("-");
  let cat = "";
  for (let i in newSlug) {
    cat = newSlug[0];
    cat += " " + newSlug[i];
  }

  if (newSlug.length < 2) cat = newSlug[0];
  cat = cat.toUpperCase();

  const catFound = newCatlist.includes(cat);

  if (catFound) {
    return require("./handleCats")(req, res);
  } else {
    switch (slug_path) {
      case "login":
        return require("../routes/login")(req, res);
      case "join":
        return require("../routes/join")(req, res);
      default:
        return require("../routes/viewpost")(req, res, slug_path);
    }
  }
});

router.post("/", (req, res) => {});

module.exports = router;
