import './index.html';
import './css/index.css';
import './img/hero.jpg';
import './img/found-ico.png';

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

const $ = document.querySelector.bind(document);

const targetDate = moment('2017-09-01T18:00:00Z');
const countdownHolder = document.createElement('div');

init();

function init() {
  countdownHolder.className = 'Countdown';

  $('.Hero').appendChild(countdownHolder);

  handleTick();
  window.setInterval(handleTick, 1000);
  document
    .querySelectorAll('.List--press .List-item')
    .forEach(el => el.addEventListener('click', handlePressClick));
}

function handlePressClick(event) {
  event.currentTarget.querySelector('.Link').click();
}

function handleTick() {
  const now = moment();
  const diff = moment.duration(targetDate.diff(now));

  countdownHolder.innerHTML = `
        <div class="Countdown-content">
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
            <span class="Countdown-target">until ICO</span>
        </div>
    `;
}
