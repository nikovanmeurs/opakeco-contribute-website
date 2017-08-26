import './index.html';
import './css/index.css';
import './img/hero.jpg';
import './img/found-ico.png';
import './img/roadmap.svg';
import './img/roadmap-wide.svg';

import './img/logo-blockchainnews.png';
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

const targetDate = moment('2017-09-01T18:00:00Z');
const countdownHolder = document.createElement('div');

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
  window.setInterval(handleTick, 1000);
  document
    .querySelectorAll('.List--press .List-item')
    .forEach(el => el.addEventListener('click', handlePressClick));
  
  const teamListItems = document.querySelectorAll('.List--team .List-item');
  teamListItems.forEach(el => el.addEventListener('mouseover', handleTeamMouseOver));
  teamListItems.forEach(el => el.addEventListener('mouseleave', handleTeamMouseLeave));
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
  event.currentTarget.querySelector('.List-itemContent').style = null;
  event.currentTarget.querySelector('.List-itemBackgroundOverlay').style = null;
}

function handleTick() {
  const now = moment();
  
  if (now.isAfter(targetDate)) {
    window.clearInterval(handleTick);
    return;
  }
  
  const diff = moment.duration(targetDate.diff(now));
  
  countdownHolder.innerHTML = `
    <div class="Countdown-content">
      <span class="Countdown-left">
        <span class="Countdown-field">
          <span class="Countdown-value">${diff.days()}</span>
          <span class="Countdown-unit">days</span>
        </span>
        <span class="Countdown-separator">:</span>
        <span class="Countdown-field">
          <span class="Countdown-value">${diff.hours()}</span>
          <span class="Countdown-unit">hours</span>
        </span>
        <span class="Countdown-separator">:</span>
        <span class="Countdown-field">
          <span class="Countdown-value">${diff.minutes()}</span>
          <span class="Countdown-unit">minutes</span>
        </span>
        <span class="Countdown-separator">:</span>
        <span class="Countdown-field">
          <span class="Countdown-value">${diff.seconds()}</span>
          <span class="Countdown-unit">seconds</span>
        </span>
      </span>
      <span class="Countdown-right">
        <span class="Countdown-target">until ICO</span>
      </span>
    </div>
  `;
}
