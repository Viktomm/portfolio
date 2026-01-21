"use strict";
const skills = {
    data : [
        {name: 'java', range: 90, icon: 'java'},
        {name: 'node', range: 60, icon: 'nodejs'},
        {name: 'js', range: 50, icon: 'javascript'},
        {name: 'cpp', range: 60, icon: 'c++'},
        {name: 'html', range: 40, icon: 'html'},
        {name: 'css', range: 40, icon: 'css'},
        {name: 'eng', range: 70, icon: 'english'}
    ],
    sortMode: null,
    generateList(parentElement) {
        parentElement.innerHTML = '';
        const skillList = parentElement;
        this.data.forEach(element => {
            let dt = document.createElement('dt');
            let dd = document.createElement('dd');
            let div = document.createElement('div');

            dt.style = `background-image: url('img/skill=${element.icon}.svg')`;
            dd.classList.add('skill-level');          
            div.textContent = `${element.range}%`;
            div.style.width = `${element.range}%`;   
            dt.textContent = element.name;

            dd.appendChild(div);
            skillList.appendChild(dt);
            skillList.appendChild(dd);
        });
    },
    sortList(typeSort) {
        if (this.sortMode !== typeSort) {
            this.sortMode = typeSort
            this.data.sort(getComparer(typeSort));
        } else {
            this.data.reverse();
        }
        this.generateList(skillList);
    }
}

const skillList = document.querySelector('.skill-list');
skills.generateList(skillList);

const buttonsBlock = document.querySelector('.sort-options');
buttonsBlock.addEventListener('click', (e) => {
    let target = e.target
    if (target.nodeName === "BUTTON") {
        switch (target.dataset.type) {
            case 'name':
            case 'range':
                skills.sortList(target.dataset.type);
                break;
            default:
                console.log('Нажатие неизвестной кнопки');
        }
    }
});

const nav = document.querySelector('nav');
const menuSwitcher = document.querySelector('.nav-btn');
const menuSwitcherText = document.querySelector('.nav-btn .visually-hidden')
const menu = {
    close() {
        nav.classList.add('nav-closed');
        menuSwitcher.classList.remove('nav-btn-close');
        menuSwitcher.classList.add('nav-btn-open');
        menuSwitcherText.textContent = 'Открыть меню';
    },
    open() {
        nav.classList.remove('nav-closed');
        menuSwitcher.classList.remove('nav-btn-open');
        menuSwitcher.classList.add('nav-btn-close');
        menuSwitcherText.textContent = 'Закрыть меню';
    }
};

menu.close();


menuSwitcher.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-btn-open')) {
        menu.open();
    } else {
        menu.close();
    }
});

const theme_checkbox = document.querySelector('.switch-checkbox');
const body = document.querySelector('body');

function changeTheme() {
    if (theme_checkbox.checked) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
    else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

theme_checkbox.addEventListener('change', changeTheme)

function applyTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    theme_checkbox.checked = true;
  } else {
    theme_checkbox.checked = false;
  }
  changeTheme();
}

window.onload = () => {
  applyTheme();
};

function compare(a, b) {
    if (a.name < b.name) {
        return -1;
    }

    if (a.name > b.name) {
        return 1;
    }

    return 0;
}

function getComparer(prop) {
    return function (a, b) {
        if (a[prop] < b[prop]) {
            return -1;
        }

        if (a[prop] > b[prop]) {
            return 1;
        }

        return 0;
    }
}