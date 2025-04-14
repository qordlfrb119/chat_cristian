document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    // 사용자 메시지 표시
    appendMessage("user", message);
    userInput.value = "";

    // 로딩 메시지
    const loading = appendMessage("bot", "응답을 준비 중입니다...");

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      loading.textContent = data.reply || "응답이 없습니다.";
    } catch (error) {
      console.error("오류:", error);
      loading.textContent = "서버 오류가 발생했습니다.";
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

