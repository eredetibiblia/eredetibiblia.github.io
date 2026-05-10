let rogzit = false;
let katt = false;
let idozit = 0;
let kidozit = 0;
let szotar;

function torol() {
    [...document.getElementsByClassName('szin')].forEach((el) => el.classList.remove('szin'));
    document.getElementById('rag').innerText = '';
    document.getElementById('szotari').innerText = '';
    document.getElementById('jelentes').innerText = '';
    document.getElementById('elofordul').innerText = '';
    document.getElementById('szakaszok').innerText = '';
    document.getElementsByClassName('fejval')[0].classList.remove('lenyit');
    document.getElementsByClassName('szotar')[0].style.scrollBehavior = 'auto';
    katt = false;
}

function kavar(t, max) {
    return Array.from((function* (t, max) {
        let n = t.length
        let r = Array.from(t);
        let j = 1;
        while (n > 0 && r.length) {
            if (j > max) {
                return;
            }
            const i = 0 | Math.random() * r.length;
            let q = r[i];
            r[i] = r[r.length - 1];
            r[r.length - 1] = q;
            yield r.pop();
            n--;
            j++;
        }
    })(t, max));
}

function kijelol(event) {
    let el = event.target;
    if (rogzit && el.classList.contains('szin')) {
        event.stopPropagation();
        setTimeout(() => rogzit = false, 0);
        torol();
        return requestAnimationFrame(szotarmeret);
    }
    do {
        el = el.parentNode;
    } while (!el.classList.contains('vers'));
    let vers = document.getElementById('k.' + el.id);
    el = event.target;
    document.getElementById('magyar').scrollTop = vers.offsetTop - (document.getElementById('magyar').offsetHeight - vers.offsetHeight) / 2;
    document.getElementsByClassName('szotar')[0].scrollTop = -document.getElementsByClassName('szotar')[0].offsetTop;
    torol();
    document.getElementById('rag').innerText = el.attributes['data-rag'].value;
    document.getElementById('szakaszok').innerText = '';
    if (el.attributes['data-to'].value !== '') {
        let g = (typeof gorog !== 'undefined')
        let betusnev = el.attributes['data-to'].value
        if (!(betusnev in szotar)) {
            betusnev += 'a';
        }
        let nev = betusnev.replace(/[a-z]/, '')
        document.getElementById('szotari').innerText = szotar[betusnev][0] + ' ';
        document.getElementById('jelentes').innerText = szotar[betusnev][1];
        let link = document.createElement('a');
        link.innerText = (g ? 'G' : 'H') + betusnev
        if (nev !== '') {
            link.href = 'https://biblehub.com/' + (g ? 'greek/' : 'hebrew/') + nev + '.htm';
            link.target = "_blank";
        }
        link.lang = 'hu';
        document.getElementById('szotari').appendChild(link);
        document.getElementById('elofordul').appendChild(pelda);
        document.getElementById('elofordul').appendChild(document.createTextNode(' (' + szotar[el.attributes['data-to'].value][2] + ' előfordulás)'));
        kavar(szotar[el.attributes['data-to'].value][3], 24).forEach((hely) => {
            let szakasz = document.createElement('div');
            let rov = document.createElement('span');
            let szoveg = document.createElement('span');
            szoveg.innerText = kikeres(hely);
            szoveg.className = 'idez';
            rov.innerText = magyarhely(hely);
            rov.className = 'rov';
            szakasz.appendChild(rov);
            szakasz.appendChild(document.createTextNode(' '));
            szakasz.appendChild(szoveg);
            document.getElementById('szakaszok').appendChild(szakasz);
        })
    } else {
        let link = document.createElement('span');
        link.lang = 'hu';
        link.innerText = 'Nem szótárazható';
        document.getElementById('szotari').innerText = '';
        document.getElementById('szotari').appendChild(link);
        document.getElementById('jelentes').innerText = '';
        document.getElementById('elofordul').innerText = '';
    }
    el.classList.add('szin');
    do {
        el = el.parentNode;
        el.classList.add('szin');
    } while (!el.classList.contains('vers'));
    vers.classList.add('szin');
    requestAnimationFrame(szotarmeret);
    event.stopPropagation();
}

