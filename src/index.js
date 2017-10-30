import './index.html';
import './css/index.css';
import './img/hero.jpg';
import './img/hero-platform.jpg';
import './img/found-ico.png';

import './img/logo.png';
import './img/logo-avalon.png';
import './img/logo-blockchainnews.png';
import './img/logo-coingecko.png';
import './img/logo-coinhills.png';
import './img/logo-cryptocoinportal.png';
import './img/logo-foundico.png';
import './img/logo-hsb.png';
import './img/logo-icochecker.png';
import './img/logo-icocountdown.png';
import './img/logo-icodaily.png';
import './img/logo-icohoo.png';
import './img/logo-icotracker.png';
import './img/logo-slavefreetrade.png';
import './img/logo-smithcrown.png';
import './img/logo-soma.png';
import './img/logo-startupjuncture.png';
import './img/logo-tokenmarket.png';
import './img/logo-urbancrypto.png';
import './img/logo-villagebyvillage.png';

import './img/team-akaramanlis.jpg';
import './img/team-aparmesar.jpg';
import './img/team-bdhertog.jpg';
import './img/team-fboonman.jpg';
import './img/team-imos.jpg';
import './img/team-jxu.jpg';
import './img/team-kbasten.jpg';
import './img/team-lguillou.jpg';
import './img/team-nvmeurs.jpg';
import './img/team-rammerlaan.jpg';

import * as ScrollReveal from 'scrollreveal';

require('smoothscroll-polyfill').polyfill();

const { reveal } = ScrollReveal();
init();

function init() {
  reveal('.List-item');
  
  document
    .querySelectorAll('.List--press .List-item')
    .forEach(el => el.addEventListener('click', handlePressClick));
  
  const teamListItems = document.querySelectorAll('.List--team .List-item');
  teamListItems.forEach(el => el.addEventListener('mouseover', handleTeamMouseOver));
  teamListItems.forEach(el => el.addEventListener('mouseleave', handleTeamMouseLeave));

  window.addEventListener('click', handleWindowClick);
  document.querySelector('.Masthead').addEventListener('click', handleMastheadClick);
}

function handleMastheadClick(event) {
  event.stopPropagation();
}

function handleWindowClick(event) {
  const toggle = document.querySelector('#toggle');

  if (toggle.checked) {
    toggle.checked = false;
  }
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
