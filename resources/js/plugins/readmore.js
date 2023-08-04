export const readmore = () => {
    const content = document.querySelectorAll('.posible-long')
    const originalContentArr = []
    const truncatedContentArr = []
    const moreLink = "Read More"
    const lessLink = "Read Less"

    for (let i = 0; i < content.length; i++) {
        //console.log(s.content)
        const originalContent = content[i].innerHTML;
        const numberOfWords = parseInt(content[i].dataset.rmWords);
        const truncateContent = ellipseContent(originalContent, numberOfWords);
        const originalContentWords = countWords(originalContent);

        originalContentArr.push(originalContent);
        truncatedContentArr.push(truncateContent);
        if (numberOfWords < originalContentWords) {
            content[i].innerHTML = truncatedContentArr[i];
            const linkWrap = document.createElement('span');

            linkWrap.className = 'read-more__link-wrap';
            linkWrap.innerHTML = `<a id="read-more_${i}" class="read-more__link text-[13px] text-blue-500 mt-1.5" style="cursor:pointer;">${moreLink}</a>`;

            // Inset created link
            content[i].parentNode.insertBefore(linkWrap, content[i].nextSibling);
        }
    }

    const readMoreLink = document.querySelectorAll('.read-more__link');
    for (let j = 0, l = readMoreLink.length; j < l; j++) {

        readMoreLink[j].addEventListener('click', function() {

            const moreLinkID = this.getAttribute('id');
            let index = moreLinkID.split('_')[1];

            content[index].classList.toggle('is-expanded');

            if (this.dataset.clicked !== 'true') {
                content[index].innerHTML = originalContentArr[index];
                this.innerHTML = lessLink;
                this.dataset.clicked = true;
            } else {
                content[index].innerHTML = truncatedContentArr[index];
                this.innerHTML = moreLink;
                this.dataset.clicked = false;
            }
        });
    }
}

export const readmoreRenderJs = () => {
    const content = document.querySelectorAll('.read-more-js')
    const originalContentArr = []
    const truncatedContentArr = []
    const moreLink = "Read More"
    const lessLink = "Read Less"

    for (let i = 0; i < content.length; i++) {
        const originalContent = content[i].innerHTML;
        const numberOfWords = parseInt(content[i].dataset.rmWords);
        const truncateContent = ellipseContent(originalContent, numberOfWords);
        const originalContentWords = countWords(originalContent);

        originalContentArr.push(originalContent);
        truncatedContentArr.push(truncateContent);
        if (numberOfWords < originalContentWords) {
            content[i].innerHTML = truncatedContentArr[i];
            const linkWrap = document.createElement('span');

            linkWrap.className = 'read-more-js__link-wrap';
            linkWrap.innerHTML = `<a id="read-more_${i}" class="read-more-js__link text-[13px] text-blue-500 mt-1.5" style="cursor:pointer;">${moreLink}</a>`;

            // Inset created link
            content[i].parentNode.insertBefore(linkWrap, content[i].nextSibling);
        }
    }

    const readMoreLink = document.querySelectorAll('.read-more-js__link');
    for (let j = 0, l = readMoreLink.length; j < l; j++) {

        readMoreLink[j].addEventListener('click', function() {

            const moreLinkID = this.getAttribute('id');
            let index = moreLinkID.split('_')[1];

            content[index].classList.toggle('is-expanded');

            if (this.dataset.clicked !== 'true') {
                content[index].innerHTML = originalContentArr[index];
                this.innerHTML = lessLink;
                this.dataset.clicked = true;
            } else {
                content[index].innerHTML = truncatedContentArr[index];
                this.innerHTML = moreLink;
                this.dataset.clicked = false;
            }
        });
    }
}

function countWords(str) {
    return str.split(/\s+/).length;
}

function ellipseContent(str, wordsNum) {
    return str.split(/\s+/).slice(0, wordsNum).join(' ') + '...';
}
