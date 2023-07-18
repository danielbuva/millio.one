const {
  throwIfError,
  throwError,
  returnError,
} = require("./error.server");
const { jwtConfig, isProduction } = require("../../config");
const { hashSync, compareSync } = require("bcryptjs");
const { DayCheckIn, NightCheckIn, User } = require("../../db/models");
const { secret, expiresIn } = jwtConfig;
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const setTokenCookie = (res, user) => {
  const token = jwt.sign(
    { data: user },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  res.cookie("token", token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
  });

  return token;
};

const restoreSession = (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.findByPk(id, {
        attributes: {
          include: ["email", "createdAt", "updatedAt"],
        },
      });
    } catch (e) {
      res.clearCookie("token");
      return next();
    }

    if (!req.user) res.clearCookie("token");

    return next();
  });
};

const verifyAuth = (req, _, next) => {
  if (req.user) return next();

  const err = new Error("Authentication required");
  err.title = "Authentication required";
  err.errors = { message: "Authentication required" };
  err.status = 401;
  return next(err);
};

const restoreCsrf = (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.json({ "XSRF-Token": csrfToken });
};

const getUser = async (req, res) => {
  const { user } = req;

  if (user) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [hasDayEntryToday, hasNightEntryToday] = await Promise.all([
      DayCheckIn.count({
        where: { userId: user.id, createdAt: { [Op.gte]: today } },
      }),
      NightCheckIn.count({
        where: { userId: user.id, createdAt: { [Op.gte]: today } },
      }),
    ]);

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        hasDayEntryToday,
        hasNightEntryToday,
        mute: user.mute,
      },
    });
  }
  return res.json({ user: null });
};

const logout = (_, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
};

const validLogin = ({ email, password }) => {
  let errorResult = {
    message: "invalid credentials",
    errors: {},
    status: 500,
  };
  if (!email) {
    errorResult.errors.email = "email is required";
  }
  if (!password) {
    errorResult.errors.password = "password is required";
  }
  throwIfError(errorResult);
  return { email, password };
};

const login = async (req, res) => {
  try {
    const { email, password } = validLogin(req.body);

    const data = await User.unscoped().findOne({ where: { email } });

    let passwordMatch;
    if (data) {
      passwordMatch = compareSync(
        password,
        data.hashedPassword.toString()
      );
    }

    if (!data || !passwordMatch) {
      throwError(401, "Invalid credentials");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [hasDayEntryToday, hasNightEntryToday] = await Promise.all([
      DayCheckIn.count({
        where: { userId: data.id, createdAt: { [Op.gte]: today } },
      }),
      NightCheckIn.count({
        where: { userId: data.id, createdAt: { [Op.gte]: today } },
      }),
    ]);

    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      hasDayEntryToday,
      hasNightEntryToday,
      mute: data.mute,
    };

    setTokenCookie(res, user);
    return res.json({ user });
  } catch (err) {
    returnError(err, res);
  }
};

const checkIfAvailable = async (email) => {
  let errorResult = {
    message: "user already exists",
    errors: {},
    status: 500,
  };
  const emailExists = await User.findOne({ where: { email } });

  if (emailExists) {
    errorResult.errors.email = "email in use";
  }

  throwIfError(errorResult);
  return email;
};

const validSignUp = async ({ email, password, name }) => {
  let errorResult = {
    message: "Bad Request",
    errors: {},
    status: 400,
  };
  if (!email) {
    errorResult.errors.email = "invalid email";
  }
  if (!password) {
    errorResult.errors.password = "password is required";
  }
  if (!name) {
    errorResult.errors.username = "name is required";
  }
  throwIfError(errorResult);
  await checkIfAvailable(email);
  return { email, password, name };
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = await validSignUp(req.body);

    const hashedPassword = hashSync(password);
    const data = await User.create({
      name,
      email,
      hashedPassword,
    });

    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      hasDayEntryToday: 0,
      hasNightEntryToday: 0,
      mute: data.mute,
    };

    setTokenCookie(res, user);
    return res.json({ user });
  } catch (err) {
    returnError(err, res);
  }
};

const toggleMute = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    console.log(user.mute);
    user.update({ mute: !user.mute });

    res.json({ message: "sucess" });
  } catch (err) {
    returnError(err, res);
  }
};

module.exports = {
  restoreCsrf,
  restoreSession,
  session: {
    getUser,
    login,
    logout,
    toggleMute,
  },
  user: { signup },
  verifyAuth,
};
