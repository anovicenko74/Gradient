let main_btn = document.querySelector('.main__button')
let main_text = document.querySelector('.main__text')
let main = document.querySelector('.main')
let main_content = document.querySelector('.main__content')
let main_scene = document.querySelector('.main__scene')
let main_touch;

main_btn.addEventListener('click', switch_color)
main_btn.addEventListener('click', (event) => {
    event.target.focus()
})
main_btn.addEventListener('click', first_click)

main_text.addEventListener('click', get_copy)

function first_click(event) {
    this.textContent = 'Клик!'
    main_touch = document.querySelector('.main__touch')

    main_touch.addEventListener('mouseenter', function (event) {
        main_content.style.opacity = 0;
        main_scene.style.display = 'block'
        main_scene.style.height = '254px'
        main_touch.addEventListener('mousemove', toucher)
    })

    main_touch.addEventListener('mouseleave', function (event) {
        main_content.style.opacity = '1';
        main_scene.style.display = 'none'
        alert(document.getComputedStyles(main_content))
    })

    if (window.screen.width > 767) {
        main_touch.style.display = 'block'
    }
    event.target.removeEventListener('click', first_click)
}

function toucher(e) {
    const target = e.target

    let targetCoords = target.getBoundingClientRect();
    let xCoord = e.clientX - targetCoords.left;
    let yCoord = e.clientY - targetCoords.top;

    let scewX = xCoord > 45 ? (xCoord % 45) * 1 : -(45 - xCoord) * 1
    let scewY = yCoord > 45 ? (yCoord % 45) * 1 : -(45 - yCoord) * 1
    console.log(scewX, scewY)
    main_scene.style.transform = `skew(${scewX}deg, ${scewY}deg)`
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
    main_scene.style.background = document.querySelector('.wrapper').style.background
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

