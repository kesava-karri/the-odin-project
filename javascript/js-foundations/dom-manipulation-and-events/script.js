const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

container.appendChild(content);

const p = document.createElement("p");
p.classList.add('red-text');
p.textContent = "Hey I'm red!";
p.style.cssText = "color: red";

container.appendChild(p);

const header3 = document.createElement("h3");
header3.style.color = "blue";
header3.textContent = "I'm a blue h3!";
container.appendChild(header3);

const innerDiv = document.createElement("div");
innerDiv.style.border = "2px solid black";
innerDiv.style.backgroundColor = "pink";
container.appendChild(innerDiv);

const header1 = document.createElement("h1");
header1.textContent = "I'm in a div";
innerDiv.appendChild(header1);

const innerPara = document.createElement("p");
innerPara.textContent = "ME TOO!";
innerDiv.appendChild(innerPara);


