"use strict";

function renderFeed( list ) {
    if ( Array.isArray(list) === false ) {
        return console.error('Feeda turi sudaryti sarasas(array) postu objektu (objects).')
    }

    for ( let i=0; i<list.length; i++ ) {
        renderPost( list[i] );
    }
    
    return;
}

function renderPost( data ) {
    let HTML = `<div class="post">
                    ${renderPostHeader( data )}
                    ${renderPostContent( data.content )}
                    ${renderPostFooter()}
                </div>`;
    
    document.getElementById('feed').innerHTML += HTML;
    return;
}

function renderPostHeader( data ) {
    console.log(data);
    console.log(data.author.name);
    
    return `<header>
                <a href="#" class="user-image">
                    <img src="./img/users/${data.author.img}" alt="User photo">
                </a>
                <div class="texts">
                    <div class="author">
                        <a href="#">${data.author.name} ${data.author.surname}</a>
                    </div>
                    <span class="time">${data.time}</span>
                </div>
                <i class="fa fa-ellipsis-h"></i>
            </header>`;
}

function renderPostContent() {
    return '<div class="content">POST CONTENT</div>';
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
