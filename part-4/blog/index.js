const app = require("./app");
const info = require("./utils/logger");
const { PORT } = require("./utils/config");

require("dotenv").config();

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
