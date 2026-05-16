;(async()=>{
  const url = $request.url;

  if (!url.includes('gate-obt.nqf.qq.com/prod/ws')) {
    $done({});
    return;
  }

  if (globalThis.caught) {
    $done({ status: 'reject' });
    return;
  }
  globalThis.caught = true;

  const codeMatch = url.match(/code=([^&]+)/);
  const code = codeMatch ? codeMatch[1] : '';

  const platformMatch = url.match(/platform=([^&]+)/);
  const platform = platformMatch ? platformMatch[1] : '';

  if (!code) {
    $notify('获取失败', '', '未拿到 code');
    $done({ status: 'reject' });
    return;
  }

  let name, suffix;
  if (platform === 'qq') {
    name = 'qq-bot';
    suffix = '';
  } else {
    name = 'wx-bot';
    suffix = ' --wx';
  }

  const cmd = `${code}`;

  $notify('已获取 code', '已获取', cmd);

  $done({ status: 'reject' });
})();




/*  
loon脚本
*/


;(async () => {
  const url = $request.url;
  const headers = $request.headers;

  // 提取 code
  const codeMatch = url.match(/code=([^&]+)/);
  const code = codeMatch ? codeMatch[1] : "未获取到 code";

  // 只通知 code
  $notification.post("已获取 CODE", "", code);

  // 拦截请求
  $done({ response: { status: 403 } });
})();

