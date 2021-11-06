/* global config */
/* eslint no-undef: "error" */

import { setAuth } from "../../utils/auth.js";
import { parse } from "./auth.js";

async function setReplyAuth(msg) {
  const [id, isOn] = parse(msg.text, "reply_auth");
  const list = new Map([...msg.bot.fl, ...msg.bot.gl]);

  if (config.masters.includes(id)) {
    await msg.bot.say(id, "我永远都不会不理主人哦~", "private");
    return;
  }

  await setAuth(msg, "响应消息", ...parse(msg.text, "reply_auth"));

  // 如果是群或者好友，发一条消息给对方，群友就不发了
  list.forEach(async (item) => {
    const curType = item.group_id ? "group" : "private";
    const itemID = item.group_id ? item.group_id : item.user_id;

    if (itemID == id) {
      // 群通知不需要 @
      await msg.bot.say(id, `主人已${isOn ? "允许" : "禁止"}我响应消息。`, curType);
    }
  });
}

export { setReplyAuth };
