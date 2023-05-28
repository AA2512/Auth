const express = require("express");
const connectDB = require("./config/db");
const mongoose = require("mongoose");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());

// clientID - 1096204226532-ktn75c7brhf7vt6ugs2na30ptg3rhkod.apps.googleusercontent.com
// clientSecret - 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

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1096204226532-ktn75c7brhf7vt6ugs2na30ptg3rhkod.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Access Token: ", accessToken);
      console.log("Refresh Token: ", refreshToken);
      console.log("Profile: ", profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/callback", passport.authenticate("google"));

app.listen(3000, () => {
  console.log("Server is running on Port 3000");
});

// https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?
// response_type=code&
// redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fcallback&
//scope=profile%20email
// &client_id=1096204226532-ktn75c7brhf7vt6ugs2na30ptg3rhkod.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow

// http://localhost:3000/auth/google/callback?code=4%2F0AbUR2VNFB3QafQkAZqkUhq5oOUwahvCrfUciLqzk9Bra8xezzviyia8VdrXCOQOst0A7Tg&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&prompt=consent
