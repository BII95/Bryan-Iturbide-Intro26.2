let footerElement=document.createElement("footer");
document.body.appendChild(footerElement);
let today= new Date();
let thisYear=today.getFullYear();
let footer=document.querySelector("footer");
let copyright=document.createElement('p');
copyright.textContent=`\u00A9 Bryan Iturbide ${thisYear}`
footer.appendChild(copyright);  

let skills=["Javascript","HTML","CSS","Solidworks","GitHub","Javascript","HTML","CSS","Adobe Photoshop","GitHub","Javascript","HTML","CSS","Adobe Photoshop","GitHub","Javascript","HTML","CSS","Adobe Photoshop","GitHub"];
let skillsSection=document.getElementById("Skills");
let skillsList=skillsSection.querySelector(".wall-tags");
for(let i=0; i<skills.length;i++){
    let skill=document.createElement("li")
    skill.textContent=skills[i]
    skillsList.appendChild(skill)
}

