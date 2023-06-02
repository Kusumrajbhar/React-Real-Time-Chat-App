const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { promisify } = require("util");

const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const emailCheck = await User.findOne({ email });
    const userCheck = await User.findOne({ userName });

    if (emailCheck) {
      return res.json({ msg: "email already exist", status: 400 });
    } else if (userCheck) {
      return res.json({ msg: "userName already exist", status: 400 });
    } else {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // const genSalt = promisify(bcrypt.genSalt);
      // const hash = promisify(bcrypt.hash);

      // const salt = await genSalt(saltRounds);
      // const hashedPassword = await hash(password, salt);

      const userObj = new User({
        email,
        userName,
        password: hashedPassword,
      });
      console.log("user", userObj);

      const userInfo = userObj.save();
      console.log("userInfo", userInfo);
      delete userObj.password;
      return res.json({ status: 200, msg: "User created successfully" });
    }
  } catch (err) {
    console.log("err in catch block", err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("user", user);
    if (!user) {
      return res.json({ msg: "User do not exsist", status: 400 });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("isPasswordValid", isPasswordValid);
      if (!isPasswordValid) {
        return res.json({ msg: "Please enter correct password", status: 400 });
      } else {
        console.log("matched");
        return res.json({ data: user, status: 200, msg: "User logged in" });
      }
    }
  } catch (err) {
    console.log("err in catch block", err);
    next(err);
  }
};

const setAvatar = async (req, res, next) => {
  console.log("req.body", req.body);
  try {
    const userId = req.params?.id;
    console.log("userId", userId);
    const avatarImages = req.body?.image;
    const userData = await User.updateOne(
      { _id: userId },
      {
        $set: {
          isAvatarImagesSet: true,
          avatarImages,
        },
      }
    );

    let updatedData = await User.find({ _id: userId });

    console.log("updatedData", updatedData);
    //It is not returning the json data here, returning empty json object start from here
    return res.json({
      isSet: updatedData.isAvatarImagesSet,
      image: updatedData.avatarImages,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports = { register, login, setAvatar };
