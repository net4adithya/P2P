/* ===== JS ===== */
// Section Switcher
function showSection(id){
  document.querySelectorAll('.section').forEach(sec => sec.style.display='none');
  document.getElementById(id).style.display='block';
}

// Sample Data
const builds = [
  { id:1, title:"Portfolio Website", author:"Adithya", tags:["WebDev","HTML","CSS"], applause:0, peerRequested:false, verified:false },
  { id:2, title:"AI Resume Scanner", author:"Keerthi", tags:["Python","AI"], applause:0, peerRequested:false, verified:true },
  { id:3, title:"Marketing Campaign Plan", author:"Ravi", tags:["Marketing","Strategy"], applause:0, peerRequested:false, verified:false }
];

const userProfile = {
  name: "Adithya Haran",
  bio: "Aspiring Fullstack Developer",
  skills: ["HTML","CSS","JS"],
  tags: ["Learner"],
  builds: builds
};

const notifications = [
  { type:"Peer", message:"Keerthi accepted your peer request" },
  { type:"Build", message:"Ravi applauded your build" },
  { type:"Recruiter", message:"RecruitMark sent you a message" }
];

const searchItems = [
  { type:"Peer", name:"Keerthi", tags:["Python","AI"] },
  { type:"Build", name:"Portfolio Website", tags:["WebDev","HTML","CSS"] },
  { type:"Group", name:"Fullstack Learners", tags:["WebDev","JS"] }
];

// Render Feed
const feedContainer = document.getElementById('feed');
function renderFeed(){
  feedContainer.innerHTML = '';
  builds.forEach(build => {
    const card = document.createElement('div');
    card.className='build-card';
    card.innerHTML=`
      <h3>${build.title} ${build.verified ? '🏅' : ''}</h3>
      <div class="tags"><strong>${build.author}</strong> | Tags: ${build.tags.join(', ')}</div>
      <div class="buttons">
        <button class="applause-btn">Applause (${build.applause})</button>
        <button class="peer-btn">${build.peerRequested ? 'Request Sent' : 'Request Peer'}</button>
      </div>
    `;
    card.querySelector('.applause-btn').addEventListener('click', ()=>{
      build.applause++; renderFeed();
    });
    card.querySelector('.peer-btn').addEventListener('click', ()=>{
      if(!build.peerRequested){
        build.peerRequested=true;
        alert(`Peer request sent to ${build.author}`);
        renderFeed();
      }
    });
    feedContainer.appendChild(card);
  });
}

// Render Profile
const profileContainer = document.getElementById('profile');
function renderProfile(){
  profileContainer.innerHTML = `
    <h2>${userProfile.name}</h2>
    <p><strong>Bio:</strong> ${userProfile.bio}</p>
    <p><strong>Skills:</strong> ${userProfile.skills.join(', ')}</p>
    <p><strong>Status:</strong> ${userProfile.tags.join(', ')}</p>
    <h3>Builds:</h3>
    <ul>
      ${userProfile.builds.map(b=>`<li><strong>${b.title}</strong> ${b.verified?'🏅':''} | Tags: ${b.tags.join(', ')}</li>`).join('')}
    </ul>
  `;
}

// Render Mailbox
const mailboxContainer = document.getElementById('mailbox');
function renderMailbox(){
  mailboxContainer.innerHTML = '<h2>Mailbox</h2><ul>' + 
    notifications.map(n=>`<li><strong>${n.type}:</strong> ${n.message}</li>`).join('') +
    '</ul>';
}

// Search
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
if(searchInput){
  searchInput.addEventListener('input', ()=>{
    const query = searchInput.value.toLowerCase();
    const filtered = searchItems.filter(item => item.name.toLowerCase().includes(query) || item.tags.join(' ').toLowerCase().includes(query));
    resultsDiv.innerHTML = filtered.map(item=>`<p><strong>${item.type}:</strong> ${item.name} | Tags: ${item.tags.join(', ')}</p>`).join('');
  });
}

// Chat Simulation
const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
if(sendBtn){
  sendBtn.addEventListener('click', ()=>{
    if(chatInput.value.trim()!==''){
      const msgDiv = document.createElement('div');
      msgDiv.className='chat-message';
      msgDiv.innerText = `You: ${chatInput.value}`;
      chatBox.appendChild(msgDiv);
      chatInput.value='';
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  });
}

// Groups
let groups = [];
const groupNameInput = document.getElementById('groupNameInput');
const createGroupBtn = document.getElementById('createGroupBtn');
const groupsList = document.getElementById('groupsList');

if(createGroupBtn){
  createGroupBtn.addEventListener('click', ()=>{
    const name = groupNameInput.value.trim();
    if(name){
      const newGroup = { name, members: [userProfile.name] };
      groups.push(newGroup);
      groupNameInput.value='';
      renderGroups();
    }
  });
}

function renderGroups(){
  if(groupsList){
    groupsList.innerHTML = groups.map(g=>`<p><strong>${g.name}</strong> | Members: ${g.members.join(', ')}</p>`).join('');
  }
}

// Initialize
renderFeed();
renderProfile();
renderMailbox();
