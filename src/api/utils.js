import state from "../store/moudle/user/state";

export const getCount = count => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
};

// 用于rank数据的分类，区分官方榜单和全球榜单
export const filterIndex = rankList => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

// 处理歌手列表拼接歌手名字
export const getName = list => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

let elementStyle = document.createElement("div").style;

let vendor = (() => {
  let transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransfrom",
    ms: "msTransform",
    standard: "Transform"
  };

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();
export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === "standard") {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

//拼接出歌曲的url链接
export const getSongUrl = id => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

export const formatPlayTime = interval => {
  interval = interval | 0; // |0表示向下取整
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};

//判断一个对象是否为空对象
export const isEmptyObject = obj => {
  let tag = !obj || Object.keys(obj).length === 0;
  // console.log(tag);
  return tag;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// 随机算法
export function shuffle(arr) {
  let new_arr = [];
  arr.forEach(item => {
    new_arr.push(item);
  });
  for (let i = 0; i < new_arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
}

// 找到当前的歌曲索引
export const findIndex = (song, list) => {
  return list.findIndex(item => {
    return song.id === item.id;
  });
};

export const maxWidth = screen.width;

export const touchmove = (e, start, cb, status, flag) => {
  let newX = e.touches[0].pageX;
  // 对滑动的距离做一个修正，避免超出实际能够滑出的距离
  let move = newX - start;
  // 向右移动，收起浮层,或者是返回网页
  if (move > 0) {
    if (flag === "open") {
      move = move > maxWidth ? maxWidth : move;
      // 这里是控制显示的逻辑，如果在这时已经显示了，那就没有必要再触发事件
      if (status) return;
      if (Math.abs(move) > maxWidth / 3) {
        cb();
      }
    } else if (flag === "goback") {
      if (!status) return;
      status = false;
      cb();
    }
  } else {
    // 向左移动
    if (flag === "close") {
      move = move < -maxWidth ? -maxWidth : move;
      if (!status) return;
      // 根据移动的距离，设置元素向左移动的距离，移动1/4距离就可以进行相应切换
      if (Math.abs(move) > maxWidth / 4) {
        cb();
      }
    }
  }
};

// 清除cookie，用户cookie存在，但是没有uid，为了显示正常，所以清除当前cookie
export const clearCookie = () => {
  let express = new Date();
  express.setTime(express.getTime() - 1000);
  document.cookie = `MUSIC_U='clearCookie';path=/;expires=${express.toGMTString()}`;
};

// 获取用户信息，并发起请求获取数据
export const getUserInfo = (cb, uid) => {
  try {
    uid = uid ? uid : localStorage.getItem("uid");
    if (uid) {
      cb(uid);
    } else {
      clearCookie();

      console.log(document.cookie);
    }
  } catch (e) {
    console.log(e);
  }
};