function kijelolk(event) {
    let el = event.target;
    if (rogzit && el.classList.contains('szin')) {
        event.stopPropagation();
        setTimeout(() => rogzit = false, 0);
        torol();
        return requestAnimationFrame(szotarmeret);
    }
    let vers = document.getElementById(el.id.substring(2));
    document.getElementById('szoveg').scrollTop = vers.offsetTop - (document.getElementById('szoveg').offsetHeight - vers.offsetHeight) / 2;
    document.getElementsByClassName('szotar')[0].scrollTop = -document.getElementsByClassName('szotar')[0].offsetTop;
    torol();
    el.classList.add('szin');
    vers.classList.add('szin')
    requestAnimationFrame(szotarmeret);
    event.stopPropagation();
}

function kikeres(id) {
    id = id.split('.');
    return karoli[id[0]][id[1] - 1][id[2] - 1];
}

function magyarhely(id) {
    const konyvkod = {
        'Gen': '1Móz',
        'Exod': '2Móz',
        'Lev': '3Móz',
        'Num': '4Móz',
        'Deut': '5Móz',
        'Josh': 'Józs',
        'Judg': 'Bír',
        'Ruth': 'Ruth',
        '1Sam': '1Sám',
        '2Sam': '2Sám',
        '1Kgs': '1Kir',
        '2Kgs': '2Kir',
        '1Chr': '1Krón',
        '2Chr': '2Krón',
        'Ezra': 'Ezsd',
        'Neh': 'Neh',
        'Esth': 'Eszt',
        'Job': 'Jób',
        'Ps': 'Zsolt',
        'Prov': 'Péld',
        'Eccl': 'Préd',
        'Song': 'Énekek',
        'Isa': 'Ézs',
        'Jer': 'Jer',
        'Lam': 'JSir',
        'Ezek': 'Ez',
        'Dan': 'Dán',
        'Hos': 'Hós',
        'Joel': 'Jóel',
        'Amos': 'Ám',
        'Obad': 'Abd',
        'Jonah': 'Jón',
        'Mic': 'Mik',
        'Nah': 'Náh',
        'Hab': 'Hab',
        'Zeph': 'Zof',
        'Hag': 'Hag',
        'Zech': 'Zak',
        'Mal': 'Mal',
        'Matt': 'Mt',
        'Mark': 'Mk',
        'Luke': 'Lk',
        'John': 'Jn',
        'Acts': 'ApCsel',
        'Rom': 'Róm',
        '1Cor': '1Kor',
        '2Cor': '2Kor',
        'Gal': 'Gal',
        'Eph': 'Ef',
        'Phil': 'Fil',
        'Col': 'Kol',
        '1Thess': '1Thessz',
        '2Thess': '2Thessz',
        '1Tim': '1Tim',
        '2Tim': '2Tim',
        'Titus': 'Tit',
        'Phlm': 'Filem',
        'Heb': 'Zsid',
        'Jas': 'Jak',
        '1Pet': '1Pt',
        '2Pet': '2Pt',
        '1John': '1Jn',
        '2John': '2Jn',
        '3John': '3Jn',
        'Jude': 'Júd',
        'Rev': 'Jel'
    }
    id = id.split('.');
    return konyvkod[id[0]] + ' ' + id[1] + ',' + id[2];
}

function bekatt(event) {
    clearTimeout(idozit)
    kijelol(event);
    rogzit = true;
}

function bekattk(event) {
    clearTimeout(idozit)
    kijelolk(event);
    rogzit = true;
}

function kikatt() {
    clearTimeout(idozit)
    torol();
    requestAnimationFrame(szotarmeret);
    rogzit = false;
}

function behuz(event) {
    if (!rogzit && !katt) {
        clearTimeout(idozit)
        idozit = setTimeout(() => kijelol(event), 150);
    }
}

