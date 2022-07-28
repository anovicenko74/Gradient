const main_btn = document.querySelector('.main__button')
const main_text = document.querySelector('.main__text')
const main = document.querySelector('.main')



main_btn.addEventListener('click', switch_color)
main_btn.addEventListener('click', (event) => {
    event.target.focus()
})
main_btn.addEventListener('click', switch_text)



main_btn.addEventListener('mousedown', (event) => {
    event.preventDefault()
})

main_text.addEventListener('click', get_copy)

function switch_text(event) {
    event.target.textContent = 'Клик!'
    event.target.removeEventListener('click', switch_text)
}

function get_copy(event) {
    let textarea = document.createElement('textarea')
    textarea.value = event.target.textContent
    textarea.style.opacity = 0;
    textarea.style.position = 'fixed';

    document.body.append(textarea)

    /* Select the text field */
    textarea.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");
    document.body.removeChild(textarea)

    let img = this.querySelector('img')
    if (img.style.opacity == '0') {
        img.style.opacity = '1'
        setTimeout(() => {
            img.style.opacity = '0'
        }, 1000)
    }
}

function switch_color(event) {
    let wrapper = document.querySelector('.wrapper')
    const css_value = get_random_gradient()
    main_text.innerHTML = ''
    let span = document.createElement('span');
    span.textContent = css_value
    main_text.append(span)
    main_text.insertAdjacentHTML('beforeend', '<img style = "margin-left: 5px; opacity: 0" src="https://img.icons8.com/material-outlined/24/000000/ok--v1.png"/>')
    wrapper.style.background = getCssValuePrefix() + css_value
}

function get_random_gradient() {
    const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    let css_text = 'linear-gradient('
    css_text += get_random_num(0, 180) + 'deg, '
    let count_gradient = get_random_num(2, 4)

    for (let i = 0; i < count_gradient; i++) {
        if (i > 0) css_text += ', ';
        css_text += '#'
        for (let num = 0; num < 6; num++) {
            let random_num = get_random_num(0, 15)
            css_text += hex[random_num]
        }
    }

    css_text += ')'
    return css_text
}

function getCssValuePrefix() {
    var rtrnVal = '';//default to standard syntax
    var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++) {
        // Attempt to set the style
        dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

        // Detect if the style was successfully set
        if (dom.style.background) {
            rtrnVal = prefixes[i];
        }
    }

    dom = null;
    delete dom;

    return rtrnVal;
}

function get_random_num(from, to) {
    return Math.floor(from + Math.random() * (to - from + 1))
}