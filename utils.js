function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = {
  getPostData,
};
