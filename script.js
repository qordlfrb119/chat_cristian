document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  const todayKey = new Date().toISOString().split('T')[0];

  if (localStorage.getItem(todayKey)) {
    alert("🙏 오늘은 이미 응답을 받으셨습니다. 내일 다시 찾아와 주세요.");
    chatForm.querySelector("button").disabled = true;
    userInput.disabled = true;
  }

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";

    const loading = appendMessage("bot", "🙏 응답을 준비 중입니다...");

    try {
      const res = await fetch("https://chatgpt-server-1-bghh.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      loading.textContent = data.reply;

      localStorage.setItem(todayKey, "used");
      chatForm.querySelector("button").disabled = true;
      userInput.disabled = true;
    } catch (err) {
      loading.textContent = "❌ 오류 발생: " + err.message;
    }
  });

  function appendMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "user" ? "user-message" : "bot-message";
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv;
  }
});




