/**
 * 参与表 状态:所有
 */
var PART_STATE_ALL = -1;
/**
 * 参与表 状态:注册
 */
var PART_STATE_SIGN = 0;
/**
 * 参与表 状态:等待
 */

var PART_STATE_WAIT = 1;
/**
 * 参与表 状态:任务中
 */
var PART_STATE_ING = 2;
/**
 * 参与表 状态:提交
 */
var PART_STATE_SUBMIT = 3;
/**
 * 参与表 状态:审核
 */
var PART_STATE_CHECK = 4;
/**
 * 参与表 状态:申诉
 */
var PART_STATE_APPEAL = 5;
/**
 * 参与表 状态:撤销
 */
var PART_STATE_BREAK = 6;
/**
 * 参与表 状态:完成
 */
var PART_STATE_SUCCESS = 7;
const PART_STATE = ["注册", "等待", "任务中", "提交", "审核", "申诉", "撤销", "完成",]

var ACT_STATE_ALL = -1; //所有
var ACT_STATE_CREATE = 0; //创建
var ACT_STATE_AGGRE = 1; //集结
var ACT_STATE_TASK = 2; //任务中
var ACT_STATE_FINISH = 3; //完结

var ACT_STATE = ["创建", "集结", "进行中", "已完成"];


import $ from "jquery"


//获取活动信息
function getActInfo(id, resp) {
  var url = "/act/" + id;
  $.ajax({
    url: url,
    type: "get",
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);
    },
    error: function (data) {
      errorCheck(data);
    }
  })
}


//获取api
function getActListByApi(curr, size, search, resp) {
  if (size == null)
    size = 10;
  var url = "/api/act/list?search=" + search + "&curr=" + curr + "&size=" + size;
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);

    },
    error: function (data) {
      errorCheck(data);
    }
  })

}

//为活动添加一个表单项目
function saveActForm(actId, actForm, response) {
  var url = "/actForm/" + actId;
  $.ajax({
    url: url,
    type: "post",
    contentType: "application/json",
    data: JSON.stringify(actForm),
    success: function (data) {
      codeCheck(data)
      response(data);
    },
    error: codeCheck,
  })
}

// 获取活动表单列表
function getActFormList(actId, response) {
  var url = "/act/actFormlist/" + actId;
  $.ajax({
    url: url,
    type: "get",
    contentType: "application/json",
    success: function (data) {
      codeCheck(data)
      response(data);
    },
    error: codeCheck,
  })
}

//获取参加的列表
function getMyPartakes(resp) {
  var url = "/partake/my";
  $.ajax({
    url: url,
    success: function (data) {
      codeCheck(data)
      resp.call(this, data);
    },
    error: errorCheck
  });
}

//获取个人参与活动的参与表/报名表
function getPartake(id, resp) {
  var url = "/partake/" + id;
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data)
      resp.call(this, data);
    },
    error: errorCheck
  });
}

//参加活动
function joinAct(actId, resp) {
  var url = "/partake/join/" + actId;
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data)
      resp.call(this, data);
    },
    error: errorCheck
  });
}

//检查返回数据
function codeCheck(data) {
  if (data.code !== 0) {
    if (data.msg != null && data.msg != "") {
      console.log("请求错误")
    }
  }
  switch (data.code) {
    case  410 :
      this.$router.replace("/login");
      break; //未登录
  }

}

//检查错误信息
function errorCheck(data) {
  console.log(data);
  if (data.responseJSON.error != null) {
    console.log("请求错误")
  }
  if (data.status === 410) {
    console.log("未登录")
    location.href = "/login";
  }

}

function logout(resp) {
  $.ajax("/user/logout", {
    contentType: "application/json",
    success: (data) => resp.call(this, data),
    error: (data) => resp.call(this, data)
  })
}

function register(user, resp) {
  $.ajax("/user/reg", {
    contentType: "application/json",
    type: "post",
    data: JSON.stringify(user),
    success: data => {
      codeCheck(data), resp(data)
    },
    error: data => errorCheck(data)
  });
}

var FORM_TYPE_SINGEL = 0;
var FORM_TYPE_MUTE = 1;
var FORM_TYPE_WRITE = 2;


//提交表单
function submitActForm(partakeId, requestData, resp) {
  var url = "/partForm/partake/" + partakeId;
  this.resp = resp;
  let context = this;
  $.ajax({
    url: url,
    contentType: "application/json",
    type: "post",
    data: JSON.stringify(requestData),
    success: function (data) {
      codeCheck(data);
      context.resp(data);
    },
    error: function (data) {
      errorCheck(data);
    }
  });
}


//发布活动
function releaseAct(actId, response) {
  var url = "/act/release/" + actId;
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      response(data);
    },
    error: errorCheck
  });
}


//结束活动
function stopAct(actId, resp) {
  var url = "/act/stop/" + actId;
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);
    },
    error: errorCheck,
  })
}


