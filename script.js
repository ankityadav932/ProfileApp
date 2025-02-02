// Main JavaScript File
// ===========================


// Navigation slider 
let links = document.querySelectorAll('div#bar > div#menu > span.tab-btn, div#barp + div#bmenu > p.tab-btn');
let activeLink = document.querySelector('div#bar > div#menu > span.tab-btn.active, div#barp + div#bmenu > p.tab-btn.active');
let pages = document.querySelectorAll('div#wrapper > section');
let activePage = document.querySelector('div#wrapper > section.active')
let activePageIndex = activePage.getAttribute('index');
let working = false;

const setPages = (activeIndex) => 
{
	pages.forEach(page => {

		let pageIndex = page.getAttribute('index');

		if (pageIndex > activeIndex) 
			page.style.transform = 'translate(100%)';
		else if (pageIndex < activeIndex)
			page.style.transform = 'translate(-100%)';

	});
}

setPages(activePageIndex);

links.forEach(link => {

	link.addEventListener('click', evt => {

		if (link == activeLink || working) 
			return;

		working = true;
		let newPage = link.getAttribute('target');
		newPage = document.querySelector(newPage);
		let newPageIndex = newPage.getAttribute('index');
		let action = newPageIndex > activePageIndex ? 'next' : 'prev';
		
		links.forEach(loopLink => loopLink.classList.remove('active'));
		link.classList.add('active');
		newPage.classList.add('new');

		newPage.style.transform = `translate(0%)`;
		setPages(newPageIndex);

		setTimeout(() => {

			activePage.classList.remove('active');
			newPage.classList.add('active');
			newPage.classList.remove('new');
			activePage = newPage;
			activeLink = link; 
			working = false;

		}, 1500);

	});
});



// Auto Typer
let typingElem = document.querySelector('#typeme');
let timeoutSpeed = 60;
let words = ['Web Application | Developer', 'Logical Programming | Practitioner', 'Tech Enthusiast', 'Curious Learner'];
let totalWords = words.length;

const typer = (wordIndex, word, action) =>
{
	wordIndex = wordIndex >= words.length ? 0 : wordIndex;
	word = word ?? words[wordIndex];
	word = word.split("") ?? [];	

	if (action == 'type') 
	{
		if (word.length) 
		{
			let char = word[0] == '|' ? '<br/>' : word[0];
			typingElem.innerHTML += char;
			word.shift();
			word = word.join("");
			setTimeout(() => {typer(wordIndex, word, 'type')}, timeoutSpeed);
		}
		else	
		{
			word = words[wordIndex];
			setTimeout(() => {typer(wordIndex, word, 'erase')}, 1500);
		}
	}
	else if (action == 'erase')
	{
		if (word.length) 
		{
			word.pop();
			word = word.join("");
			typingElem.innerHTML = word.replace('|', '<br/>');
			setTimeout(() => {typer(wordIndex, word, 'erase')}, timeoutSpeed/2);			
		}
		else
		{
			wordIndex++;
			word = words[wordIndex];
			setTimeout(() => {typer(wordIndex, word, 'type')}, timeoutSpeed);
		}

	}
	else console.error('Unknown action passed to typer');
} 

typer(0, words[0], 'type');



// Skills Cube
const cube = document.querySelector('#skillcube');
let sideArr = ['back','bottom','right','top','left','front'];
let currentClass = '';
let i = 0;

const changeSide = () => 
{  
  i = (i < sideArr.length) ? i+1 : 0;
  var showClass = 'show-' + sideArr[i];
  if ( currentClass ) {
    cube.classList.remove( currentClass );
  }
  cube.classList.add( showClass );
  currentClass = showClass;

  setTimeout(changeSide, 1000);
}  

changeSide();



// Project slider
let projectTitles = document.querySelectorAll('div.projectlist > div');
let projectDetails = document.querySelectorAll('div.projectinfo > div');

projectTitles.forEach(title => {

	title.addEventListener('click', evt => {

		let detail = document.querySelector(title.getAttribute('target'));

		projectTitles.forEach(title_ => title_.classList.remove('active'));

		if (!title.classList.contains('active'))
			title.classList.add('active')

		projectDetails.forEach(detail_ => detail_.classList.remove('active'));

		if (!detail.classList.contains('active'))
			detail.classList.add('active')	

	});

});



// Send Email
let conatactForm = document.querySelector('#contactform');

conatactForm.addEventListener('submit', evt => {

	evt.preventDefault();

	let name = document.querySelector('#name').value;
	let email = document.querySelector('#email').value;
	let mobile = document.querySelector('#mobile').value;
	let message = document.querySelector('#message').value;
	let submitBtn = document.querySelector('#submitbtn');
	let submitLoader = document.querySelector('#sendingloader');
 
	submitLoader.classList.remove('d-none');
	submitBtn.classList.add('d-none');

	fetch('https://ankityadav-profile-server.onrender.com/send-mail', {
		method : 'POST',
		headers : {
			 "Content-type" : "application/json"
		},
		body : JSON.stringify({
			name : name,
			email : email,
			phone : mobile,
			message : message
		})
	})	
	.then(res => res.json())
	.then(res => {

		submitLoader.classList.add('d-none');
		submitBtn.classList.remove('d-none');

		if(res.status)
			alert('Email sent successfully');
		else
			alert('Failed to send email');
	})
	.catch(console.error)

});



// Preloader remover 
setTimeout(() => {
	document.querySelector('#preloader').classList.add('d-none');
}, 3000);


// Phone Menu
let menuBtn = document.querySelector('header#phone > div#barp > div#menu-btn');
let phoneMenu = document.querySelector('header#phone > div#bmenu');


document.addEventListener('click', evt => {
	if (evt.target == menuBtn || menuBtn.contains(evt.target))
		phoneMenu.classList.toggle('d-none');
	else if (evt.target != phoneMenu && ! phoneMenu.contains(evt.target))
		phoneMenu.classList.add('d-none');
});