function behuzk(event) {
    if (!rogzit && !katt) {
        clearTimeout(idozit)
        idozit = setTimeout(() => kijelolk(event), 150);
    }
}

function kihuz() {
    if (!rogzit && !katt) {
        clearTimeout(idozit)
        idozit = setTimeout(() => {
            torol();
            requestAnimationFrame(szotarmeret);
        }, 150);
    }
}

function legorget(event) {
    let fej = document.getElementById('f' + event.target.innerText);
    if (fej === null) {
        return;
    }
    document.getElementById('szoveg').scrollTop = fej.offsetTop + parseFloat(getComputedStyle(document.getElementById('szoveg')).getPropertyValue('padding-top'));
    fej = document.getElementById('kf' + event.target.innerText);
    document.getElementById('magyar').scrollTop = fej.offsetTop + parseFloat(getComputedStyle(document.getElementById('magyar')).getPropertyValue('padding-top'));
    rogzit = true;
    setTimeout(() => rogzit = false, 1000);
    torol();
    requestAnimationFrame(szotarmeret);
}

function vszam() {
    [document.getElementById('szoveg'), document.getElementById('magyar')].forEach((el) => {
        let utso = 0;
        let szamok = [...el.getElementsByClassName('vszam')].map((d) => {
            return {e: d, t: d.offsetTop, h: d.offsetHeight};
        });
        szamok.forEach((d) => {
            utso = Math.max(utso, d.t);
            d.e.style.transform = 'translateY(' + (utso - d.t) + 'px)';
            utso += d.h - 10 / 3;
        })
    })
}

function kezd() {
    requestAnimationFrame(vszam);
    window.addEventListener('resize', () => setTimeout(vszam));
    [...document.getElementsByClassName('szo')].forEach((el) => {
        el.addEventListener('click', bekatt);
        el.addEventListener('mouseover', behuz);
        el.addEventListener('mouseout', kihuz);
    });
    [...document.getElementById('magyar').getElementsByClassName('vers')].forEach((el) => {
        el.addEventListener('click', bekattk);
        el.addEventListener('mouseover', behuzk);
        el.addEventListener('mouseout', kihuz);
    });
    document.getElementById('szoveg').addEventListener('click', kikatt);
    document.getElementById('magyar').addEventListener('click', kikatt);
    document.getElementsByClassName('fejval')[0].addEventListener('mouseover', () => {
        clearTimeout(kidozit);
        kidozit = setTimeout(() => document.getElementsByClassName('fejval')[0].classList.add('lenyit'), 150);
    });
    document.getElementsByClassName('fejval')[0].addEventListener('mouseout', () => {
        if (!katt) {
            clearTimeout(kidozit);
            kidozit = setTimeout(() => document.getElementsByClassName('fejval')[0].classList.remove('lenyit'), 150);
        }
    });
    document.getElementById('lenyil').addEventListener('click', (event) => {
        clearTimeout(kidozit);
        katt = !katt;
        if (katt) {
            event.target.parentNode.classList.add('lenyit');
        } else {
            event.target.parentNode.classList.remove('lenyit');
        }
        event.stopPropagation();
    });
    document.body.addEventListener('click', () => {
        clearTimeout(kidozit);
        document.getElementsByClassName('fejval')[0].classList.remove('lenyit');
        katt = false;
    });
    [...document.getElementsByClassName('fv')].forEach(() => addEventListener('click', legorget));
    if (document.body.dir === 'rtl') {
        szotar = heber;
    } else {
        szotar = gorog;
    }
}

