const {
  throwIfError,
  throwError,
  returnError,
} = require("./error.server");
const { jwtConfig, isProduction } = require("../config");
const { hashSync, compareSync } = require("bcryptjs");
const { User } = require("../db/models");
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

const getAllUsers = async (_, res) => {
  const users = await User.findAll();
  res.json(users);
};

const getUser = (req, res) => {
  const { user } = req;
  if (user) {
    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    return res.json({
      user: data,
    });
  } else return res.json({ user: null });
};

const logout = (_, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
};

const validLogin = ({ credential, password }) => {
  let errorResult = {
    message: "Invalid credentials",
    errors: {},
    status: 500,
  };
  if (!credential) {
    errorResult.errors.credential = "Email or username is required";
  }
  if (!password) {
    errorResult.errors.password = "Password is required";
  }
  throwIfError(errorResult);
  return { credential, password };
};

const login = async (req, res) => {
  try {
    const { credential, password } = validLogin(req.body);

    const data = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });

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

    const user = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
    };

    setTokenCookie(res, user);
    return res.json({ user });
  } catch (err) {
    returnError(err, res);
  }
};

const checkIfAvailable = async ({ email, username }) => {
  let errorResult = {
    message: "User already exists",
    errors: {},
    status: 500,
  };
  const [emailExists, usernameExists] = await Promise.all([
    User.findOne({ where: { email } }),
    User.findOne({ where: { username } }),
  ]);

  if (emailExists) {
    errorResult.errors.email = "User with that email already exists";
  }

  if (usernameExists) {
    errorResult.errors.username = "User with that username already exists";
  }

  throwIfError(errorResult);
  return { email, username };
};

const validSignUp = async ({
  firstName,
  lastName,
  email,
  password,
  username,
}) => {
  let errorResult = {
    message: "Bad Request",
    errors: {},
    status: 400,
  };
  if (!firstName) {
    errorResult.errors.firstName = "First Name is required";
  }
  if (!lastName) {
    errorResult.errors.lastName = "Last Name is required";
  }
  if (!email) {
    errorResult.errors.email = "Invalid email";
  }
  if (!password) {
    errorResult.errors.password = "Password is required";
  }
  if (!username) {
    errorResult.errors.username = "Username is required";
  }
  throwIfError(errorResult);
  await checkIfAvailable({ email, username });
  return { firstName, lastName, email, password, username };
};

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, username } =
      await validSignUp(req.body);

    const hashedPassword = hashSync(password);
    const data = await User.create({
      firstName,
      lastName,
      email,
      username,
      hashedPassword,
    });

    const user = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
    };

    setTokenCookie(res, user);
    return res.json({ user });
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
  },
  user: { getAllUsers, signup },
  verifyAuth,
};
