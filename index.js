let container = document.querySelector('.container');
let content = document.querySelector('.content');
let birds = document.querySelectorAll('.bird');

container.addEventListener('mousemove', (e) => {

    let move2 = (e.clientX * 0.003);
    content.style.transform = `translateX(-${move2}%)`;

    birds.forEach((bird) => {
        bird.style.right   = (e.clientX) + 'px';
        bird.style.bottom = (e.clientY) + 'px';
        
    })
})

