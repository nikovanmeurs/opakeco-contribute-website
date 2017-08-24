import './index.html';
import './css/index.css';
import './img/hero.jpg';
import './img/found-ico.png';

import './img/team-akaramanlis.jpg';
import './img/team-imos.jpg';
import './img/team-jxu.jpg';
import './img/team-kbasten.jpg';
import './img/team-nvmeurs.jpg';

import * as moment from 'moment';

const targetDate = moment().add(1, 'week');
const countdownHolder = document.createElement('div');

init();

function init() {    
    countdownHolder.className = 'Countdown';
    
    document.querySelector('.Hero').appendChild(countdownHolder);
    handleTick();
    window.setInterval(handleTick, 1000);
}

function handleTick() {
    const now = moment();
    const diff = moment.duration(targetDate.diff(now));
    
    countdownHolder.innerHTML = `
        <div class="Countdown-content">
            <span class="Countdown-field">
                <span class="Countdown-value">${ diff.days() }</span>
                <span class="Countdown-unit">days</span>
            </span>
            <span class="Countdown-separator">:</span>
            <span class="Countdown-field">
                <span class="Countdown-value">${ diff.hours() }</span>
                <span class="Countdown-unit">hours</span>
            </span>
            <span class="Countdown-separator">:</span>
            <span class="Countdown-field">
                <span class="Countdown-value">${ diff.minutes() }</span>
                <span class="Countdown-unit">minutes</span>
            </span>
            <span class="Countdown-separator">:</span>
            <span class="Countdown-field">
                <span class="Countdown-value">${ diff.seconds() }</span>
                <span class="Countdown-unit">seconds</span>
            </span>
            <span class="Countdown-target">until ICO</span>
        </div>
    `;
}