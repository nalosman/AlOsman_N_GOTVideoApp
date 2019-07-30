(() => {
  console.log('fired!');

  // variable stack -> get the shields / sigils first
  const sigils = document.querySelectorAll('.sigilContainer'),
        lightBox = document.querySelector('.lightbox'),
        closeButton = document.querySelector('.close-lightbox'),
        houseVideo = document.querySelector('.house-video'),
        bannerImages = document.querySelector("#houseImages"),
        houseName = document.querySelector("#house-name"),
        houseInfo = document.querySelector(".house-info"),
        pauseButton = document.querySelector(".fa-pause-circle"),
        playButton = document.querySelector(".fa-play-circle");

        // houseData is a multidimensional array (arrays within arrays!) Data containers can hold anything - in this case, each index or entry holds another, smaller container with 2 indexes - 1 with the house name, one with the house data.
        // when you click on a shield, the dataset.offset property is a 0 through 5 that's pointing at the main index of the houseData array (stark, baratheon, lannister etc). so the syntax becomes houseData[offset][0] for the house name, and houseData[offset][1] for the house data. Each gets assigned to the h1 and the paragraph tag

  const houseData = [ // houseData[0][0] -> this is the house name ("stark")
        // houseData[0][1] -> this is the house data
      ["stark", `House Stark of Winterfell is a Great House of Westeros, ruling over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North.`],

      // houseData[1][0] is "baratheon", houseData[1][1] is the house data
      ["baratheon", `House Baratheon of Storm's End is a legally extinct Great House of Westeros. A cadet branch was formerly the royal house, but House Lannister now controls the throne. House Baratheon traditionally ruled the Stormlands on the eastern coast of Westeros, aptly named for its frequent storms, from their seat of Storm's End.House Baratheon became the royal house of the Seven Kingdoms after Robert Baratheon led a rebellion against the Targaryen dynasty. At the end of the rebellion, Robert ascended the Iron Throne as Robert I and married Cersei Lannister after the death of Lyanna Stark.`],

      // houseData[2][0] is "lannister", houseData[2][1] is the house data
      ["lannister", `House Lannister of Casterly Rock is one of the Great Houses of Westeros, one of its richest and most powerful families and oldest dynasties. It is also the current royal house of the Seven Kingdoms following the extinction of House Baratheon of King's Landing, which had been their puppet house anyway.

      The Lannisters rule over the Westerlands. Their seat is Casterly Rock, a massive rocky promontory overlooking the Sunset Sea which has had habitations and fortifications built into it over the millennia. They are the Lords Paramount of the Westerlands and Wardens of the West. As the new royal house, they also rule directly over the Crownlands from their seat of the Red Keep in King's Landing, the traditional seat of the royal family.`],

      // houseData[3][0] is "tully", houseData[3][1] is the house data
      ["tully", `House Tully of Riverrun is an exiled Great House of Westeros. Its most senior member carried the title of Lord of Riverrun and Lord Paramount of the Trident, until the Red Wedding. The current head is Lord Edmure Tully, son of the late Hoster Tully. The Tully sigil is a silver trout on a red and blue background. Their house words are "Family, Duty, Honor."`],

      // houseData[4][0] is "greyjoy", houseData[4][1] is the house data
      ["greyjoy", `House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The head of the house is the Lord Reaper of Pyke.
      House Greyjoy's sigil is traditionally a golden kraken on a black field. Their house words are "We Do Not Sow," although the phrase "What Is Dead May Never Die" is also closely associated with House Greyjoy and their bannermen, as they are associated with the faith of the Drowned God.`],

      // houseData[5][0] is "arryn", houseData[5][1] is the house data
      ["arryn", `House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled over the Vale of Arryn for millennia, originally as the Kings of Mountain and Vale and more recently as Lords Paramount of the Vale and Wardens of the East under the Targaryen kings and Baratheon-Lannister kings. The nominal head of House Arryn is Robin Arryn, the Lord of the Eyrie, with his stepfather Petyr Baelish acting as Lord Protector until he reaches the age of majority.`]
    ];

    // pause the video on click function
    function pauseVideo() {
      // pause the video when the button is clicked
      houseVideo.pause();
    }

    function playVideo() {
      houseVideo.play();
    }

    // write other fucntions for custom video controls(play, volume control, time counter progress bar scrubber, etc)
  function popLightBox() {
    // make the lightbox show up
    lightBox.classList.add('show-lightbox');

    // grab a reference to the current vid in the className object
    //debugger;
    //get the className property, split it into its seperate words[an array], and 
    //then get the last word --> [1] --> that will always be the house name
    let houseName = this.className.split(" ")[1]

    // capitalize first letter with JS string methods
    houseName = houseName.charAt(0).toUpperCase() + houseName.slice(1);
    //B
    //aratheon --> slice(1)
    // debugger;

    // use JS string interpolation to build the epath to the target video
    let videoPath = `video/House-${houseName}.mp4`;

    // load this new video videoPath
    houseVideo.src = videoPath;
    houseVideo.load();

    houseVideo.play();
  }

  function closeLightBox(event) {
    event.preventDefault();

    // make the lightbox close
    lightBox.classList.remove('show-lightbox');
    houseVideo.currentTime = 0; // rewind the video
    houseVideo.pause();
  }

  function animateBanners() {
    // we need an offset that we can multiply by to animate
    // our banners to the left and make the active one show up

    let offset = 600,
        multiplier = this.dataset.offset;
        // this is the data-offset custom data attribute
        // on each of the sigils
    console.log((offset * multiplier) + "px");

    // move the banners to the left using the product of our math
    bannerImages.style.right = `${offset * multiplier + "px"}`;

    // change the house name on the page at the same time
    //houseName.textContent = "House " + houseData[multiplier];

    // the multiplier is the outer array index (and also the data-offset custom attribute on
    // the html element -> the shield you're clicking on);
    // the second [] is the INNER array reference (see waaaaay up at the top) -> 0 is the house name, 1 is the house data
    houseName.textContent = `House ${houseData[multiplier][0]}`;
    houseInfo.textContent = houseData[multiplier][1];
  }

  sigils.forEach(sigil => sigil.addEventListener("click", popLightBox));
  //sigils.forEach(sigil => sigil.addEventListener("click", animateBanners));


  closeButton.addEventListener("click", closeLightBox);
  houseVideo.addEventListener('ended', closeLightBox);
  pauseButton.addEventListener("click", pauseVideo);
  playButton.addEventListener("click", playVideo);
})();