// 获取活动信息
function getActBaseInfo(actId, resp) {
  var url = "/act/baseInfo/" + actId;
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);
    },
    error: errorCheck,
  })

}

function deleteAct(id, resp) {
  var url = "/act/" + id;
  $.ajax({
    url: url,
    type: "delete",
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);
    },
    error: errorCheck
  })
}

//获取审核状态的参与
function getCheckParts(actId, resp) {
  var url = "/partake/check/" + actId;
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);
    },
    error: errorCheck
  });
}

//获取审核状态的参与
function getPartsByState(actId, state, resp) {
  var url = "/partForm/list/" + actId + "/" + state;
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);
    },
    error: errorCheck
  });
}

// part 通过
function partPass(id, resp) {
  var url = "/partake/pass/" + id;
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);
    }, error: errorCheck
  })
}

//part 驳回
function partReset(id, resp) {
  var url = "/partake/reset/" + id;
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data)
    }, error: errorCheck
  })
}


function partEvent(id, type) {
  switch (type) {
    case "pass":
      partPass(id);
      break
    case "reset":
      partReset(id);
      break;
  }
}

//获取用户输入的表单。
function getPartFormBypartake(id, resp) {
  var url = "/partForm/listByPart/" + id;
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);

    },
    error: function (data) {
      errorCheck(data);

    }
  });
}

// 获取当前登录用户的信息
function getMyInfo(resp) {
  var url = "/user";
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);
    },
    error: errorCheck,
  })
}

// 获取当前登录用户的活动信息
function getMyActData(resp) {
  var url = "/my/actData";
  $.ajax({
    url: url,
    contentType: "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);
    },
    error: errorCheck,
  })
}

// 获得当前用户发布的活动
function getMyActListByState(state, page, resp) {
  var url = "/act/state/" + state;
  if (page.curr != null && page.size != null)
    url += "?curr=" + page.curr + "&size=" + page.size;
  else if (page.curr != null)
    url += "?curr=" + page.curr;

  $.ajax({
    url: url,
    "contentType": "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);
    },
    error: errorCheck,
  })

}

// 获得当前用户发布的活动
function getMyPartListByState(state, page, resp) {
  var url = "/partake/state/" + state;
  if (page.curr != null && page.size != null)
    url += "?curr=" + page.curr + "&size=" + page.size;
  else if (page.curr != null)
    url += "?curr=" + page.curr;

  $.ajax({
    url: url,
    "contentType": "application/json",
    success: function (data) {
      codeCheck(data);
      resp.call(this, data);
    },
    error: errorCheck,
  })

}


// 获取表单项的用户提交选项分析
function getFormItemAnalysis(formId, resp) {

  var url = "/data/part_form/" + formId;
  $.ajax({
    url: url,
    "contentType": "application/json",
    success: data => {
      codeCheck(data);
      resp.call(this, data);
    },
    error: errorCheck,
  })
}

// 获取用户参与/活动 分析
function getUserAnalysisByType(type, resp) {
  var url = `/data/${type}/user`;
  $.ajax({
    url: url,
    "contentType": "application/json",
    success: data => {
      codeCheck(data);
      resp.call(this, data);
    },
    error: errorCheck,
  })
}

function getUserActAnalysis(resp) {
  getUserAnalysisByType("act", resp);
}

function getUserPartAnalysis(resp) {
  getUserAnalysisByType("part", resp);
}

function createAct(data, resp) {
  this.resp = resp;
  let context = this;
  var url = "/act";
  $.ajax({
    url: url,
    contentType: "application/json",
    type: "post",
    data: JSON.stringify(data),
    success: function (data) {
      codeCheck(data);
      context.resp(data);
    },
    error: errorCheck,
  })
}


export {
  PART_STATE_ALL,
  PART_STATE_WAIT,
  PART_STATE_CHECK,
  PART_STATE_SUCCESS,
  PART_STATE_ING,
  PART_STATE_SUBMIT,
  PART_STATE_APPEAL,
  PART_STATE_BREAK,
  PART_STATE,
  ACT_STATE_ALL,
  ACT_STATE_CREATE,
  ACT_STATE_AGGRE,
  ACT_STATE_TASK,

  ACT_STATE_FINISH,
  ACT_STATE,

  FORM_TYPE_WRITE,
  FORM_TYPE_SINGEL,
  FORM_TYPE_MUTE,
  getMyPartListByState,
  getMyActListByState,
  getActListByApi,
  getActInfo,
  getMyInfo,
  getPartFormBypartake
  ,
  getCheckParts,
  getActBaseInfo,
  getPartake,
  getActFormList,
  getMyPartakes,
  partReset,
  partPass,
  logout,
  getUserActAnalysis,
  getUserPartAnalysis,
  getFormItemAnalysis,
  getMyActData,
  getPartsByState,
  joinAct,
  saveActForm,
  createAct,
  releaseAct,
  submitActForm,
  register

}
