gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

gsap.to(".nav1 svg",{
    y: "-100%",
    scrollTrigger:{
        trigger:'#page1',
        scroller:'#main',
        start:"top 0",
        end:"top -5%",
        scrub:true,
    },
})
gsap.to(".nav2  .links",{
     y: "-100%",
     opacity:0,
    scrollTrigger:{
        trigger:'#page1',
        scroller:'#main',
        start:"top 0",
        end:"top -5%",
        scrub:true,
    },
})
function videoAnima(){
    var vid = document.querySelector("#video");
var play = document.querySelector('#play')
vid.addEventListener("mouseenter",()=>{
    gsap.to(play,{
        opacity:1,
        scale:1
    })
})
vid.addEventListener("mouseleave",()=>{
    gsap.to(play,{
        opacity:0,
        scale:0
    })
})
vid.addEventListener("mousemove",(e)=>{
    gsap.to(play,{
        left:e.x-80,
        top:e.y-40
    })
})
}
videoAnima()
function loading(){
    gsap.from("#page1 h1",{
    y:80,
    delay:0.5,
    opacity:0,
    duration:0.7,
    stagger:0.2

})
gsap.from("#page1 #video",{
    scale:0.3,
    delay:1.5,
    opacity:0,
    duration:0.5

})
}
loading()

document.addEventListener("mousemove",function(dets){
    gsap.to('#cursor',{
        left:dets.x,
        top:dets.y
    })
})
// document.querySelector('#child1').addEventListener("mouseenter",()=>{
//     gsap.to("#cursor",{
//         transform: 'translate(-50%,-50%) scale(1)'
//     })
// })
// document.querySelector('#child1').addEventListener("mouseleave",()=>{
//     gsap.to("#cursor",{
//         transform: 'translate(-50%,-50%) scale(1)'
//     })
// })
document.querySelectorAll(".child").forEach(function(elem){
    elem.addEventListener("mousemove",function(){
        gsap.to("#cursor",{
         transform: 'translate(-50%,-50%) scale(1)'
   })
    })
     elem.addEventListener("mouseleave",function(){
        gsap.to("#cursor",{
         transform: 'translate(-50%,-50%) scale(0)'
   })
    })
})