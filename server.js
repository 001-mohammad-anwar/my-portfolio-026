const express = require('express')
const dotenv = require("dotenv");
dotenv.config({ quiet: true });
const connectDB = require("./config/connect.js");
const Router  = require('./routers/introRoute.js')
const About  = require('./routers/aboutRoute.js')
const skills = require('./routers/skillsRoute.js')
const education = require('./routers/educationRoute.js')
const contact = require('./routers/contactRoute.js')
const uploadRouter = require('./routers/uploadImage-router.js')
const projectRouter = require('./routers/projectRoute.js')

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use("/api/introduce" , Router)
app.use("/api/about" , About)
app.use("/api/skill" , skills)
app.use("/api/education" , education)
app.use("/api/contact" , contact)
app.use("/api/file" , uploadRouter)
app.use("/api/project" , projectRouter)

connectDB();
// ✅ Root test route
app.get("/", (req, res) => {
  res.json({
    message: `Server is running at port ${PORT}`,
  });
});

app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`)
})
