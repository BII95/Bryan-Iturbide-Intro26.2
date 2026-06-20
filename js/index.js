messagesVisible();

//////////FOOTER
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
    "Bi-lingual(English & Spanish)",
    "Onshape",
    "Leadership",
    "Fusion 360",
    "Python",
    "Collaboration",
    "Communication",
    "Project Management",
    "MATLAB"
];

/////////SKILLS
let skillsSection = document.getElementById("Skills");
let skillsList = skillsSection.querySelector(".wall-tags");
for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}

//CONTACT FORM
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
    if (messageList.childElementCount === 0) {
        messagesSectionDom.style.display = "none";
    }
    else {
        messagesSectionDom.style.display = "";
    }
}
let projectSection=document.getElementById('Projects');
fetch("https://api.github.com/users/BII95/repos")
    .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error ${res.status}`);
            }

            return res.json();
        })
    .then(data =>{
        const repositories=data;
        console.log(repositories);
        let projectList=projectSection.querySelector('ul');
        for (let i=0;i<repositories.length;i++){
            let project=document.createElement('li');
            project.innerHTML=`
            <a href="${repositories[i].html_url}" target="_blank">
                ${repositories[i].name}
            </a>`;
            projectList.appendChild(project);            
        }
    })
    .catch(error =>{
        console.error("Error: ", error.message);
        let errorOnPage=document.createElement("p");
        errorOnPage.textContent=`API fetch failed: ${error.message}`;
        projectSection.appendChild(errorOnPage);
    });
