const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: "./views",
    layoutsDir: "./views",
    defaultLayout: "crEvent.hbs",
  },
  viewPath: "./views/",
  extName: ".hbs",
};
export const createEvent = async (startDate, eventName, email, displayname) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secure: false,
    port: 587,
    auth: {
      user: "carlo3030@hotmail.hu",
      pass: "Karika37",
    },
  });
  transporter.use("compile", hbs(handlebarOptions));

  const tr = await transporter
    .sendMail({
      from: "carlo3030@hotmail.hu",
      to: email,
      subject: "",
      template: "crEvent",
      text: `Hi ${displayname} thank You for Adding Your Eventlinny event!!`,
      context: {
        from: "Eventlinny",
        name: displayname,
        start: startDate,
        event: eventName,
      },
    })
    .then(() => {
      console.log("sent");
    })
    .catch((err) => {
      console.log(err);
    });
};
