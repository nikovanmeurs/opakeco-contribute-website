import './index.html';
import './ko.html';
import './hi.html';
import './platform/for-charities.html';
import './platform/for-donors.html';
import './platform/for-investors.html';
import './css/index.css';
import './img/hero.jpg';
import './img/hero-platform.jpg';
import './img/found-ico.png';
import './img/roadmap.svg';
import './img/roadmap-wide.svg';
import './img/pie.svg';

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

import * as moment from 'moment';
import * as ScrollReveal from 'scrollreveal';

require('smoothscroll-polyfill').polyfill();

const targetDate = moment('2017-09-21T18:00:00Z');
const countdownHolder = document.createElement('div');
let countdownInterval;

const translations = {
  'en': {
    'failure':    'Soft cap not reached, refund started',
    'started':    'The ICO has started',
    'contribute': 'Contribute now',
    'live':       'The contribution period is now live and it will end on the 30th of September 2017 at approximately 18:00 GMT, or when the hard cap has been reached. To contribute you must agree to our terms and click on “Contribute”.',
    'days':       'days',
    'hours':      'hours',
    'minutes':    'minutes',
    'seconds':    'seconds',
    'until':      'until ICO',
    'pledge':     'pledge now',
    'buying':     'Buying tokens',
    'karmorate':  'Karmo tokens can be bought at a fixed rate of <span class="u-bold">1 ETH = 30.000 KRM</span>.',
    'tobuy':      'To buy tokens, send the necessary Ether to the Opakeco wallet using the information on the side.',
    'howto':      'Are you ready to buy Karmo tokens but unsure of how to do so?',
    'walkthrough': 'View walkthrough',
    'walletaddr': 'Wallet address',
    'gasprice':   'Recommended gas price',
    'gaslimit':   'Recommended gas limit',
  },

  'ko': {
    'failure':    'Soft cap not reached, refund started',
    'started':    'ICO가 시작되었습니다',
    'contribute': '투자 참여',
    'live':       '투자가 현재 진행중이며 2017년 9월 30일 GMT 기준 약 18:00에 종료되거나 하드캡 목표치에 이르게 되면 투자가 종료됩니다.',
    'days':       '일',
    'hours':      '시간',
    'minutes':    '분',
    'seconds':    '초',
    'until':      'ICO 까지',
    'pledge':     'pledge now',
    'buying':     '토큰 구매',
    'karmorate':  '카르모 토큰은 <span class="u-bold">1이더리움당30,000 KRM의</span> 고정 비율로 구매 가능합니다.',
    'tobuy':      '토큰을 구매하려면 필요한 이더를 측면에 안내되어 있는 오파케코 지갑으로 보내세요.',
    'howto':      '카르모 토큰을 구매할 준비가 되었지만 어떻게 할지 모르겠나요?',
    'walkthrough': '참여 방법 안내',
    'walletaddr': '지갑 주소',
    'gasprice':   '가스 가격',
    'gaslimit':   '추천 가스 한도',
  },

  'hi': {
    'failure':    'Soft cap not reached, refund started',
    'started':    'आईसीओ शुरू कर दिया है',
    'contribute': 'अब योगदान करें',
    'live':       'योगदान की अवधि अब जी रही है और यह 28 सितम्30 2017 को लगभग 18:00 जीएमटी, या जब हार्ड कैप तक पहुंच गया है, समाप्त हो जाएगा।.',
    'days':       'दिन',
    'hours':      'घंटे',
    'minutes':    'मिनट',
    'seconds':    'सेकंड',
    'until':      'आईसीओ तक',
    'pledge':     'pledge now',
    'buying':     'टोकन ख़रीदना',
    'karmorate':  'कार्मो टोकन 1 ई<span class="u-bold">1 ईथ = 30.000 केआरएम</span> की एक निश्चित दर से खरीदा जा सकता है.',
    'tobuy':      'टोकन खरीदने के लिए, पक्ष के बारे में जानकारी का उपयोग करके ओपकेको वॉलेट के लिए आवश्यक ईथर ओटी भेजें।.',
    'howto':      'क्या आप कर्मो टोकन खरीदने के लिए तैयार हैं लेकिन ऐसा करने के बारे में अनिश्चित हैं?',
    'walkthrough': 'देखें वॉकथ्रू',
    'walletaddr': 'बटुआ पता',
    'gasprice':   'गैस की कीमत',
    'gaslimit':   'अनुशंसित गैस सीमा',
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
    <h2 class="Heading Section-heading">${translated('buying')}</h2>
    <div class="Contribute-sectionWrapper">
      <div class="Contribute-section">
        <p class="Text">${translated('karmorate')}</p>
        <p class="Text">${translated('tobuy')}</p>
        <p class="Text">${translated('howto')}</p>
        <div class="Section-actions">
          <a class="Button Section-action" href="/media/ico-walkthrough.pdf" target="_blank">${translated('walkthrough')}</a>
        </div>
      </div>
      <div class="Contribute-section">
        <div class="Contribute-field">
          <div class="Contribute-title">${translated('walletaddr')}</div>
          <div class="Contribute-value">0xa4693ed25ce167e0ac3cefcb3d5c8a844b74cc78</div>
        </div>
        <div class="Contribute-field">
          <div class="Contribute-title">${translated('gasprice')}</div>
          <div class="Contribute-value">40 Gwei</div>
        </div>
        <div class="Contribute-field">
          <div class="Contribute-title">${translated('gaslimit')}</div>
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
          ${translated('failure')}
        </span>
    `;

    document.querySelector('.Section--contribute .Text').innerHTML = translated('live')

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
      <a class="Button" href="https://docs.google.com/forms/d/e/1FAIpQLSe0f2fUOZws1j4yKErYTgEn96bLQT5d62zqKegw-acAcTE9hQ/viewform" target="_blank">${translated('pledge')}</a>
      </span>
    </div>
  `;
}