window.addEventListener('load', kezd)
const pelda = document.createElement('span')
pelda.className = 'pelda'
pelda.innerText = 'Példák:';
const szotarmeret = (function () {
    let ezgordul = false;
    let indul = 0;
    let ido = Date.now();
    let sebesseg = 0;

    function huzkezd(event) {
        ezgordul = this;
        this.parentNode.style.pointerEvents = 'none';
        this.parentNode.style.userSelect = 'none';
        this.style.scrollBehavior = 'auto';
        indul = (event.clientY || event.clientY === 0) ? event.clientY : event.touches[0].clientY;
        sebesseg = 0;
        mozgat();
    }

    function huz(event) {
        if (!ezgordul) return;
        let ide = (event.clientY || event.clientY === 0) ? event.clientY : event.touches[0].clientY;
        sebesseg = (ide - indul) / 100;
        ezgordul.fogo.style.transform = 'translateY(' + (ide - indul) + 'px)';
        event.preventDefault();
    }

    function huzveg() {
        if (!ezgordul) return;
        ezgordul.parentNode.style.pointerEvents = 'initial';
        ezgordul.parentNode.style.userSelect = 'initial';
        ezgordul.style.scrollBehavior = 'smooth';
        ezgordul.fogo.style.transform = '';
        ezgordul = false;
    }

    function mozgat() {
        if (!ezgordul) return;
        ezgordul.scrollTop += (-ido + (ido = Date.now())) * sebesseg;
        requestAnimationFrame(mozgat);
    }

    function atmeretez(gorgettyu) {
        gorgettyu.style.width = '';
        gorgettyu.style.width = `calc(${getComputedStyle(gorgettyu).width} + 200px)`;

        let fogo = gorgettyu.fogo;
        let doboz = gorgettyu.getBoundingClientRect();
        let magassag = gorgettyu.gorgodoboz.getBoundingClientRect().height;
        let eddiggorog = magassag - doboz.height;
        let fogomeret = 60;
        fogo.style.top = (doboz.height - fogomeret) / 2 + 'px';
        if (gorgettyu.scrollTop > eddiggorog) {
            gorgettyu.scrollTop = eddiggorog;
        }
        fogo.style.height = `${fogomeret}px`;
        fogo.style.display = doboz.height < magassag ? '' : 'none';
    }

    function gorgosav(gorgettyu) {
        let gorgodoboz = document.createElement('div');
        gorgodoboz.style.width = `calc(100% + ${gorgettyu.offsetWidth - gorgettyu.clientWidth}px)`;
        gorgodoboz.style.position = 'absolute';
        gorgodoboz.style.pointerEvents = 'none';
        gorgodoboz.classList.add('gorgodoboz')

        while (gorgettyu.firstChild) gorgodoboz.appendChild(gorgettyu.firstChild);

        gorgettyu.insertBefore(gorgodoboz, gorgettyu.firstChild);
        let fogo = document.createElement('div');
        fogo.classList.add('fogo');
        fogo.style.pointerEvents = 'initial';
        fogo.style.position = 'absolute';
        getComputedStyle(gorgettyu).direction === 'ltr' ? (fogo.style.right = '0') : (fogo.style.left = '0');
        fogo.innerText = '↑ \u2766 ↓';
        fogo.style.transitionDuration = '.1s';
        gorgettyu.parentNode.appendChild(fogo);
        gorgettyu.parentNode.style.position = 'relative';
        gorgettyu.fogo = fogo;
        gorgettyu.gorgodoboz = gorgodoboz;

        gorgettyu.fogo.addEventListener('mousedown', huzkezd.bind(gorgettyu), {passive: true});
        window.addEventListener('mousemove', huz.bind(gorgettyu), {passive: false});
        window.addEventListener('mouseup', huzveg.bind(gorgettyu), {passive: true});
        gorgettyu.fogo.addEventListener('touchstart', huzkezd.bind(gorgettyu), {passive: true});
        window.addEventListener('touchmove', huz.bind(gorgettyu), {passive: false});
        window.addEventListener('touchend', huzveg.bind(gorgettyu), {passive: true});

        let f = function () {
            atmeretez(gorgettyu);
        };
        requestAnimationFrame(f);
        window.addEventListener('resize', f);
        return f;
    }

    window.addEventListener('load', function () {
        [document.getElementById('magyar'), document.getElementById('szoveg'), document.getElementsByClassName('szotar')[0]].forEach(gorgettyu => {
            gorgosav(gorgettyu);
            atmeretez(gorgettyu);
        });
    });
    return function () {
        atmeretez(document.getElementsByClassName('szotar')[0])
    };
})();