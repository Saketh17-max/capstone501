fetch('https://capstone501.vercel.app').then(r => r.text()).then(html => {
  const match = html.match(/src="(\/assets\/index-[^\"]+\.js)"/);
  if (match) {
    const jsUrl = 'https://capstone501.vercel.app' + match[1];
    fetch(jsUrl).then(r => r.text()).then(js => {
      const apiMatch = js.match(/baseURL:\s*"([^"]+)"/);
      console.log('Exact baseURL:', apiMatch ? apiMatch[1] : 'Not found');
    });
  } else {
    console.log('No JS bundle found');
  }
});
