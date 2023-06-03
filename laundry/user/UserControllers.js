// const { body } = require("express-validator");
// var bcrypt = require("bcryptjs");
// const UserValidators = {
//   email: (location = body, forCreate = true, field = "email") => {
//     return location(field)
//       .notEmpty()
//       .withMessage("Email wajib diisi.")
//       .bail()
//       .trim()
//       .isEmail()
//       .withMessage("Email tidak valid.")
//       .bail()
//       .custom(async (value) => {
//         const user = await UserServiceIsEmailExist(value);
//         if (forCreate && user) {
//           return Promise.reject("Email sudah terdaftar.");
//         } else if (!forCreate && !user) {
//           return Promise.reject("User tidak tersedia.");
//         }

//         return Promise.resolve(true);
//       });
//   },
//   password: (location = body, forCreate = true, field = "password") => {
//     return location(field)
//       .notEmpty()
//       .withMessage("Passsword wajib diisi.")
//       .trim()
//       .isLength({ min: 8, max: 100 })
//       .withMessage("Password minimal 8 karakter.")
//       .bail()
//       .custom(async (value, { req }) => {
//         if (!forCreate) {
//           const user = await UserServiceFetch(req.body.email);
//           BaseValidatorHandleUndefined(user, "Email");
//           const isValidPassword = await bcrypt.compare(value, user.password);
//           if (!isValidPassword) return Promise.reject("Password tidak sesuai.");
//         }

//         return Promise.resolve(true);
//       });
//   },
//   firstName: (location = body, field = "firstName") => {
//     return location(field)
//       .notEmpty()
//       .withMessage("Nama depan wajib diisi")
//       .bail()
//       .trim()
//       .customSanitizer((value) =>
//         value.replace(/\w\S*/g, function (txt) {
//           return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//         })
//       );
//   },
//   lastName: (location = body, field = "lastName") => {
//     return location(field)
//       .notEmpty()
//       .withMessage("Nama belakang wajib diisi.")
//       .bail()
//       .trim()
//       .customSanitizer((value) =>
//         value.replace(/\w\S*/g, function (txt) {
//           return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//         })
//       );
//   },
// };

// module.exports = UserValidators;
