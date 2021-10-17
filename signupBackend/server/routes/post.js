const { request } = require("express");
const verify = require("./../middleware/auth");
const router = require("express").Router();
router.get("/post", verify, (request, response) => {
  response.json({
    posts: {
      title: "my first post",
      description: "random data you shouldn't know",
    },
  });
});

module.exports = router;
