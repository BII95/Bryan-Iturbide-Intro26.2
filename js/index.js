messagesVisable();
let footerElement = document.createElement("footer");
document.body.appendChild(footerElement);
let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer");
let copyright = document.createElement('p');
copyright.textContent = `\u00A9 Bryan Iturbide ${thisYear}`
footer.appendChild(copyright);

let skills = ["Javascript", "HTML", "CSS", "Solidworks", "GitHub", "Javascript", "HTML", "CSS", "Adobe Photoshop", "GitHub", "Javascript", "HTML", "CSS", "Adobe Photoshop", "GitHub", "Javascript", "HTML", "CSS", "Adobe Photoshop", "GitHub"];
let skillsSection = document.getElementById("Skills");
let skillsList = skillsSection.querySelector(".wall-tags");
for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}
let messageForm = document.getElementsByName('leave_message')[0];
messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let nameSubmission = event.target.usersName.value;
    let emailSubmission = event.target.usersEmail.value;
    let messageSubmission = event.target.usersMessage.value;
    console.log(nameSubmission, emailSubmission, messageSubmission);
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
    console.log(removeButton.type, removeButton.textContent);

    removeButton.addEventListener("click", (event) => {
        let entry = removeButton.parentNode;
        entry.remove();
        messagesVisable();
    })
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    messagesVisable();
    messageForm.reset();
});

function messagesVisable(){
    let messagesSectionDom=document.getElementById("messages");
    let messageList = messagesSectionDom.querySelector('ul');
    if (messageList.childElementCount==0){
        messagesSectionDom.style.display= "none";
    } 
    else{
        messagesSectionDom.style.display="";}
}