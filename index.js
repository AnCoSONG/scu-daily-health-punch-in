const { punchIn } = require("./punch-in");
const nodemailer = require("nodemailer");
async function index() {
  const res = await punchIn();
  console.log(res);
  console.log(process.argv);
  try {
      const user = process.argv[2];
      const pass = process.argv[3]; // new auth code
      const to = "me@anco.fun";
      const transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 587,
        secure: false,
        auth: {
          user: user,
          pass: pass,
        },
      });
      const info = await transporter.sendMail({
        from: `小号1<${user}>`,
        to: `小号2<${to}>`,
        subject: `每日报提交状态:${res.error?'✘':'✔'}`,
        text: `<h1>错误信息</h1><p>${res.error?res.msg:''}</p>`,
      });
      console.log('发送成功\n', info)
  }catch(err) {
      console.log('发送失败')
      console.error(err)
  }
}

index();
