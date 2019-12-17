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

function renderPostHeader() {
    return '<header>POST HEADER</header>';
}

function renderPostContent() {
    return '<div>POST CONTENT</div>';
}

function renderPostFooter() {
    return '<footer>POST FOOTER</footer>';
}
