"use strict";

function getPosts( callback ) {
    const API = 'https://front-end-by-rimantas.github.io/12-grupe-facebook/js/posts.json';

    // darome uzklausa gauti duomenis
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // gavus atsakyma i uzklausa, duomenis perduodame callback'ui
            callback(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open("GET", API, true);
    xhttp.send();
}

function renderFeed( list ) {
    if ( Array.isArray(list) === false ) {
        return console.error('Feeda turi sudaryti sarasas(array) postu objektu (objects).')
    }

    for ( let i=0; i<list.length; i++ ) {
        renderPost( list[i] );
    }

    // sudedame ant visu "See more" elementu "click" event'a
    const seeMore = document.querySelectorAll('.post > .content > p > .more');

    for ( let i=0; i<seeMore.length; i++ ) {
        const element = seeMore[i];
        element.addEventListener('click', onSeeMoreClick);
    }
    
}

function onSeeMoreClick( event ) {
    const content = event.target.closest('.content');
    
    // antram p atimam hidden klase
    content.querySelector('p.hidden').classList.remove('hidden');
    // pirmam p duodam hidden klase
    content.querySelector('p').classList.add('hidden');
}

function renderPost( data ) {
    let HTML = `<div class="post">
                    ${renderPostHeader( data )}
                    ${renderPostContent( data.content )}
                    ${renderPostFooter()}
                </div>`;
    
    document.getElementById('feed').innerHTML += HTML;
}

function renderPostHeader( data ) {
    return `<header>
                <a href="#" class="user-image">
                    <img src="./img/users/${data.author.img}" alt="User photo">
                </a>
                <div class="texts">
                    <div class="author">
                        <a href="#">${data.author.name} ${data.author.surname}</a>
                    </div>
                    <span class="time">${formatDate(data.time)}</span>
                </div>
                <i class="fa fa-ellipsis-h"></i>
            </header>`;
}

function renderPostContent( content ) {
    let textHTML = '';
    let galleryHTML = '';

    if ( content.text ) {
        textHTML = renderPostText( content );
    }

    if ( content.img ) {
        galleryHTML = renderGallery( content.img );
    }
    
    return `<div class="content">
                ${textHTML}
                ${galleryHTML}
            </div>`;
}

function renderPostText( content ) {
    let HTML = '';
    let text = '';
    let more = '';
    const shortTextLength = 60;
    const textVisibleMaxLength = 350;
    const textMaxLength = 450;

    // jei yra, generuojame posto teksta ir atsizvelgiame i jo dydi
    // ir ar reikia spalvota fona uzdeti
    let textClass = '';
    if ( content.text ) {
        if ( content.text.length <= shortTextLength &&
             !content.img ) {
            textClass = `big-text`;
        }
        if ( content.background &&
             !content.img ) {
            textClass += ' background ' + content.background;
        }

        text = content.text;
        if ( text.length > textMaxLength ) {
            // atkerpame teksto dali iki 350 simboliu
            text = text.slice(0, textVisibleMaxLength);

            // nutriname is galo neisbaigtus zodius ar pan.
            let letterRemove = 0;
            for ( let i=textVisibleMaxLength-1; i>=0; i-- ) {
                const letter = text[i];
                if ( letter === ' ' ) {
                    break;
                }
                letterRemove++;
            }
            if ( letterRemove !== textVisibleMaxLength ) {
                text = text.slice(0, -letterRemove-1);
            }
            more = `...<span class="more">See more</span>`;
        }

        HTML = `<p class="${textClass}">
                    ${text}${more}
                </p>`;

        if ( more !== '' ) {
            HTML += `<p class="${textClass} hidden">
                        ${content.text}
                    </p>`;
        }
    }

    return HTML;
}

function renderPostFooter() {
    return `<footer>
                <div class="row">
                    <div class="action">
                        <i class="fa fa-thumbs-o-up"></i>
                        <span>Like</span>
                    </div>
                    <div class="action">
                        <i class="fa fa-comment-o"></i>
                        <span>Comment</span>
                    </div>
                </div>
                <div class="row">
                    <img class="user-photo" src="./img/users/christine.jpg" alt="User photo">
                    <form>
                        <textarea></textarea>
                        <div class="actions">
                            <i class="fa fa-smile-o"></i>
                            <i class="fa fa-camera"></i>
                            <i class="fa fa-picture-o"></i>
                            <i class="fa fa-sticky-note-o"></i>
                        </div>
                    </form>
                </div>
            </footer>`;
}

function renderGallery( list ) {
    let HTML = '';
    const maxImages = 4;
    let size = list.length;
    if ( size > maxImages ) {
        size = maxImages;
    }

    for ( let i=0; i<size; i++ ) {
        HTML += `<img src="./img/posts/${list[i]}">`;
    }

    if ( list.length > size ) {
        HTML += `<div class="overlay">+${list.length - maxImages}</div>`;
    }

    return `<div class="gallery gallery-${size}">${HTML}</div>`;
}

function formatDate( timestamp ) {
    const now = Date.now();
    let seconds = Math.floor((now - timestamp) / 1000);

    // Just now         -> 0..15s
    if ( seconds < 16 ) {
        return 'Just now';
    }

    // [x]sec           -> 16..59s
    if ( seconds < 60 ) {
        return seconds+'s ago';
    }

    // [x]min           -> 1..59min
    const minutes = (seconds - (seconds%60)) / 60;
    if ( minutes < 60 ) {
        return minutes+'min ago';
    }

    // [x]h             -> 1..23h
    const hours = (minutes - (minutes%60)) / 60;
    if ( hours < 24 ) {
        return hours+'h ago';
    }

    // [x]days          -> 1..6 days
    const days = (hours - (hours%24)) / 24;
    if ( days < 7 ) {
        return days+'days ago';
    }

    // [x]weeks         -> 7..27
    if ( days < 28 ) {
        return Math.floor(days/7)+'weeks ago';
    }

    // [x]months        -> 28..365
    if ( days < 366 ) {
        return Math.floor(days/30.45)+'weeks ago';
    }

    // [x]years         -> 366..Infinity
    return Math.floor(days/365.25)+'years ago';
}