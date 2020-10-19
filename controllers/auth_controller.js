const UserModel = require("../models/user");

function registerNew(req, res) {
    res.render("authentication/register");
}

// async function registerCreate(req, res) {
//     const { email, password, display_name } = req.body;
//     try{
//             const user = await UserModel.create({ email, password, display_name });
//             req.session.user = user;
//             res.redirect("/");
//     }
//     catch(err){
//         console.log(err)
//     }
// }

async function registerCreate(req, res, next) {
    const { email, password, display_name } = req.body;
    const user = await UserModel.create({ email, password, display_name });
    
    req.login(user, (err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/");
    });
}

// function logout(req, res) {
//     req.session.destroy(() => {
//         res.redirect("/");
//     });
// }

function logout(req, res) {
    req.logout();
    res.redirect("/");
}

function loginNew(req, res) {
    res.render("authentication/login");
}

// async function loginCreate(req, res) {
//   const { email, password } = req.body;
//   const user = await UserModel.findOne({ email });
//   if (!user) {
//     return res.render("authentication/login", { error: "Invalid email & password" });
//   }

//   const valid = await user.verifyPassword(password);
//   if (!valid) {
//     return res.render("authentication/login", { error: "Invalid email & password" });
//   }

//   req.session.user = user;
//   res.redirect("/");
// }

module.exports = {
    registerNew,
    registerCreate,
    logout,
    loginNew
}