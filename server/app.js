const express = require("express");
const app = express();
const quesn = require("./route/route");
const connectDB = require("./db/connect");
const Questions = require("./model/questions");
const cors = require("cors");

const port = 8000;
app.use(express.json());
app.use(cors());
app.use("/api/v1/", quesn);

app.post("/api/v1/", async (req, res) => {
  const name = req.body.name;
  const question = await Questions.create({ name });
  res.status(200).json({
    question,
  });
});

const start = async () => {
  try {
    await connectDB(
      "mongodb+srv://SujitAdroja:SujitAdroja07@nodeexpressclust.wy8p0oz.mongodb.net/questions"
    );
    app.listen(port, console.log(`listening to the ${port}....`));
  } catch (error) {
    console.log(error);
  }
};
start();
