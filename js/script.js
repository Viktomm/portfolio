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
    generateList(parentElement) {
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
    }

}

const skillList = document.querySelector('.skill-list');
skills.generateList(skillList);