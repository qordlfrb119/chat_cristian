async function sendMessage() {
  const message = document.getElementById('message').value;
  const responseBox = document.getElementById('response');

  responseBox.textContent = '🙏 응답 대기 중...';

  try {
    const res = await fetch('https://chatgpt-server-1-bghh.onrender.com/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    responseBox.textContent = data.reply;
  } catch (err) {
    responseBox.textContent = '❌ 오류 발생: ' + err.message;
  }
}
