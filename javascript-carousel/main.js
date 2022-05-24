var $images = document.querySelectorAll('img');
var $circles = document.querySelectorAll('.fa-circle');
var $nextButton = document.querySelector('.next');
var $previousButton = document.querySelector('.previous');

var imageIndex = 1;
var circleIndex = 1;

// automatically slide through images every 3 seconds.
var carouselTimer = setInterval(moveImages, 3000);

function moveImages() {
  if (imageIndex === 0) {
    $images[imageIndex].style.display = 'none';
    $circles[circleIndex].className = 'fa-regular fa-circle fa-lg';
    $images[imageIndex].style.display = 'block';
    $circles[circleIndex].className = 'fa-solid fa-circle fa-lg';
  } else if (imageIndex === $images.length) {
    $images[imageIndex - 1].style.display = 'none';
    $circles[circleIndex - 1].className = 'fa-regular fa-circle fa-lg';
    $images[0].style.display = 'block';
    $circles[0].className = 'fa-solid fa-circle fa-lg';
    imageIndex = 0;
    circleIndex = 0;
  } else {
    $images[imageIndex - 1].style.display = 'none';
    $circles[circleIndex - 1].className = 'fa-regular fa-circle fa-lg';
    $images[imageIndex].style.display = 'block';
    $circles[circleIndex].className = 'fa-solid fa-circle fa-lg';
  }

  imageIndex++;
  circleIndex++;
}

// move to the next image when the right arrow is clicked.
$nextButton.addEventListener('click', function (e) {
  moveImages();
  clearInterval(carouselTimer);
  carouselTimer = setInterval(moveImages, 3000);
});

// move to the previous image when the left arrow is clicked.
$previousButton.addEventListener('click', function (e) {
  clearInterval(carouselTimer);

  if (imageIndex === 1 && $images[0].style.display === 'block') {
    $images[0].style.display = 'none';
    $circles[0].className = 'fa-regular fa-circle fa-lg';
    $images[$images.length - 1].style.display = 'block';
    $circles[$circles.length - 1].className = 'fa-solid fa-circle fa-lg';
    imageIndex = $images.length + 1;
    circleIndex = $circles.length + 1;
  } else {
    $images[imageIndex - 1].style.display = 'none';
    $circles[circleIndex - 1].className = 'fa-regular fa-circle fa-lg';
    $images[imageIndex - 2].style.display = 'block';
    $circles[circleIndex - 2].className = 'fa-solid fa-circle fa-lg';
  }

  imageIndex--;
  circleIndex--;

  carouselTimer = setInterval(moveImages, 3000);
});

// when a circle is clicked it goes to the corresponding image.
$circles.forEach((circle, i) => {
  circle.addEventListener('click', function (e) {
    clearInterval(carouselTimer);

    $images.forEach(image => {
      image.style.display = 'none';
    });
    $circles.forEach(circle => {
      circle.className = 'fa-regular fa-circle fa-lg';
    });

    $images[i].style.display = 'block';
    $circles[i].className = 'fa-solid fa-circle fa-lg';
    imageIndex = i + 1;
    circleIndex = i + 1;
    carouselTimer = setInterval(moveImages, 3000);
  });
});
