export function toggleChat() {
    const box = document.getElementById("chatBox");
    if (box.classList.contains("hidden")) {
        box.classList.remove("hidden");
        setTimeout(() => box.classList.remove("opacity-0", "scale-95"), 10);
    } else {
        box.classList.add("opacity-0", "scale-95");
        setTimeout(() => box.classList.add("hidden"), 300);
    }
}
window.toggleChat = toggleChat;

export function sendAutoMsg(msg) {
    addMsg(msg, "user");
    setTimeout(() => {
        let reply = "";
        if (msg.includes("Giá"))
            reply =
                "Dạ, giá Spa cơ bản từ 200k. Bạn có thể xem bảng giá chi tiết tại mục 'Dịch vụ' ạ!";
        else if (msg.includes("Đặt lịch"))
            reply =
                "Bạn có thể đặt lịch nhanh bằng công cụ ở đầu trang web nhé!";
        else if (msg.includes("đưa đón"))
            reply =
                "Dạ có ạ, Paw Joy hỗ trợ book xe đưa đón bé tận nhà an toàn.";
        else
            reply =
                "Cảm ơn bạn đã quan tâm. Nhân viên sẽ liên hệ lại sớm nhất!";
        addMsg(reply, "bot");
    }, 1000);
}
window.sendAutoMsg = sendAutoMsg;

export function connectSupport() {
    window.open("https://zalo.me/0900000000", "_blank");
}
window.connectSupport = connectSupport;

export function sendUserMsg() {
    const input = document.getElementById("chatInput");
    const msg = input.value.trim();
    if (msg) {
        addMsg(msg, "user");
        input.value = "";
        setTimeout(
            () => addMsg("Cảm ơn bạn! Chúng mình sẽ phản hồi ngay.", "bot"),
            1000
        );
    }
}
window.sendUserMsg = sendAutoMsg;

export function addMsg(text, sender) {
    const chatContent = document.getElementById("chatContent");
    const div = document.createElement("div");
    div.className = `chat-msg ${sender}`;
    div.innerHTML = text;
    chatContent.appendChild(div);
    chatContent.scrollTop = chatContent.scrollHeight;
}
window.addMsg = addMsg;
