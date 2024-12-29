const express = require('express');
const router = express.Router();

require('dotenv').config("../..");

const { mongo } = require("../mongo");


router.use(express.json());
router.get("/", async (req, res) => { res.sendFile("signup.html", { root: "public/signup/" }) })



router.post("/auth", async (req, res) => {
    const {userEmail, userPassword, company, lastName, firstName} = req.body;
    console.log(userEmail, userPassword, company, lastName, firstName)

    const result = await mongo("SELECT", "tabOrder", {userEmail: userEmail});
    if(result.length!=0){ return res.status(400).json({error: "가입되어 있는 이메일 입니다."}) }

    await mongo("INSERT", "tabOrder", {userEmail, userPassword, company, lastName, firstName, menu: []});

    return res.status(200).json({message: "회원가입 성공"})
})


module.exports = router;