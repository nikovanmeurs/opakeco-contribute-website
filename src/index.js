import './index.html';
import './ko.html';
import './css/index.css';
import './img/hero.jpg';
import './img/found-ico.png';
import './img/roadmap.svg';
import './img/roadmap-wide.svg';

import './img/logo-blockchainnews.png';
import './img/logo-coinhills.png';
import './img/logo-foundico.png';
import './img/logo-icochecker.png';
import './img/logo-icocountdown.png';
import './img/logo-smithcrown.png';
import './img/logo-startupjuncture.png';
import './img/logo-tokenmarket.png';
import './img/logo-urbancrypto.png';

import './img/team-akaramanlis.jpg';
import './img/team-aparmesar.jpg';
import './img/team-bdhertog.jpg';
import './img/team-fboonman.jpg';
import './img/team-imos.jpg';
import './img/team-jxu.jpg';
import './img/team-kbasten.jpg';
import './img/team-nvmeurs.jpg';
import './img/team-rammerlaan.jpg';

import * as moment from 'moment';
import * as ScrollReveal from 'scrollreveal';

require('smoothscroll-polyfill').polyfill();

const targetDate = moment('2017-09-01T18:00:00Z');
const countdownHolder = document.createElement('div');
let countdownInterval;

const translations = {
  'en': {
    'days':    'days',
    'hours':   'hours',
    'minutes': 'minutes',
    'seconds': 'seconds',
    'until':   'until ICO',
  },

  'ko': {
    'days':    '일',
    'hours':   '시간',
    'minutes': '분',
    'seconds': '초',
    'until':   'ICO 까지',
  }
};

const detectLanguage = () => {
  const maybeLanguageId = window.location.pathname.split('/')[1];

  if (maybeLanguageId in translations) {
    return maybeLanguageId;
  }

  return 'en';
};

const translated = (key) => {
  const dictionary = translations[detectLanguage()];

  if (key in dictionary) {
    return dictionary[key];
  }

  return translations['en'][key];
};

const { reveal } = ScrollReveal();
init();

function init() {
  reveal('.List-item');
  reveal('.Roadmap');
  
  if (moment().isAfter(targetDate)) {
    return;
  }
  
  countdownHolder.className = 'Countdown';
  document.querySelector('.Hero').appendChild(countdownHolder);
  
  handleTick();
  countdownInterval = window.setInterval(handleTick, 1000);
  
  document
    .querySelectorAll('.List--press .List-item')
    .forEach(el => el.addEventListener('click', handlePressClick));
  
  const teamListItems = document.querySelectorAll('.List--team .List-item');
  teamListItems.forEach(el => el.addEventListener('mouseover', handleTeamMouseOver));
  teamListItems.forEach(el => el.addEventListener('mouseleave', handleTeamMouseLeave));

  document.querySelector('.Form-checkbox').addEventListener('change', handleCheckboxChange);
}

function handleCheckboxChange(event) {
  if (event.target.checked) {
    document.querySelector('.Form-action').disabled = false;
    document.querySelector('.Form').addEventListener('submit', handleFormSubmit);
  } else {
    document.querySelector('.Form-action').disabled = true;
    document.querySelector('.Form').removeEventListener('submit', handleFormSubmit);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  document.querySelector('.Section--contribute .Section-content').innerHTML = `
    <h2 class="Heading Section-heading">Buying tokens</h2>
    <div class="Contribute-sectionWrapper">
      <div class="Contribute-section">
        <p class="Text">Karmo tokens can be bought at a fixed rate of <span class="u-bold">1 ETH = 26.000 KRM</span>.</p>
        <p class="Text">To buy tokens, send the necessary Ether ot the Opakeco wallet using the information on the side.</p>
        <p class="Text">Are you ready to buy Karmo tokens but unsure of how to do so?</p>
        <div class="Section-actions">
          <a class="Link Section-action" href="" target="_blank">View the guide</a>
        </div>
      </div>
      <div class="Contribute-section">
        <div class="Contribute-field">
          <div class="Contribute-title">Wallet address</div>
          <div class="Contribute-value">tbd</div>
        </div>
        <div class="Contribute-field">
          <div class="Contribute-title">Gas price</div>
          <div class="Contribute-value">40 Gwei</div>
        </div>
        <div class="Contribute-field">
          <div class="Contribute-title">Recommended gas limit</div>
          <div class="Contribute-value">200.000</div>
        </div>
      </div>
    </div>
  `;
}

function handleContributeClick(event) {
  event.preventDefault();
  document.querySelector('.Section--contribute').scrollIntoView({ 
    behavior: 'smooth' 
  });
}

function handlePressClick(event) {
  event.currentTarget.querySelector('.Link').click();
}

function handleTeamMouseOver(event) {
  const listItem = event.currentTarget;
  const descriptionHeight = listItem.querySelector('.Team-description').clientHeight;

  const content = listItem.querySelector('.List-itemContent');
  content.style.transform = `translateY(${ descriptionHeight + 12 }px)`;

  const overlay = listItem.querySelector('.List-itemBackgroundOverlay');
  overlay.style.transform = 'translateY(calc(100% - 45px))';
  overlay.style.opacity = '1.0';
}

function handleTeamMouseLeave(event) {
  event.currentTarget.querySelector('.List-itemContent').style.transform = null;

  const overlay = event.currentTarget.querySelector('.List-itemBackgroundOverlay');
  overlay.style.opacity = null;
  overlay.style.transform = null;
}

function handleTick() {
  const now = moment();
  
  if (now.isAfter(targetDate)) {
    countdownInterval && window.clearInterval(countdownInterval);
    countdownHolder.innerHTML = `
      <div class="Countdown-content Countdown--started">
        <span class="Countdown-left">
          The ICO has started
        </span>
        <span class="Countdown-right">
          <a class="Button" href="#contribute">Contribute now</a>
        </span>
    `;

    window.requestAnimationFrame(() => {
      document
        .querySelector('.Countdown--started .Button')
        .addEventListener('click', handleContributeClick);
    })
    return;
  }
  
  const diff = moment.duration(targetDate.diff(now));
	
  countdownHolder.innerHTML = `
    <div class="Countdown-content">
      <span class="Countdown-left">
        <span class="Countdown-field">
          <span class="Countdown-value">${diff.days()}</span>
          <span class="Countdown-unit">${translated('days')}</span>
        </span>
        <span class="Countdown-separator">:</span>
        <span class="Countdown-field">
          <span class="Countdown-value">${diff.hours()}</span>
          <span class="Countdown-unit">${translated('hours')}</span>
        </span>
        <span class="Countdown-separator">:</span>
        <span class="Countdown-field">
          <span class="Countdown-value">${diff.minutes()}</span>
          <span class="Countdown-unit">${translated('minutes')}</span>
        </span>
        <span class="Countdown-separator">:</span>
        <span class="Countdown-field">
          <span class="Countdown-value">${diff.seconds()}</span>
          <span class="Countdown-unit">${translated('seconds')}</span>
        </span>
      </span>
      <span class="Countdown-right">
        <span class="Countdown-target">${translated('until')}</span>
      </span>
    </div>
  `;
}
