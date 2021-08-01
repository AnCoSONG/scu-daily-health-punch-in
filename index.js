const { punchIn } = require("./punch-in");
const nodemailer = require("nodemailer");
async function index() {
  
  try {
    const user = process.argv[2];
    const pass = process.argv[3]; // new auth code
    const list = require("./list.json");
    for (let l of list) {
      if (!l.work) continue;
      const res = await punchIn(l.template, l.cookie);
      console.log(res);
      const to = l.receiver;
      const nickname = l.nickname
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
        from: `健康每日报小管家<${user}>`,
        to: `${nickname}<${to}>`,
        subject: `每日报提交状态:${res.error ? "✘" : "✔"}`,
        text: `<html><body><h1>错误信息</h1><p>${res.error ? res.msg : "无错误，已成功提交！"}</p></body></html>`,
      });
      console.log("发送成功\n", info);
    }

  } catch (err) {
    console.log("发送失败");
    console.error(err);
  }
}

index();
