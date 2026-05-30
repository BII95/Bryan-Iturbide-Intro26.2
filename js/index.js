messagesVisible();
//////////FOOTERRRRRRRRRRRRRRRRRRRRRR
let footerElement = document.createElement("footer");
document.body.appendChild(footerElement);
let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer");
let copyright = document.createElement('p');
copyright.textContent = `\u00A9 Bryan Iturbide ${thisYear}`
footer.appendChild(copyright);

let skills = [
    "JavaScript",
    "HTML",
    "CSS",
    "SolidWorks",
    "GitHub",
    "Adobe Photoshop"
];
/////////SKILLLLLLLSSSSSSSSS
let skillsSection = document.getElementById("Skills");
let skillsList = skillsSection.querySelector(".wall-tags");
for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}
//CONTACTTTTTTTTTTTTTTTTTT FORMMMMMMMMM
let messageForm = document.getElementsByName('leave_message')[0];
messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let nameSubmission = event.target.usersName.value;
    let emailSubmission = event.target.usersEmail.value;
    let messageSubmission = event.target.usersMessage.value;
    console.log(nameSubmission,emailSubmission,messageSubmission);
    let messageSection = document.getElementById("messages");
    let messageList = messageSection.querySelector('ul');
    let newMessage = document.createElement('li');
    newMessage.innerHTML = `
        <a href="mailto:${emailSubmission}">
            ${nameSubmission}:
        </a>
        <span>
            ${messageSubmission}
        </span>`;
    let removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    removeButton.type = "button";
    removeButton.addEventListener("click", (event) => {
        let entry = removeButton.parentNode;
        entry.remove();
        messagesVisible();
    })
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    messagesVisible();
    messageForm.reset();
});

function messagesVisible() {
    let messagesSectionDom = document.getElementById("messages");
    let messageList = messagesSectionDom.querySelector('ul');
    if (messageList.childElementCount == 0) {
        messagesSectionDom.style.display = "none";
    }
    else {
        messagesSectionDom.style.display = "";
    }
}