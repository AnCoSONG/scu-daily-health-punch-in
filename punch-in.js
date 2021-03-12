function dataProcess(template) {
  Date.prototype.Format = function (fmt) {
    //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      S: this.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  };
  template.created = parseInt((Date.now() / 1000).toFixed());
  template.date = new Date().Format("yyyyMMdd");
  if (template.sfjcbh == 0) {
    template.jcbhlx = "";
    template.jcbhrq = "";
  }

  if (template.sfcyglq == 0) {
    template.gllx = "";
    template.glksrq = "";
  }

  if (template.sfcxtz == 0) {
    template.sfyyjc = 0;
  }
  if (template.sfyyjc == 0) {
    template.jcjgqr = 0;
    template.jcjg = "";
  }

  if (template.sfcxzysx == 0) {
    template.qksm = "";
  }
  if (true) {
    template.szcs = "";
    template.szgj = "";
  }

  if (template.sfjxhsjc != 1) {
    template.hsjcrq = "";
    template.hsjcdd = "";
    template.hsjcjg = 0;
  }

  if (template.sfzx != 1) {
    template.szxqmc = "";
  } else {
    template.bzxyy = "";
  }
  if (
    ["成都市", "上海市", "重庆市", "天津市"].indexOf(template.province) > -1
  ) {
    template.city = template.province;
  }
  return template;
}
exports.punchIn = async function () {
  try {
    const data = require("./template-chengdu.json");
    const axios = require("axios").default;
    const qs = require("qs");
    const template = dataProcess(data);
    const res = (await axios.post(
      "https://wfw.scu.edu.cn/ncov/wap/default/save",
      qs.stringify(template),
      {
        headers: {
          cookie:
            "UUkey=51c53f223b63262df069e8197bddae3a; eai-sess=66hkd4ppnhepml8p0pf3gfnal1; Hm_lvt_48b682d4885d22a90111e46b972e3268=1614413170,1614413208,1615308442; Hm_lpvt_48b682d4885d22a90111e46b972e3268=1615308442",
          "content-type": "application/x-www-form-urlencoded",
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.192 Safari/537.36",
        },
      }
    )).data
    if(res.e === 0){
      return {
        error: false
      }
    }else {
      throw new Error(res.m)
    }
  } catch (err) {
    return {
      error: true,
      msg: err.message
    }
  }
};
