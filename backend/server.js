const express = require("express");
const { verifyToken } = require("./middleware/verifytoken");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

app.get("/verify", verifyToken, (req, res) => {
  return res.status(200).json({ message: "Token is valid" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server started on port ${port}`));
