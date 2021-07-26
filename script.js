window.addEventListener("load", function() {
  gsap.registerPlugin(ScrollTrigger);

  const pageContainer = document.querySelector(".container");
  pageContainer.setAttribute("data-scroll-container", "");

  const scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true,
    getDirection: true
  });

  scroller.on("scroll", function(t) {
    document.documentElement.setAttribute("data-direction", t.direction);
  });

  scroller.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
      return arguments.length ?
        scroller.scrollTo(value, 0, 0) :
        scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: pageContainer.style.transform ? "transform" : "fixed"
  });

  // Pinning and horizontal scrolling

  let horizontalSections = document.querySelectorAll(".horizontal-scroll");

  horizontalSections.forEach((horizontalSection) => {
    let pinWrap = horizontalSection.querySelector(".pin-wrap");
    let pinWrapWidth = pinWrap.offsetWidth;
    let horizontalScrollLength = pinWrapWidth - window.innerWidth;
    gsap.to(pinWrap, {
      scrollTrigger: {
        scroller: "[data-scroll-container]",
        scrub: true,
        trigger: horizontalSection,
        pin: true,
        start: "top top",
        end: () => `+=${pinWrapWidth}`,
        invalidateOnRefresh: true
      },
      x: -horizontalScrollLength,
      ease: "none"
    });
  });

  /* COLOR CHANGER */

  const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
  scrollColorElems.forEach((colorSection, i) => {
    const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
    const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

    ScrollTrigger.create({
      trigger: colorSection,
      scroller: "[data-scroll-container]",
      start: "top 50%",
      onEnter: () =>
        gsap.to("body", {
          backgroundColor: colorSection.dataset.bgcolor,
          color: colorSection.dataset.textcolor,
          overwrite: "auto"
        }),
      onLeaveBack: () =>
        gsap.to("body", {
          backgroundColor: prevBg,
          color: prevText,
          overwrite: "auto"
        })
    });
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update());

  ScrollTrigger.refresh();
});

//--------------------------------changeByUser--------------------------------\\

var candidates = ['Doug Judy', 'Jake Peralta', 'Charles Boyle', 'Terry Jeffords', 'Amy Santiago', 'Rosa Diaz'];
const candidateName = document.getElementById("user_name").value

document.querySelector('#user_name').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    if (candidates.indexOf(document.getElementById("user_name").value) >= 0) {
      document.getElementById("download_files").visibility = "visible"
    }
  }
});

//--------------------------------cursor shit---------------------------------\\

// create variables
const mouseCursor = document.querySelector('.cursor');
const fromAside = document.querySelectorAll('input');

//add event that means when the windows loaded, start works the function cursor
window.addEventListener('mousemove', e => {
  mouseCursor.setAttribute("style", "top: " + (e.pageY) + "px; left: " + (e.pageX) + "px;")
});

//create the the loop that checks when the cursor over the navigation links and do some MAGIC :)

fromAside.forEach(input => {
  input.addEventListener('mousemove', () => {
    mouseCursor.classList.add('input-grow');
    input.classList.add('hovered-input');
  })


  input.addEventListener('mouseleave', () => {
    mouseCursor.classList.remove('input-grow');
    input.classList.remove('hovered-input');
  })

});

//--------------------------------highlighTXT---------------------------------\\
(function (window, document) {
    const markers = document.querySelectorAll('mark');
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.8
    });

    markers.forEach(mark => {
      observer.observe(mark);
    });
  })(window, document);
